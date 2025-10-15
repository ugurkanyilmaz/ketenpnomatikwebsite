<?php
// dump_product.php
// Usage: php dump_product.php SKU
// Or call via web: /php/dump_product.php?sku=SKU

require_once __DIR__ . '/api/bootstrap.php';

header('Content-Type: application/json; charset=utf-8');

$sku = '';
if (PHP_SAPI === 'cli') {
    $sku = $argv[1] ?? '';
} else {
    $sku = $_GET['sku'] ?? '';
}

if (!$sku) {
    echo json_encode(['error' => 'sku_required']);
    exit;
}

try {
    $stmt = $pdo->prepare('SELECT * FROM products WHERE sku = :sku LIMIT 1');
    $stmt->execute([':sku' => $sku]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$row) {
        echo json_encode(['error' => 'not_found', 'sku' => $sku]);
    } else {
        echo json_encode(['success' => true, 'product' => $row], JSON_UNESCAPED_UNICODE);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'db_error', 'message' => $e->getMessage()]);
}

?>
