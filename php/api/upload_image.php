<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Upload directory
$uploadDir = __DIR__ . '/../uploads/products/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Check if file was uploaded
if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'No file uploaded or upload error']);
    exit;
}

$file = $_FILES['image'];
$fileSize = $file['size'];
$fileType = $file['type'];
$tmpName = $file['tmp_name'];

// Validate file size (max 5MB)
$maxSize = 5 * 1024 * 1024; // 5MB
if ($fileSize > $maxSize) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'File size exceeds 5MB limit']);
    exit;
}

// Validate file type
$allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
if (!in_array($fileType, $allowedTypes)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed']);
    exit;
}

// Get file extension
$extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

// Generate unique filename
$fileName = uniqid('product_', true) . '.' . $extension;
$filePath = $uploadDir . $fileName;

// Move uploaded file
if (!move_uploaded_file($tmpName, $filePath)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to save file']);
    exit;
}

// Generate URL (relative to web root)
$fileUrl = '/php/uploads/products/' . $fileName;

echo json_encode([
    'success' => true,
    'url' => $fileUrl,
    'filename' => $fileName,
    'size' => $fileSize,
    'type' => $fileType
]);
