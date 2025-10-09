<?php
// api/site_images.php
// CRUD operations for site images

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($method) {
        case 'GET':
            handleGet($pdo);
            break;
        case 'POST':
            handlePost($pdo);
            break;
        case 'PUT':
            handlePut($pdo);
            break;
        case 'DELETE':
            handleDelete($pdo);
            break;
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

function handleGet($pdo) {
    // GET /api/site_images.php?section_key=home_hero_1
    // GET /api/site_images.php (list all)
    
    // support prefix queries: ?prefix=apac_section will return all site_images where section_key LIKE 'apac_section%'
    if (isset($_GET['prefix'])) {
        $prefix = $_GET['prefix'];
        $stmt = $pdo->prepare('SELECT * FROM site_images WHERE section_key LIKE :prefix ORDER BY section_key ASC');
        $stmt->execute([':prefix' => $prefix . '%']);
        $images = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($images);
        return;
    }

    if (isset($_GET['section_key'])) {
        $stmt = $pdo->prepare('SELECT * FROM site_images WHERE section_key = :section_key');
        $stmt->execute([':section_key' => $_GET['section_key']]);
        $image = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($image) {
            echo json_encode($image);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Image not found']);
        }
    } else {
        $stmt = $pdo->query('SELECT * FROM site_images ORDER BY section_key ASC');
        $images = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($images);
    }
}

function handlePost($pdo) {
    // Create new site image
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['section_key']) || !isset($data['image_path'])) {
        http_response_code(400);
        echo json_encode(['error' => 'section_key and image_path are required']);
        return;
    }
    
    $stmt = $pdo->prepare("
        INSERT INTO site_images (section_key, image_path, width, height, alt_text, updated_at)
        VALUES (:section_key, :image_path, :width, :height, :alt_text, datetime('now'))
    ");
    
    $stmt->execute([
        ':section_key' => $data['section_key'],
        ':image_path' => $data['image_path'],
        ':width' => $data['width'] ?? null,
        ':height' => $data['height'] ?? null,
        ':alt_text' => $data['alt_text'] ?? null
    ]);
    
    $id = $pdo->lastInsertId();
    $result = $pdo->query("SELECT * FROM site_images WHERE id = $id")->fetch(PDO::FETCH_ASSOC);
    
    http_response_code(201);
    echo json_encode($result);
}

function handlePut($pdo) {
    // Update existing site image
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['section_key'])) {
        http_response_code(400);
        echo json_encode(['error' => 'section_key is required']);
        return;
    }
    
    // Check if exists
    $check = $pdo->prepare('SELECT id FROM site_images WHERE section_key = :section_key');
    $check->execute([':section_key' => $data['section_key']]);
    
    if (!$check->fetch()) {
        http_response_code(404);
        echo json_encode(['error' => 'Image not found']);
        return;
    }
    
    $stmt = $pdo->prepare("
        UPDATE site_images 
        SET image_path = :image_path,
            width = :width,
            height = :height,
            alt_text = :alt_text,
            updated_at = datetime('now')
        WHERE section_key = :section_key
    ");
    
    $stmt->execute([
        ':section_key' => $data['section_key'],
        ':image_path' => $data['image_path'],
        ':width' => $data['width'] ?? null,
        ':height' => $data['height'] ?? null,
        ':alt_text' => $data['alt_text'] ?? null
    ]);
    
    $result = $pdo->prepare('SELECT * FROM site_images WHERE section_key = :section_key');
    $result->execute([':section_key' => $data['section_key']]);
    
    echo json_encode($result->fetch(PDO::FETCH_ASSOC));
}

function handleDelete($pdo) {
    // DELETE /api/site_images.php?section_key=home_hero_1
    
    if (!isset($_GET['section_key'])) {
        http_response_code(400);
        echo json_encode(['error' => 'section_key is required']);
        return;
    }
    
    $stmt = $pdo->prepare('DELETE FROM site_images WHERE section_key = :section_key');
    $stmt->execute([':section_key' => $_GET['section_key']]);
    
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Image deleted']);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Image not found']);
    }
}
