<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

$slug = $_GET['slug'] ?? null;
$id = $_GET['id'] ?? null;

try {
    if ($slug) {
        $stmt = $pdo->prepare('SELECT * FROM blogs WHERE slug = :slug LIMIT 1');
        $stmt->execute([':slug' => $slug]);
    } elseif ($id) {
        $stmt = $pdo->prepare('SELECT * FROM blogs WHERE id = :id LIMIT 1');
        $stmt->execute([':id' => $id]);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'missing_identifier']);
        exit;
    }

    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$row) {
        http_response_code(404);
        echo json_encode(['error' => 'not_found']);
        exit;
    }

    json_ok(['blog' => $row]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'db_error', 'message' => $e->getMessage()]);
}

?>
