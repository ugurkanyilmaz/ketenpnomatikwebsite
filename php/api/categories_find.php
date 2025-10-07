<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

// Function to slugify text (same as categories.php)
function textToSlug(string $text): string {
    $slug = str_replace(
        ['ı', 'ş', 'ğ', 'ü', 'ö', 'ç', 'İ', 'Ş', 'Ğ', 'Ü', 'Ö', 'Ç', ' '],
        ['i', 's', 'g', 'u', 'o', 'c', 'i', 's', 'g', 'u', 'o', 'c', '-'],
        $text
    );
    return mb_strtolower($slug, 'UTF-8');
}

// Build slug-to-title mapping from database
function buildSlugMapping($pdo): array {
    $mapping = [];
    
    // Get all unique parent values
    $stmt = $pdo->query('SELECT DISTINCT parent FROM categories WHERE parent IS NOT NULL');
    foreach ($stmt->fetchAll(PDO::FETCH_COLUMN) as $val) {
        $slug = textToSlug($val);
        $mapping[$slug] = $val;
    }
    
    // Get all unique child values
    $stmt = $pdo->query('SELECT DISTINCT child FROM categories WHERE child IS NOT NULL');
    foreach ($stmt->fetchAll(PDO::FETCH_COLUMN) as $val) {
        $slug = textToSlug($val);
        $mapping[$slug] = $val;
    }
    
    // Get all unique subchild values
    $stmt = $pdo->query('SELECT DISTINCT subchild FROM categories WHERE subchild IS NOT NULL');
    foreach ($stmt->fetchAll(PDO::FETCH_COLUMN) as $val) {
        $slug = textToSlug($val);
        $mapping[$slug] = $val;
    }
    
    return $mapping;
}

// Convert slug to actual database value using mapping
function slugToTitle(string $slug, array $mapping): string {
    return $mapping[$slug] ?? $slug;
}

$parent = $_GET['parent'] ?? null;
$child = $_GET['child'] ?? null;
$subchild = $_GET['subchild'] ?? null;

// Build slug mapping from database
$slugMapping = buildSlugMapping($pdo);

// If parameters look like slugs (contain hyphens or are all lowercase), convert them
if ($parent && (strpos($parent, '-') !== false || mb_strtolower($parent, 'UTF-8') === $parent)) {
    $parent = slugToTitle($parent, $slugMapping);
}
if ($child && (strpos($child, '-') !== false || mb_strtolower($child, 'UTF-8') === $child)) {
    $child = slugToTitle($child, $slugMapping);
}
if ($subchild && (strpos($subchild, '-') !== false || mb_strtolower($subchild, 'UTF-8') === $subchild)) {
    $subchild = slugToTitle($subchild, $slugMapping);
}

$where = [];
$params = [];
if ($parent) { $where[] = 'parent = :parent'; $params[':parent'] = $parent; }
if ($child) { $where[] = 'child = :child'; $params[':child'] = $child; }
if ($subchild) { $where[] = 'subchild = :subchild'; $params[':subchild'] = $subchild; }

$sql = 'SELECT * FROM categories';
if ($where) { $sql .= ' WHERE ' . implode(' AND ', $where); }
$sql .= ' ORDER BY featured DESC, created_at DESC';

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];

json_ok(['items' => $rows]);
