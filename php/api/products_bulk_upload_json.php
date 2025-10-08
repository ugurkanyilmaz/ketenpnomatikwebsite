<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'method_not_allowed']);
    exit;
}

$raw = file_get_contents('php://input');
if ($raw === false || $raw === '') {
    http_response_code(400);
    echo json_encode(['error' => 'empty_body']);
    exit;
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'invalid_json']);
    exit;
}

// Support multiple JSON formats
if (isset($data['Sheet1']) && is_array($data['Sheet1'])) {
    $items = $data['Sheet1'];
} elseif (isset($data['items']) && is_array($data['items'])) {
    $items = $data['items'];
} else {
    $items = $data;
}

$sanitize = function ($v): string {
    if ($v === null) return '';
    $s = trim((string)$v);
    if ($s === '' || strcasecmp($s, 'null') === 0) return '';
    return $s;
};

$pdo->beginTransaction();
$ins = $pdo->prepare('INSERT INTO products (url, parent, child, subchild, title, sku, paragraph, description, brand, feature1, feature2, feature3, feature4, feature5, feature6, feature7, feature8, feature9, feature10, feature11, main_img, p_img1, p_img2, p_img3, p_img4, p_img5, p_img6, p_img7, meta_description, meta_title, schema_description, keywords, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)');
$upd = $pdo->prepare('UPDATE products SET url=?, parent=?, child=?, subchild=?, paragraph=?, description=?, brand=?, feature1=?, feature2=?, feature3=?, feature4=?, feature5=?, feature6=?, feature7=?, feature8=?, feature9=?, feature10=?, feature11=?, main_img=?, p_img1=?, p_img2=?, p_img3=?, p_img4=?, p_img5=?, p_img6=?, p_img7=?, meta_description=?, meta_title=?, schema_description=?, keywords=?, updated_at=CURRENT_TIMESTAMP WHERE sku=?');

$inserted = 0; $updated = 0; $skipped = 0; $errors = [];
try {
    foreach ($items as $idx => $row) {
        if (!is_array($row)) { $skipped++; continue; }
        
        $title = $sanitize($row['title'] ?? '');
        $sku = $sanitize($row['sku'] ?? '');
        
        if ($title === '' || $sku === '') {
            $errors[] = ['index' => $idx, 'error' => 'missing_title_or_sku'];
            $skipped++;
            continue;
        }

        try {
            $ins->execute([
                $sanitize($row['URL'] ?? $row['url'] ?? ''),
                $sanitize($row['Parent'] ?? $row['parent'] ?? ''),
                $sanitize($row['child'] ?? ''),
                $sanitize($row['subchild'] ?? ''),
                $title,
                $sku,
                $sanitize($row['paragraph'] ?? ''),
                $sanitize($row['description'] ?? ''),
                $sanitize($row['brand'] ?? ''),
                $sanitize($row['feature1'] ?? ''),
                $sanitize($row['feature2'] ?? ''),
                $sanitize($row['feature3'] ?? ''),
                $sanitize($row['feature4'] ?? ''),
                $sanitize($row['feature5'] ?? ''),
                $sanitize($row['feature6'] ?? ''),
                $sanitize($row['feature7'] ?? ''),
                $sanitize($row['feature8'] ?? ''),
                $sanitize($row['feature9'] ?? ''),
                $sanitize($row['feature10'] ?? ''),
                $sanitize($row['feature11'] ?? ''),
                $sanitize($row['main_img'] ?? ''),
                $sanitize($row['p_img1'] ?? ''),
                $sanitize($row['p_img2'] ?? ''),
                $sanitize($row['p_img3'] ?? ''),
                $sanitize($row['p_img4'] ?? ''),
                $sanitize($row['p_img5'] ?? ''),
                $sanitize($row['p_img6'] ?? ''),
                $sanitize($row['p_img7'] ?? ''),
                $sanitize($row['meta_description'] ?? ''),
                $sanitize($row['meta_title'] ?? ''),
                $sanitize($row['schema_description'] ?? ''),
                $sanitize($row['keywords'] ?? ''),
            ]);
            $inserted++;
        } catch (PDOException $e) {
            if (strpos($e->getMessage(), 'UNIQUE') !== false) {
                $upd->execute([
                    $sanitize($row['URL'] ?? $row['url'] ?? ''),
                    $sanitize($row['Parent'] ?? $row['parent'] ?? ''),
                    $sanitize($row['child'] ?? ''),
                    $sanitize($row['subchild'] ?? ''),
                    $sanitize($row['paragraph'] ?? ''),
                    $sanitize($row['description'] ?? ''),
                    $sanitize($row['brand'] ?? ''),
                    $sanitize($row['feature1'] ?? ''),
                    $sanitize($row['feature2'] ?? ''),
                    $sanitize($row['feature3'] ?? ''),
                    $sanitize($row['feature4'] ?? ''),
                    $sanitize($row['feature5'] ?? ''),
                    $sanitize($row['feature6'] ?? ''),
                    $sanitize($row['feature7'] ?? ''),
                    $sanitize($row['feature8'] ?? ''),
                    $sanitize($row['feature9'] ?? ''),
                    $sanitize($row['feature10'] ?? ''),
                    $sanitize($row['feature11'] ?? ''),
                    $sanitize($row['main_img'] ?? ''),
                    $sanitize($row['p_img1'] ?? ''),
                    $sanitize($row['p_img2'] ?? ''),
                    $sanitize($row['p_img3'] ?? ''),
                    $sanitize($row['p_img4'] ?? ''),
                    $sanitize($row['p_img5'] ?? ''),
                    $sanitize($row['p_img6'] ?? ''),
                    $sanitize($row['p_img7'] ?? ''),
                    $sanitize($row['meta_description'] ?? ''),
                    $sanitize($row['meta_title'] ?? ''),
                    $sanitize($row['schema_description'] ?? ''),
                    $sanitize($row['keywords'] ?? ''),
                    $sku,
                ]);
                $updated++;
            } else {
                $errors[] = ['index' => $idx, 'error' => 'db_error', 'message' => $e->getMessage()];
                $skipped++;
            }
        }
    }
    $pdo->commit();
} catch (Throwable $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['error' => 'import_failed', 'message' => $e->getMessage()]);
    exit;
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode(['status' => 'ok', 'inserted' => $inserted, 'updated' => $updated, 'skipped' => $skipped, 'errors' => $errors], JSON_UNESCAPED_UNICODE);
