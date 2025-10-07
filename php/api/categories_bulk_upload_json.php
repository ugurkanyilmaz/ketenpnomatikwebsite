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
    echo json_encode(['error' => 'invalid_json', 'json_error' => json_last_error_msg(), 'raw_length' => strlen($raw), 'raw_start' => substr($raw, 0, 200)]);
    exit;
}

// Accept either { items: [...] } or raw array [...]
$items = isset($data['items']) && is_array($data['items']) ? $data['items'] : $data;

// Helpers: key normalization and value sanitization
$normKey = function ($s): string {
    $s = (string)$s;
    $s = preg_replace('/^\xEF\xBB\xBF/', '', $s) ?? $s; // strip BOM
    $s = trim(mb_strtolower($s));
    $s = preg_replace('/\s+/', ' ', $s) ?? $s; // collapse spaces
    $s = str_replace([' ', '-'], '_', $s);
    return rtrim($s, '_');
};
$sanitize = function ($v): string {
    if ($v === null) return '';
    $s = trim((string)$v);
    if ($s === '' || strcasecmp($s, 'null') === 0) return '';
    return $s;
};
$normalizeBool = function($v): int {
    $v = trim(mb_strtolower((string)$v));
    if ($v === '' || $v === '0' || $v === 'false' || $v === 'hayir' || $v === 'hayır' || $v === 'no') { return 0; }
    if ($v === '1' || $v === 'true' || $v === 'evet' || $v === 'yes' || $v === 'y' || $v === '✓' || $v === 'x') { return 1; }
    return $v !== '' ? 1 : 0;
};

// Required minimal columns
$required = ['parent','child','subchild'];

$pdo->beginTransaction();
$ins = $pdo->prepare('INSERT INTO categories (parent,child,subchild,title,title_subtext,about,featured,info,summary,usable_areas,meta_title,meta_desc,schema_desc,meta_keywords,main_image,img1,video_url,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)');
$upd = $pdo->prepare('UPDATE categories SET title=?, title_subtext=?, about=?, featured=?, info=?, summary=?, usable_areas=?, meta_title=?, meta_desc=?, schema_desc=?, meta_keywords=?, main_image=?, img1=?, video_url=?, updated_at=CURRENT_TIMESTAMP WHERE parent=? AND child=? AND subchild=?');

$inserted = 0; $updated = 0; $skipped = 0; $errors = [];
try {
    foreach ($items as $idx => $row) {
        if (!is_array($row)) { $skipped++; continue; }

        // Normalize keys of the current row (case/space tolerant)
        $nrow = [];
        foreach ($row as $k => $v) {
            $nrow[$normKey($k)] = $v;
        }

        // Validate required keys exist and are non-empty after sanitization
        foreach ($required as $r) {
            if (!array_key_exists($r, $nrow) || $sanitize($nrow[$r]) === '') {
                $errors[] = [ 'index' => $idx, 'error' => 'missing_'.$r ];
                $skipped++;
                continue 2;
            }
        }

        $parent = $sanitize($nrow['parent']);
        $child = $sanitize($nrow['child']);
        $subchild = $sanitize($nrow['subchild']);
        $featured = $sanitize($nrow['featured'] ?? '');

        try {
            $ins->execute([
                $parent,
                $child,
                $subchild,
                $sanitize($nrow['title'] ?? ''),
                $sanitize($nrow['title_subtext'] ?? ''),
                $sanitize($nrow['about'] ?? ''),
                $featured,
                $sanitize($nrow['info'] ?? ''),
                $sanitize($nrow['summary'] ?? ''),
                $sanitize($nrow['usable_areas'] ?? ''),
                $sanitize($nrow['meta_title'] ?? ''),
                $sanitize($nrow['meta_desc'] ?? ''),
                $sanitize($nrow['schema_desc'] ?? ''),
                $sanitize($nrow['meta_keywords'] ?? ''),
                $sanitize($nrow['main_image'] ?? ''),
                $sanitize($nrow['img1'] ?? ''),
                $sanitize($nrow['video_url'] ?? ''),
            ]);
            $inserted++;
        } catch (PDOException $e) {
            if (strpos($e->getMessage(), 'UNIQUE') !== false) {
                $upd->execute([
                    $sanitize($nrow['title'] ?? ''),
                    $sanitize($nrow['title_subtext'] ?? ''),
                    $sanitize($nrow['about'] ?? ''),
                    $featured,
                    $sanitize($nrow['info'] ?? ''),
                    $sanitize($nrow['summary'] ?? ''),
                    $sanitize($nrow['usable_areas'] ?? ''),
                    $sanitize($nrow['meta_title'] ?? ''),
                    $sanitize($nrow['meta_desc'] ?? ''),
                    $sanitize($nrow['schema_desc'] ?? ''),
                    $sanitize($nrow['meta_keywords'] ?? ''),
                    $sanitize($nrow['main_image'] ?? ''),
                    $sanitize($nrow['img1'] ?? ''),
                    $sanitize($nrow['video_url'] ?? ''),
                    $parent, $child, $subchild,
                ]);
                $updated++;
            } else {
                $errors[] = [ 'index' => $idx, 'error' => 'db_error', 'message' => $e->getMessage() ];
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
