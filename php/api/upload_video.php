<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Upload directory: place uploaded videos into frontend public uploads/videos
$uploadDir = __DIR__ . '/../../react/public/uploads/videos/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Check if file was uploaded
if (!isset($_FILES['video']) || $_FILES['video']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'No file uploaded or upload error']);
    exit;
}

$file = $_FILES['video'];
$fileSize = $file['size'];
$fileType = $file['type'];
$tmpName = $file['tmp_name'];

// NOTE: No size validation per request. Be aware of server PHP limits (upload_max_filesize/post_max_size).

// Validate file type (common video mime types)
$allowedTypes = [
    'video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv', 'video/3gpp', 'video/3gpp2'
];
if (!in_array($fileType, $allowedTypes)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid file type. Only video files are allowed']);
    exit;
}

// Get file extension
$extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

// Generate unique filename
$fileName = uniqid('video_', true) . '.' . $extension;
$filePath = $uploadDir . $fileName;

// Move uploaded file
if (!move_uploaded_file($tmpName, $filePath)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to save file']);
    exit;
}

// Generate a public URL
$relativePath = '/react/public/uploads/videos/' . $fileName;
$CANONICAL_BASE = 'https://ketenpnomatik.com';
$absoluteUrl = rtrim($CANONICAL_BASE, '/') . $relativePath;

echo json_encode([
    'success' => true,
    'url' => $absoluteUrl,
    'relative_url' => $relativePath,
    'filename' => $fileName,
    'size' => $fileSize,
    'type' => $fileType
]);
