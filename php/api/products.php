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
    // We'll perform normalized, Turkish-insensitive matching in PHP after fetching
    // rows from the DB so admin search matches the client-side behavior.
    // Do not add SQL LIKE clauses for q to avoid differing normalization rules.
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

$sql .= ' ORDER BY id DESC';
if ($q === '') {
    // Prepare SQL with LIMIT/OFFSET for normal (no-q) listing to avoid fetching
    // the entire table. This avoids binding :limit/:offset on a statement
    // that doesn't contain those placeholders.
    $sqlLimited = $sql . ' LIMIT :limit OFFSET :offset';
    $stmt = $pdo->prepare($sqlLimited);
    foreach ($params as $k => $v) { $stmt->bindValue($k, $v, PDO::PARAM_STR); }
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
} else {
    // q present: fetch candidate rows by non-q filters and apply PHP-side
    // normalized filtering below.
    $stmt = $pdo->prepare($sql);
    foreach ($params as $k => $v) { $stmt->bindValue($k, $v, PDO::PARAM_STR); }
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
}

// Sanitize image URL fields to avoid broken URLs (e.g. "https://https://...")
function normalize_image_url(?string $url): string {
    if ($url === null) return '';
    $u = trim($url);
    if ($u === '' || strtoupper($u) === 'NULL') return '';

    // Remove escaped slashes from JSON-encoded inputs
    $u = str_replace('\\/', '/', $u);

    // Fix double protocols like 'https://https://' or 'http://http://'
    $u = preg_replace('#^(https?://)+(https?://)#i', '$1', $u);

    // If accidentally has a protocol after an escaped prefix (e.g. 'https:/https://'), normalize
    $u = preg_replace('#^(https?:/)+(https?://)#i', '$1$2', $u);

    // If it starts with protocol twice without proper slashes, collapse repeated protocols
    $u = preg_replace('#^(https?://){2,}#i', 'https://', $u);

    // If it starts with '//' (protocol-relative), prefix https:
    if (strpos($u, '//') === 0) {
        $u = 'https:' . $u;
    }

    return $u;
}

// Normalize image fields on each row
foreach ($rows as $idx => $r) {
    foreach (['main_img','p_img1','p_img2','p_img3','p_img4','p_img5','p_img6','p_img7'] as $field) {
        if (array_key_exists($field, $r)) {
            $rows[$idx][$field] = normalize_image_url($r[$field]);
        }
    }
}

// If q is provided, we normalize Turkish characters and perform filtering
// in PHP to match the client-side behavior. Otherwise use SQL COUNT for total.
function normalize_search_str(?string $s): string {
    if ($s === null) return '';
    $s = mb_strtolower(trim($s), 'UTF-8');
    $map = [
        'ı' => 'i', 'İ' => 'i',
        'ş' => 's', 'Ş' => 's',
        'ğ' => 'g', 'Ğ' => 'g',
        'ü' => 'u', 'Ü' => 'u',
        'ö' => 'o', 'Ö' => 'o',
        'ç' => 'c', 'Ç' => 'c'
    ];
    $s = strtr($s, $map);
    $s = preg_replace('/\s+/', ' ', $s);
    return $s;
}

if ($q !== '') {
    $normQ = normalize_search_str($q);
    $filtered = array_filter($rows, function($r) use ($normQ) {
        $hay = sprintf("%s %s %s %s %s",
            $r['title'] ?? '',
            $r['sku'] ?? '',
            $r['description'] ?? '',
            $r['paragraph'] ?? '',
            $r['brand'] ?? ''
        );
        $hayNorm = normalize_search_str($hay);
        return $normQ === '' ? true : (mb_strpos($hayNorm, $normQ) !== false);
    });
    $rows = array_values($filtered);
    $total = count($rows);
    // Apply pagination in PHP
    $rows = array_slice($rows, $offset, $limit);
} else {
    // No query: compute total via SQL using non-q filters
    $countSql = 'SELECT COUNT(*) as total FROM products WHERE 1=1';
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
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode(['success' => true, 'count' => count($rows), 'total' => $total, 'products' => $rows], JSON_UNESCAPED_UNICODE);
