<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

// Products list API with filters
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 50;
$offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
$q = isset($_GET['q']) ? trim((string)$_GET['q']) : '';
$parent = isset($_GET['parent']) ? trim((string)$_GET['parent']) : '';
$child = isset($_GET['child']) ? trim((string)$_GET['child']) : '';
$subchild = isset($_GET['subchild']) ? trim((string)$_GET['subchild']) : '';
$brand = isset($_GET['brand']) ? trim((string)$_GET['brand']) : '';
$sku = isset($_GET['sku']) ? trim((string)$_GET['sku']) : '';
$url = isset($_GET['url']) ? trim((string)$_GET['url']) : '';

$sql = 'SELECT * FROM products WHERE 1=1';
$params = [];

// Helper to escape LIKE wildcards so user input is treated literally
function escape_like(string $s): string {
    // escape backslash first
    $s = str_replace('\\', '\\\\', $s);
    $s = str_replace('%', '\\%', $s);
    $s = str_replace('_', '\\_', $s);
    return $s;
}

if ($q !== '') {
    $safeQ = escape_like($q);
    $sql .= " AND (title LIKE :q ESCAPE '\\' OR description LIKE :q ESCAPE '\\' OR paragraph LIKE :q ESCAPE '\\' OR brand LIKE :q ESCAPE '\\' OR sku LIKE :q ESCAPE '\\')";
    $params[':q'] = "%{$safeQ}%";
}
if ($parent !== '') {
    $sql .= ' AND parent = :parent';
    $params[':parent'] = $parent;
}
if ($child !== '') {
    $sql .= ' AND child = :child';
    $params[':child'] = $child;
}
if ($subchild !== '') {
    $sql .= ' AND subchild = :subchild';
    $params[':subchild'] = $subchild;
}
if ($brand !== '') {
    $sql .= ' AND brand = :brand';
    $params[':brand'] = $brand;
}
if ($sku !== '') {
    $sql .= ' AND sku = :sku';
    $params[':sku'] = $sku;
}
if ($url !== '') {
    $sql .= ' AND url = :url';
    $params[':url'] = $url;
}

$sql .= ' ORDER BY id DESC LIMIT :limit OFFSET :offset';
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
foreach ($params as $k => $v) { $stmt->bindValue($k, $v, PDO::PARAM_STR); }
$stmt->execute();
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];

// Get total count for pagination
$countSql = 'SELECT COUNT(*) as total FROM products WHERE 1=1';
if ($q !== '') $countSql .= " AND (title LIKE :q ESCAPE '\\' OR description LIKE :q ESCAPE '\\' OR paragraph LIKE :q ESCAPE '\\' OR brand LIKE :q ESCAPE '\\' OR sku LIKE :q ESCAPE '\\')";
if ($parent !== '') $countSql .= ' AND parent = :parent';
if ($child !== '') $countSql .= ' AND child = :child';
if ($subchild !== '') $countSql .= ' AND subchild = :subchild';
if ($brand !== '') $countSql .= ' AND brand = :brand';
if ($sku !== '') $countSql .= ' AND sku = :sku';
if ($url !== '') $countSql .= ' AND url = :url';

$countStmt = $pdo->prepare($countSql);
foreach ($params as $k => $v) { $countStmt->bindValue($k, $v, PDO::PARAM_STR); }
$countStmt->execute();
$total = (int)$countStmt->fetch(PDO::FETCH_ASSOC)['total'];

header('Content-Type: application/json; charset=utf-8');
echo json_encode(['success' => true, 'count' => count($rows), 'total' => $total, 'products' => $rows], JSON_UNESCAPED_UNICODE);
