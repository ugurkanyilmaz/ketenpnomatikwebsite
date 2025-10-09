<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'method_not_allowed']);
    exit;
}

$id = $_POST['id'] ?? null;
if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'missing_id']);
    exit;
}

try {
    $stmt = $pdo->prepare('DELETE FROM blogs WHERE id = :id');
    $stmt->execute([':id' => $id]);
    json_ok(['ok' => true]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'db_error', 'message' => $e->getMessage()]);
}

?>
