<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

// Simple blog save endpoint. Accepts POST with fields:
// id (optional) - if provided updates, otherwise inserts
// title, paragraph1, paragraph2, paragraph3, author, published_date, meta_title, meta_desc, meta_keywords, schema_desc
// image file under 'image'

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'method_not_allowed']);
    exit;
}

try {
    $pdo->beginTransaction();

    // debug log file for upload diagnostics
    $logDir = __DIR__ . '/../logs';
    if (!is_dir($logDir)) @mkdir($logDir, 0755, true);
    $debugLog = $logDir . '/blogs_save.log';

    $id = $_POST['id'] ?? null;
    $title = $_POST['title'] ?? '';
    $paragraph1 = $_POST['paragraph1'] ?? null;
    $paragraph2 = $_POST['paragraph2'] ?? null;
    $paragraph3 = $_POST['paragraph3'] ?? null;
    $author = $_POST['author'] ?? null;
    $published_date = $_POST['published_date'] ?? null;
    $meta_title = $_POST['meta_title'] ?? null;
    $meta_desc = $_POST['meta_desc'] ?? null;
    $meta_keywords = $_POST['meta_keywords'] ?? null;
    $schema_desc = $_POST['schema_desc'] ?? null;
    $slug = $_POST['slug'] ?? null;

    $imagePath = null;
    $imageAttempted = false;
    if (!empty($_FILES['image'])) {
        // log raw upload info for debugging
        @file_put_contents($debugLog, date('c') . " - FILES:image -> " . print_r($_FILES['image'], true) . "\n", FILE_APPEND);
        if ($_FILES['image']['error'] === UPLOAD_ERR_OK) {
            $imageAttempted = true;
            $uploadDir = __DIR__ . '/../uploads/blog_images';
            if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);
            $fname = bin2hex(random_bytes(8)) . '_' . basename($_FILES['image']['name']);
            $target = $uploadDir . '/' . $fname;
            $moved = @move_uploaded_file($_FILES['image']['tmp_name'], $target);
            @file_put_contents($debugLog, date('c') . " - move_uploaded_file result: " . ($moved ? 'ok' : 'failed') . " target: $target\n", FILE_APPEND);
            if ($moved) {
                // store path accessible from the web server (php folder is served)
                $imagePath = '/php/uploads/blog_images/' . $fname;
            }
        } else {
            @file_put_contents($debugLog, date('c') . " - upload error code: " . intval($_FILES['image']['error']) . "\n", FILE_APPEND);
        }
    }

    // generate slug if not provided
    if (empty($slug) && !empty($title)) {
        $slug = mb_strtolower($title, 'UTF-8');
        $mapFrom = ['ı','ş','ğ','ü','ö','ç','İ','Ş','Ğ','Ü','Ö','Ç',' '];
        $mapTo   = ['i','s','g','u','o','c','i','s','g','u','o','c','-'];
        $slug = str_replace($mapFrom, $mapTo, $slug);
        $slug = preg_replace('/[^a-z0-9-]+/u', '', $slug);
        $slug = preg_replace('/-+/', '-', $slug);
        $slug = trim($slug, '-');
    }

    // ensure uniqueness of slug
    if (!empty($slug)) {
        $base = $slug;
        $i = 0;
        while (true) {
            $checkSql = 'SELECT COUNT(*) FROM blogs WHERE slug = :slug' . ($id ? ' AND id != :id' : '');
            $stmtCheck = $pdo->prepare($checkSql);
            $paramsCheck = [':slug' => $slug];
            if ($id) $paramsCheck[':id'] = $id;
            $stmtCheck->execute($paramsCheck);
            $cnt = (int)$stmtCheck->fetchColumn();
            if ($cnt === 0) break;
            $i++;
            $slug = $base . '-' . $i;
        }
    }

    if ($id) {
        // update
        $fields = [
            'title' => $title,
            'paragraph1' => $paragraph1,
            'paragraph2' => $paragraph2,
            'paragraph3' => $paragraph3,
            'author' => $author,
            'published_date' => $published_date,
            'meta_title' => $meta_title,
            'meta_desc' => $meta_desc,
            'meta_keywords' => $meta_keywords,
            'schema_desc' => $schema_desc,
        ];
        if (!empty($slug)) $fields['slug'] = $slug;
    if ($imagePath) $fields['image'] = $imagePath;

        $setParts = [];
        $params = [];
        foreach ($fields as $k => $v) {
            $setParts[] = "$k = :$k";
            $params[":$k"] = $v;
        }
        $params[':id'] = $id;
        $sql = "UPDATE blogs SET " . implode(', ', $setParts) . ", updated_at = CURRENT_TIMESTAMP WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $pdo->commit();
        $resp = ['ok' => true, 'id' => $id, 'image_saved' => (bool)$imagePath];
        if ($imageAttempted && !$imagePath) $resp['image_warning'] = 'image_upload_failed_on_server';
        json_ok($resp);
        exit;
    }

    // insert
    $stmt = $pdo->prepare("INSERT INTO blogs (title, image, paragraph1, paragraph2, paragraph3, meta_title, meta_desc, meta_keywords, schema_desc, author, published_date, slug) VALUES (:title, :image, :p1, :p2, :p3, :mt, :md, :mk, :sd, :author, :pd, :slug)");
    $stmt->execute([
        ':title' => $title,
        ':image' => $imagePath,
        ':p1' => $paragraph1,
        ':p2' => $paragraph2,
        ':p3' => $paragraph3,
        ':mt' => $meta_title,
        ':md' => $meta_desc,
        ':mk' => $meta_keywords,
        ':sd' => $schema_desc,
        ':author' => $author,
        ':pd' => $published_date,
        ':slug' => $slug,
    ]);

    $newId = (int)$pdo->lastInsertId();
    $pdo->commit();
    $resp = ['ok' => true, 'id' => $newId, 'image_saved' => (bool)$imagePath];
    if ($imageAttempted && !$imagePath) $resp['image_warning'] = 'image_upload_failed_on_server';
    json_ok($resp);

} catch (Throwable $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    // Log the exception for debugging
    $logDir = __DIR__ . '/../logs';
    if (!is_dir($logDir)) @mkdir($logDir, 0755, true);
    $logFile = $logDir . '/blogs_save.log';
    @file_put_contents($logFile, date('c') . " - " . $e->getMessage() . "\n" . $e->getTraceAsString() . "\n\n", FILE_APPEND);

    http_response_code(500);
    echo json_encode(['error' => 'save_error', 'message' => $e->getMessage()]);
}

?>
