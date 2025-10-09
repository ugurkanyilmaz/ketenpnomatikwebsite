<?php
// sync_section_images.php
// Generic tool: for each base key in $bases, copy its image_path into the corresponding targets

$dbFile = __DIR__ . '/database.sqlite';

if (!file_exists($dbFile)) {
    echo "Database file not found: $dbFile\n";
    exit(1);
}

try {
    $pdo = new PDO('sqlite:' . $dbFile);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Base keys to sync (you can add more if needed)
    $bases = [
        'about_hiyoki',
        'about_apac',
        'about_kolver'
    ];

    // For each base, the targets are base + _hero and base + _showcase
    $select = $pdo->prepare('SELECT * FROM site_images WHERE section_key = :section_key');
    $update = $pdo->prepare("UPDATE site_images SET image_path = :image_path, width = :width, height = :height, alt_text = :alt_text, updated_at = datetime('now') WHERE section_key = :section_key");
    $insert = $pdo->prepare("INSERT INTO site_images (section_key, image_path, width, height, alt_text, updated_at) VALUES (:section_key, :image_path, :width, :height, :alt_text, datetime('now'))");

    foreach ($bases as $base) {
        $select->execute([':section_key' => $base]);
        $src = $select->fetch(PDO::FETCH_ASSOC);

        if (!$src) {
            echo "Source key '$base' not found — skipping.\n";
            continue;
        }

        $targets = ["{$base}_hero", "{$base}_showcase"];

        foreach ($targets as $t) {
            $select->execute([':section_key' => $t]);
            $existing = $select->fetch(PDO::FETCH_ASSOC);

            if ($existing) {
                $update->execute([
                    ':image_path' => $src['image_path'],
                    ':width' => $src['width'],
                    ':height' => $src['height'],
                    ':alt_text' => $src['alt_text'],
                    ':section_key' => $t
                ]);
                echo "Updated $t to use {$src['image_path']}\n";
            } else {
                $insert->execute([
                    ':section_key' => $t,
                    ':image_path' => $src['image_path'],
                    ':width' => $src['width'],
                    ':height' => $src['height'],
                    ':alt_text' => $src['alt_text']
                ]);
                echo "Inserted $t with {$src['image_path']}\n";
            }
        }
    }

    echo "\nFinal listing for affected keys:\n";
    $placeholders = implode(',', array_fill(0, count($bases) * 3, '?'));
    $keys = [];
    foreach ($bases as $b) {
        $keys[] = $b;
        $keys[] = "{$b}_hero";
        $keys[] = "{$b}_showcase";
    }

    $stmt = $pdo->prepare("SELECT * FROM site_images WHERE section_key IN ($placeholders) ORDER BY section_key");
    $stmt->execute($keys);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($rows as $r) {
        echo json_encode($r, JSON_UNESCAPED_UNICODE) . "\n";
    }

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    exit(1);
}

?>
