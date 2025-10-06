<?php
// Common bootstrap for API endpoints
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
// Allow local dev
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') { exit(0); }

$dbFile = dirname(__DIR__) . '/database.sqlite';
if (!file_exists($dbFile)) {
    http_response_code(500);
    echo json_encode(['error' => 'database_not_found']);
    exit;
}

try {
    $pdo = new PDO('sqlite:' . $dbFile);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'db_connect_error', 'message' => $e->getMessage()]);
    exit;
}

function json_ok($data): void {
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}
