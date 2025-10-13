<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

$parent = $_GET['parent'] ?? null;
$child = $_GET['child'] ?? null;

if (!$parent || !$child) {
    http_response_code(400);
    json_ok(['error' => 'missing_parameters', 'message' => 'parent and child parameters are required']);
    exit;
}

$sql = 'SELECT * FROM category_photos WHERE parent = :parent AND child = :child ORDER BY display_order ASC, created_at ASC';
$stmt = $pdo->prepare($sql);
$stmt->execute([':parent' => $parent, ':child' => $child]);
$photos = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];

// Ensure photo_url is absolute (prefix domain if relative)
$baseDomain = 'https://ketenpnomatik.com';
foreach ($photos as &$ph) {
    if (!empty($ph['photo_url']) && !preg_match('#^https?://#i', $ph['photo_url'])) {
        $u = $ph['photo_url'];
        if (strpos($u, '/') !== 0) $u = '/' . $u;
        $ph['photo_url'] = rtrim($baseDomain, '/') . $u;
    }
}
unset($ph);

json_ok(['photos' => $photos]);
