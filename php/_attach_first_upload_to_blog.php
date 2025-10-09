<?php
$dir = __DIR__ . '/uploads/blog_images';
if (!is_dir($dir)) { echo "no upload dir\n"; exit(1); }
$files = array_values(array_filter(scandir($dir), function($f) use ($dir) { return is_file($dir . '/' . $f) && $f[0] !== '.'; }));
if (count($files) === 0) { echo "no files\n"; exit(1); }
$fname = $files[0];
$path = '/php/uploads/blog_images/' . $fname;
$pdo = new PDO('sqlite:' . __DIR__ . '/database.sqlite');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// choose the most recent blog if present
$row = $pdo->query('SELECT id FROM blogs ORDER BY created_at DESC LIMIT 1')->fetch(PDO::FETCH_ASSOC);
if (!$row) { echo "no blog rows\n"; exit(1); }
$id = $row['id'];
$stmt = $pdo->prepare('UPDATE blogs SET image = :img WHERE id = :id');
$stmt->execute([':img' => $path, ':id' => $id]);
echo "Set blog id $id image to $path\n";
?>