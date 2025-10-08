<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

$stmt = $pdo->query('SELECT parent, child, subchild, title FROM articles WHERE parent != "TEST"');
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];

// Helper function to create URL-safe slugs
function makeSlug($text) {
    $slug = mb_strtolower($text, 'UTF-8');
    // Turkish to ASCII: İ->i, ı->i, Ş->s, ş->s, Ğ->g, ğ->g, Ü->u, ü->u, Ö->o, ö->o, Ç->c, ç->c
    $slug = str_replace(
        ['ı', 'ş', 'ğ', 'ü', 'ö', 'ç', 'İ', 'Ş', 'Ğ', 'Ü', 'Ö', 'Ç'],
        ['i', 's', 'g', 'u', 'o', 'c', 'i', 's', 'g', 'u', 'o', 'c'],
        $slug
    );
    // Remove or replace special characters
    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);
    $slug = trim($slug, '-');
    return $slug;
}

$map = [];
foreach ($rows as $r) {
    $p = $r['parent'] ?: 'other';
    $c = $r['child'] ?: 'misc';
    $s = $r['subchild'] ?: '';
    
    // Create URL-safe IDs
    $pId = makeSlug($p);
    $cId = makeSlug($c);
    $sId = makeSlug($s);
    
    if (!isset($map[$pId])) {
        $map[$pId] = [ 'id' => $pId, 'title' => $p, 'children' => [] ];
    }
    if (!isset($map[$pId]['children'][$cId])) {
        $map[$pId]['children'][$cId] = [ 'id' => $cId, 'title' => $c, 'subchildren' => [] ];
    }
    if ($s !== '') {
        $map[$pId]['children'][$cId]['subchildren'][] = [ 'id' => $sId, 'title' => $r['title'] ?: $s ];
    }
}

$tiers = [];
foreach ($map as $parent) {
    $parent['children'] = array_values($parent['children']);
    $tiers[] = $parent;
}

json_ok(['tiers' => $tiers]);
