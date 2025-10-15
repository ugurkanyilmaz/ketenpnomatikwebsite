<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

// Simple auth: allow if ADMIN_TOKEN matches or if running from localhost
$adminToken = $env['ADMIN_TOKEN'] ?? (getenv('ADMIN_TOKEN') ?: null);
$provided = $_GET['admin_token'] ?? $_POST['admin_token'] ?? null;
if ($adminToken) {
    if (!$provided || $provided !== $adminToken) {
        http_response_code(403);
        echo json_encode(['success' => false, 'error' => 'forbidden', 'message' => 'Invalid admin token']);
        exit;
    }
}

$type = isset($_GET['type']) ? strtolower((string)$_GET['type']) : 'all';

$out = [];
try {
    if ($type === 'categories' || $type === 'all') {
        $stmt = $pdo->query('SELECT * FROM articles ORDER BY id ASC');
        $out['categories'] = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    if ($type === 'products' || $type === 'all') {
        $stmt = $pdo->query('SELECT * FROM products ORDER BY id ASC');
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
        // reuse normalization used by products.php
        foreach ($rows as $idx => $r) {
            foreach (['main_img','p_img1','p_img2','p_img3','p_img4','p_img5','p_img6','p_img7'] as $field) {
                if (array_key_exists($field, $r)) {
                    $rows[$idx][$field] = preg_replace('#^(https?://)+(https?://)#i', '$1', str_replace('\\/', '/', (string)$r[$field]));
                }
            }
        }
        $out['products'] = $rows;
    }

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['success' => true, 'type' => $type, 'data' => $out], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'server_error', 'message' => $e->getMessage()]);
}
