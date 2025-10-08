<?php
// api/upload_site_image.php
// Upload site images

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

require_once __DIR__ . '/bootstrap.php';

try {
    if (!isset($_FILES['image'])) {
        http_response_code(400);
        echo json_encode(['error' => 'No image file provided']);
        exit;
    }

    $file = $_FILES['image'];
    $section_key = $_POST['section_key'] ?? '';
    $alt_text = $_POST['alt_text'] ?? '';

    if (empty($section_key)) {
        http_response_code(400);
        echo json_encode(['error' => 'section_key is required']);
        exit;
    }

    // Validate file type
    $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!in_array($file['type'], $allowedTypes)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed']);
        exit;
    }

    // Validate file size (max 5MB)
    if ($file['size'] > 5 * 1024 * 1024) {
        http_response_code(400);
        echo json_encode(['error' => 'File size too large. Maximum 5MB allowed']);
        exit;
    }

    // Generate unique filename
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = 'site_' . $section_key . '_' . time() . '.' . $extension;
    
    // Upload directory (relative to project root)
    $uploadDir = __DIR__ . '/../../react/public/uploads/site_images/';
    
    // Create directory if not exists
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $uploadPath = $uploadDir . $filename;
    
    if (!move_uploaded_file($file['tmp_name'], $uploadPath)) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to upload file']);
        exit;
    }

    // Get image dimensions
    list($width, $height) = getimagesize($uploadPath);

    $imagePath = '/uploads/site_images/' . $filename;

    // Update or insert into database
    $check = $pdo->prepare('SELECT id FROM site_images WHERE section_key = :section_key');
    $check->execute([':section_key' => $section_key]);
    
    if ($check->fetch()) {
        // Update existing
        $stmt = $pdo->prepare("
            UPDATE site_images 
            SET image_path = :image_path,
                width = :width,
                height = :height,
                alt_text = :alt_text,
                updated_at = datetime('now')
            WHERE section_key = :section_key
        ");
    } else {
        // Insert new
        $stmt = $pdo->prepare("
            INSERT INTO site_images (section_key, image_path, width, height, alt_text, updated_at)
            VALUES (:section_key, :image_path, :width, :height, :alt_text, datetime('now'))
        ");
    }

    $success = $stmt->execute([
        ':section_key' => $section_key,
        ':image_path' => $imagePath,
        ':width' => $width,
        ':height' => $height,
        ':alt_text' => $alt_text
    ]);

    // Debug log
    error_log("Image upload - section_key: $section_key, success: " . ($success ? 'yes' : 'no'));
    error_log("Image path: $imagePath, width: $width, height: $height");

    // Fetch and return the updated record
    $result = $pdo->prepare('SELECT * FROM site_images WHERE section_key = :section_key');
    $result->execute([':section_key' => $section_key]);
    $image = $result->fetch(PDO::FETCH_ASSOC);
    
    error_log("Fetched image: " . json_encode($image));

    echo json_encode([
        'success' => true,
        'image' => $image,
        'message' => 'Image uploaded successfully'
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
