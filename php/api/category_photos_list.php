<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

// Optional filters
$parent = $_GET['parent'] ?? null;
$child = $_GET['child'] ?? null;

try {
    if ($parent && $child) {
        // Filter by both parent and child
        $sql = 'SELECT * FROM category_photos WHERE parent = :parent AND child = :child ORDER BY display_order ASC, created_at ASC';
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':parent' => $parent, ':child' => $child]);
    } elseif ($parent) {
        // Filter by parent only
        $sql = 'SELECT * FROM category_photos WHERE parent = :parent ORDER BY display_order ASC, created_at ASC';
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':parent' => $parent]);
    } else {
        // Get all photos
        $sql = 'SELECT * FROM category_photos ORDER BY parent ASC, child ASC, display_order ASC, created_at ASC';
        $stmt = $pdo->query($sql);
    }
    
    $photos = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    
    json_ok([
        'success' => true,
        'count' => count($photos),
        'photos' => $photos
    ]);
    
} catch (Throwable $e) {
    http_response_code(500);
    json_ok(['error' => 'fetch_failed', 'message' => $e->getMessage()]);
}
