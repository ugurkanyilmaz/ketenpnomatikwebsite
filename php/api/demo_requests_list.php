<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

// Return list of demo requests as JSON. Optional ?limit=100
header('Content-Type: application/json; charset=utf-8');

$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 200;
if ($limit <= 0) $limit = 200;

try {
    $stmt = $pdo->prepare('SELECT id, first_name, last_name, email, phone, company, products, notes, created_at FROM demo_requests ORDER BY created_at DESC LIMIT :limit');
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'count' => count($rows), 'items' => $rows], JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

