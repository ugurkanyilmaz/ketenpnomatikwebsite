<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

// Only accept POST or DELETE methods
if (!in_array($_SERVER['REQUEST_METHOD'] ?? '', ['POST', 'DELETE'])) {
    http_response_code(405);
    json_ok(['error' => 'method_not_allowed', 'message' => 'Only POST or DELETE methods are allowed']);
    exit;
}

// Get request body
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Support both JSON body and POST params
$categoryId = $data['id'] ?? $_POST['id'] ?? null;

if (!$categoryId) {
    http_response_code(400);
    json_ok(['error' => 'missing_id', 'message' => 'Category ID is required']);
    exit;
}

try {
    // Check if category exists
    $stmt = $pdo->prepare('SELECT id, parent, child, subchild, title FROM articles WHERE id = :id');
    $stmt->execute([':id' => $categoryId]);
    $category = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$category) {
        http_response_code(404);
        json_ok(['error' => 'not_found', 'message' => 'Category not found']);
        exit;
    }
    
    // Delete the category
    $stmt = $pdo->prepare('DELETE FROM articles WHERE id = :id');
    $stmt->execute([':id' => $categoryId]);
    
    json_ok([
        'success' => true,
        'message' => 'Category deleted successfully',
        'deleted_category' => $category
    ]);
    
} catch (Throwable $e) {
    http_response_code(500);
    json_ok(['error' => 'delete_failed', 'message' => $e->getMessage()]);
}
