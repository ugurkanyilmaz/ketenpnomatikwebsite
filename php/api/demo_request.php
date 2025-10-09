<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

// Accept JSON POST with demo request payload and insert into demo_requests table
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Content-Type: application/json; charset=utf-8', true, 405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!$data) {
    header('Content-Type: application/json; charset=utf-8', true, 400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
    exit;
}

$first = isset($data['firstName']) ? trim((string)$data['firstName']) : '';
$last = isset($data['lastName']) ? trim((string)$data['lastName']) : '';
$email = isset($data['email']) ? trim((string)$data['email']) : '';
$phone = isset($data['phone']) ? trim((string)$data['phone']) : '';
$company = isset($data['company']) ? trim((string)$data['company']) : '';
$notes = isset($data['notes']) ? trim((string)$data['notes']) : '';
$products = isset($data['products']) ? json_encode($data['products'], JSON_UNESCAPED_UNICODE) : '[]';

try {
    $pdo->beginTransaction();
    $pdo->exec("CREATE TABLE IF NOT EXISTS demo_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        email TEXT,
        phone TEXT,
        company TEXT,
        products TEXT,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    $stmt = $pdo->prepare('INSERT INTO demo_requests (first_name,last_name,email,phone,company,products,notes) VALUES (:first,:last,:email,:phone,:company,:products,:notes)');
    $stmt->execute([
        ':first' => $first,
        ':last' => $last,
        ':email' => $email,
        ':phone' => $phone,
        ':company' => $company,
        ':products' => $products,
        ':notes' => $notes,
    ]);

    $pdo->commit();
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['success' => true, 'id' => (int)$pdo->lastInsertId()]);
} catch (Exception $e) {
    $pdo->rollBack();
    header('Content-Type: application/json; charset=utf-8', true, 500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
