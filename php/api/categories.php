<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

$stmt = $pdo->query('SELECT parent, child, subchild, title FROM categories WHERE parent != "TEST"');
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];

$map = [];
foreach ($rows as $r) {
    $p = $r['parent'] ?: 'other';
    $c = $r['child'] ?: 'misc';
    $s = $r['subchild'] ?: '';
    
    // Normalize parent ID to URL-safe format (convert Turkish chars to ASCII equivalents)
    $pId = mb_strtolower($p, 'UTF-8');
    // Turkish to ASCII: İ->i, ı->i, Ş->s, ş->s, Ğ->g, ğ->g, Ü->u, ü->u, Ö->o, ö->o, Ç->c, ç->c
    $pId = str_replace(
        ['ı', 'ş', 'ğ', 'ü', 'ö', 'ç', 'İ', 'Ş', 'Ğ', 'Ü', 'Ö', 'Ç', ' '],
        ['i', 's', 'g', 'u', 'o', 'c', 'i', 's', 'g', 'u', 'o', 'c', '-'],
        $pId
    );
    
    if (!isset($map[$pId])) {
        $map[$pId] = [ 'id' => $pId, 'title' => $p, 'children' => [] ];
    }
    if (!isset($map[$pId]['children'][$c])) {
        $map[$pId]['children'][$c] = [ 'id' => $c, 'title' => ucfirst(str_replace('-', ' ', $c)), 'subchildren' => [] ];
    }
    if ($s !== '') {
        $map[$pId]['children'][$c]['subchildren'][] = [ 'id' => $s, 'title' => $r['title'] ?: ucfirst($s) ];
    }
}

$tiers = [];
foreach ($map as $parent) {
    $parent['children'] = array_values($parent['children']);
    $tiers[] = $parent;
}

json_ok(['tiers' => $tiers]);
