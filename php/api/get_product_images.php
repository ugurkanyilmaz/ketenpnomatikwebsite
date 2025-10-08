<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

header('Content-Type: application/json; charset=utf-8');

// Base URL for product images (cPanel'den yüklenecek görsellerin base URL'i)
// Bu URL'i kendi cPanel klasörünüze göre güncelleyin
$baseImageUrl = 'https://www.ketenpnomatik.com.tr/uploads/products/';

// Alternatif olarak localhost için:
// $baseImageUrl = '/php/uploads/products/';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'method_not_allowed']);
    exit;
}

$sku = $_GET['sku'] ?? '';

if (empty($sku)) {
    http_response_code(400);
    echo json_encode(['error' => 'sku_required']);
    exit;
}

// Sanitize SKU for filename
$safeSku = preg_replace('/[^a-zA-Z0-9-_]/', '', $sku);

// Check which images exist
$images = [
    'main_img' => null,
    'p_img1' => null,
    'p_img2' => null,
    'p_img3' => null,
    'p_img4' => null,
];

$extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

// Check main image
foreach ($extensions as $ext) {
    $filename = "{$safeSku}-main.{$ext}";
    $localPath = __DIR__ . '/../uploads/products/' . $filename;
    
    if (file_exists($localPath)) {
        $images['main_img'] = $baseImageUrl . $filename;
        break;
    }
}

// Check additional images (1-4)
for ($i = 1; $i <= 4; $i++) {
    foreach ($extensions as $ext) {
        $filename = "{$safeSku}-{$i}.{$ext}";
        $localPath = __DIR__ . '/../uploads/products/' . $filename;
        
        if (file_exists($localPath)) {
            $images["p_img{$i}"] = $baseImageUrl . $filename;
            break;
        }
    }
}

// Count found images
$foundCount = count(array_filter($images));

echo json_encode([
    'success' => true,
    'sku' => $sku,
    'found' => $foundCount,
    'images' => $images,
    'base_url' => $baseImageUrl
]);
