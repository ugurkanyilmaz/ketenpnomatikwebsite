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
    
    // Ensure photo_url is absolute (prefix canonical domain if relative)
    // Normalize photo_url to cPanel-visible path: https://ketenpnomatik.com/react/public/uploads/...
    $CPANEL_BASE = 'https://ketenpnomatik.com';
    foreach ($photos as &$ph) {
        if (!empty($ph['photo_url']) && !preg_match('#^https?://#i', $ph['photo_url'])) {
            $u = $ph['photo_url'];
            // If stored path doesn't already include /react/public, ensure it does
            if (strpos($u, '/react/public/') === false) {
                // strip leading /php if present
                $u = preg_replace('#^/php#', '', $u);
                // ensure leading slash
                if (strpos($u, '/') !== 0) $u = '/' . $u;
                // place under /react/public
                $u = '/react/public' . $u;
            }
            $ph['photo_url'] = rtrim($CPANEL_BASE, '/') . $u;
        }
    }
    unset($ph);

    json_ok([
        'success' => true,
        'count' => count($photos),
        'photos' => $photos
    ]);
    
} catch (Throwable $e) {
    http_response_code(500);
    json_ok(['error' => 'fetch_failed', 'message' => $e->getMessage()]);
}
