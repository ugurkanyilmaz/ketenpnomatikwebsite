<?php
// dump_site_images.php — prints site_images rows for debugging

$dbFile = __DIR__ . '/database.sqlite';
if (!file_exists($dbFile)) {
    echo "Database not found: $dbFile\n";
    exit(1);
}

try {
    $pdo = new PDO('sqlite:' . $dbFile);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT section_key, image_path, width, height, alt_text, created_at, updated_at FROM site_images WHERE section_key LIKE 'about_%' OR section_key LIKE 'home_%' ORDER BY section_key");
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($rows, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) . "\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    exit(1);
}

?>
