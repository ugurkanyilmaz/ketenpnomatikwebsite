<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

// Removed: CSV bulk upload endpoint is no longer available.
http_response_code(404);
header('Content-Type: application/json; charset=utf-8');
echo json_encode(['error' => 'not_found', 'message' => 'This endpoint was removed. Use /php/api/categories_bulk_upload_json.php with application/json.']);
exit;
