<?php
// Common bootstrap for API endpoints
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
// Allow local dev
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') { exit(0); }

// Load simple .env if present (KEY=VALUE lines)
$envFile = dirname(__DIR__) . '/.env';
$env = [];
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        $parts = explode('=', $line, 2);
        if (count($parts) === 2) {
            $env[trim($parts[0])] = trim($parts[1]);
        }
    }
}

// If MySQL config is provided, prefer MySQL connection
$mysqlHost = $env['DB_HOST'] ?? getenv('DB_HOST') ?: null;
$mysqlDb   = $env['DB_NAME'] ?? getenv('DB_NAME') ?: null;
$mysqlUser = $env['DB_USER'] ?? getenv('DB_USER') ?: null;
$mysqlPass = $env['DB_PASS'] ?? getenv('DB_PASS') ?: null;

try {
    // Require explicit MySQL configuration on the server. Do not fallback to SQLite.
    if (!($mysqlHost && $mysqlDb && $mysqlUser)) {
        http_response_code(500);
        echo json_encode([
            'error' => 'mysql_config_missing',
            'message' => 'MySQL configuration missing. Please set DB_HOST, DB_NAME and DB_USER in php/.env or environment.'
        ]);
        exit;
    }

    // connect to the configured MySQL host
    $dsn = sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', $mysqlHost, $mysqlDb);
    $pdo = new PDO($dsn, $mysqlUser, $mysqlPass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'db_connect_error', 'message' => $e->getMessage()]);
    exit;
}

function json_ok($data): void {
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}
