<?php
// php/api/generate_sitemap.php
// Simple endpoint to accept a POSTed sitemap XML and write it to the project root as sitemap.xml
// Security: set $UPLOAD_KEY to a secret value before enabling on a public server.

header('Content-Type: application/json; charset=utf-8');

$UPLOAD_KEY = 'CHANGE_ME_SECRET'; // <<< Replace with a strong secret on the server

// Allow only POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Only POST allowed']);
    exit;
}

// Read raw body
$raw = file_get_contents('php://input');
if (!$raw) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Empty body']);
    exit;
}

// Simple API key check: either X-API-Key header or ?key= in query string
$headers = getallheaders();
$provided = '';
if (isset($headers['X-API-Key'])) $provided = $headers['X-API-Key'];
if (empty($provided) && isset($_GET['key'])) $provided = $_GET['key'];

if ($UPLOAD_KEY !== '' && $provided !== $UPLOAD_KEY) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Invalid API key']);
    exit;
}

// Determine target path (two levels up from php/api => project root)
$target = realpath(__DIR__ . '/../../') . DIRECTORY_SEPARATOR . 'sitemap.xml';

if ($target === false) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Could not resolve target path']);
    exit;
}

$written = file_put_contents($target, $raw);
if ($written === false) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to write sitemap file']);
    exit;
}

echo json_encode(['success' => true, 'message' => 'sitemap written', 'path' => $target]);

?>
