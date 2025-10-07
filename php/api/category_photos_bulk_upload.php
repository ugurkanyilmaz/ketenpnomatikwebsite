<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'method_not_allowed', 'message' => 'Use POST with Content-Type: application/json']);
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
    echo json_encode(['error' => 'invalid_json', 'json_error' => json_last_error_msg()]);
    exit;
}

// Accept either { items: [...] } or raw array [...]
$items = isset($data['items']) && is_array($data['items']) ? $data['items'] : $data;

// Helper functions
$sanitize = function ($v): string {
    if ($v === null) return '';
    $s = trim((string)$v);
    if ($s === '' || strcasecmp($s, 'null') === 0) return '';
    return $s;
};

// Required columns
$required = ['parent', 'child', 'photo_url'];

$pdo->beginTransaction();
$ins = $pdo->prepare('INSERT INTO category_photos (parent, child, photo_url, alt_text, display_order, updated_at) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)');
$upd = $pdo->prepare('UPDATE category_photos SET alt_text=?, display_order=?, updated_at=CURRENT_TIMESTAMP WHERE parent=? AND child=? AND photo_url=?');

$inserted = 0; $updated = 0; $skipped = 0; $errors = [];

try {
    foreach ($items as $idx => $row) {
        if (!is_array($row)) { 
            $skipped++; 
            continue; 
        }

        // Validate required fields
        foreach ($required as $r) {
            if (!isset($row[$r]) || $sanitize($row[$r]) === '') {
                $errors[] = ['index' => $idx, 'error' => 'missing_' . $r];
                $skipped++;
                continue 2;
            }
        }

        $parent = $sanitize($row['parent']);
        $child = $sanitize($row['child']);
        $photoUrl = $sanitize($row['photo_url']);
        $altText = $sanitize($row['alt_text'] ?? '');
        $displayOrder = isset($row['display_order']) ? (int)$row['display_order'] : 0;

        try {
            $ins->execute([
                $parent,
                $child,
                $photoUrl,
                $altText,
                $displayOrder
            ]);
            $inserted++;
        } catch (PDOException $e) {
            if (strpos($e->getMessage(), 'UNIQUE') !== false) {
                $upd->execute([
                    $altText,
                    $displayOrder,
                    $parent,
                    $child,
                    $photoUrl
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

json_ok(['status' => 'ok', 'inserted' => $inserted, 'updated' => $updated, 'skipped' => $skipped, 'errors' => $errors]);
