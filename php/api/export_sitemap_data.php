<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

// export_sitemap_data.php?include=products,articles&limit=1000&offset=0
$include = isset($_GET['include']) ? explode(',', trim((string)$_GET['include'])) : ['products','articles'];
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 1000;
$offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;

$out = [];

if (in_array('products', $include, true)) {
    $stmt = $pdo->prepare('SELECT id, sku, url, title, parent, child, subchild FROM products ORDER BY id DESC LIMIT :limit OFFSET :offset');
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    $out['products'] = $rows;
}

if (in_array('articles', $include, true)) {
    $stmt = $pdo->query('SELECT parent, child, subchild, title FROM articles WHERE parent != "TEST"');
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    $out['articles'] = $rows;
}

json_ok($out);
