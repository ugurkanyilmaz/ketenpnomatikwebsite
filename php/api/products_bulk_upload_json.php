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

// Use INSERT ... ON DUPLICATE KEY UPDATE to atomically insert or update by unique sku.
// For image fields we want to preserve existing images when the incoming value is empty;
// achieve this using COALESCE(NULLIF(VALUES(field), ''), existing_field) in the UPDATE clause.
$ins = $pdo->prepare(
    'INSERT INTO products (url, parent, child, subchild, title, sku, paragraph, description, brand, feature1, feature2, feature3, feature4, feature5, feature6, feature7, feature8, feature9, feature10, feature11, main_img, p_img1, p_img2, p_img3, p_img4, p_img5, p_img6, p_img7, meta_description, meta_title, schema_description, keywords, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)'
);

// Build ON DUPLICATE KEY UPDATE clause; use VALUES(...) (MySQL) to access inserted values
// and COALESCE(NULLIF(VALUES(main_img), ''), main_img) to avoid overwriting with empty strings.
$onDup = 'ON DUPLICATE KEY UPDATE '
    . 'url=VALUES(url), parent=VALUES(parent), child=VALUES(child), subchild=VALUES(subchild), '
    . 'title=VALUES(title), paragraph=VALUES(paragraph), description=VALUES(description), brand=VALUES(brand), '
    . 'feature1=VALUES(feature1), feature2=VALUES(feature2), feature3=VALUES(feature3), feature4=VALUES(feature4), '
    . 'feature5=VALUES(feature5), feature6=VALUES(feature6), feature7=VALUES(feature7), feature8=VALUES(feature8), '
    . 'feature9=VALUES(feature9), feature10=VALUES(feature10), feature11=VALUES(feature11), '
    . "main_img=COALESCE(NULLIF(VALUES(main_img), ''), main_img), "
    . "p_img1=COALESCE(NULLIF(VALUES(p_img1), ''), p_img1), "
    . "p_img2=COALESCE(NULLIF(VALUES(p_img2), ''), p_img2), "
    . "p_img3=COALESCE(NULLIF(VALUES(p_img3), ''), p_img3), "
    . "p_img4=COALESCE(NULLIF(VALUES(p_img4), ''), p_img4), "
    . "p_img5=COALESCE(NULLIF(VALUES(p_img5), ''), p_img5), "
    . "p_img6=COALESCE(NULLIF(VALUES(p_img6), ''), p_img6), "
    . "p_img7=COALESCE(NULLIF(VALUES(p_img7), ''), p_img7), "
    . 'meta_description=VALUES(meta_description), meta_title=VALUES(meta_title), schema_description=VALUES(schema_description), keywords=VALUES(keywords), updated_at=CURRENT_TIMESTAMP';

// Prepare a combined statement (we'll append the ON DUPLICATE part when executing)
$insWithDup = $pdo->prepare($ins->queryString . ' ' . $onDup);

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
            // Execute combined INSERT ... ON DUPLICATE KEY UPDATE
            $insWithDup->execute([
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

            // Determine if this was an insert or an update. MySQL's affected rows for
            // INSERT ... ON DUPLICATE KEY UPDATE returns 1 for insert, 2 for update (when a row is changed),
            // but PDO->rowCount() behavior depends on driver; use ROW_COUNT() via a query for reliability.
            $rowCountRes = $pdo->query('SELECT ROW_COUNT() AS rc')->fetch(PDO::FETCH_ASSOC);
            $rc = $rowCountRes['rc'] ?? null;
            if ($rc === null) {
                // Fallback: if we can't read ROW_COUNT, assume inserted
                $inserted++;
            } else {
                $rc = (int)$rc;
                if ($rc === 1) $inserted++;
                elseif ($rc === 2) $updated++;
                else $skipped++; // zero affected? treat as skipped
            }
        } catch (PDOException $e) {
            $errors[] = ['index' => $idx, 'error' => 'db_error', 'message' => $e->getMessage()];
            $skipped++;
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
