<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

$stmt = $pdo->query('SELECT parent, child, subchild, title FROM categories');
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];

$map = [];
foreach ($rows as $r) {
    $p = $r['parent'] ?: 'other';
    $c = $r['child'] ?: 'misc';
    $s = $r['subchild'] ?: '';
    if (!isset($map[$p])) {
        $map[$p] = [ 'id' => $p, 'title' => ucfirst($p), 'children' => [] ];
    }
    if (!isset($map[$p]['children'][$c])) {
        $map[$p]['children'][$c] = [ 'id' => $c, 'title' => ucfirst(str_replace('-', ' ', $c)), 'subchildren' => [] ];
    }
    if ($s !== '') {
        $map[$p]['children'][$c]['subchildren'][] = [ 'id' => $s, 'title' => $r['title'] ?: ucfirst($s) ];
    }
}

$tiers = [];
foreach ($map as $parent) {
    $parent['children'] = array_values($parent['children']);
    $tiers[] = $parent;
}

json_ok(['tiers' => $tiers]);
