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
$photoId = $data['id'] ?? $_POST['id'] ?? null;

if (!$photoId) {
    http_response_code(400);
    json_ok(['error' => 'missing_id', 'message' => 'Photo ID is required']);
    exit;
}

try {
    // Check if photo exists
    $stmt = $pdo->prepare('SELECT * FROM category_photos WHERE id = :id');
    $stmt->execute([':id' => $photoId]);
    $photo = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$photo) {
        http_response_code(404);
        json_ok(['error' => 'not_found', 'message' => 'Photo not found']);
        exit;
    }
    
    // Delete the photo
    $stmt = $pdo->prepare('DELETE FROM category_photos WHERE id = :id');
    $stmt->execute([':id' => $photoId]);
    
    json_ok([
        'success' => true,
        'message' => 'Photo deleted successfully',
        'deleted_photo' => $photo
    ]);
    
} catch (Throwable $e) {
    http_response_code(500);
    json_ok(['error' => 'delete_failed', 'message' => $e->getMessage()]);
}
