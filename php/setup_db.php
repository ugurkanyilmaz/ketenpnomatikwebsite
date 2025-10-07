<?php
// setup_db.php
// Creates an SQLite database and required tables for the project.

$dbFile = __DIR__ . '/database.sqlite';

try {
    $pdo = new PDO('sqlite:' . $dbFile);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // users table (full structure requested)
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'user', -- e.g. 'admin' or 'user'
            is_active INTEGER NOT NULL DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME
        );"
    );

    // categories table (canonical content table)
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            parent TEXT,
            child TEXT,
            subchild TEXT,
            title TEXT,
            title_subtext TEXT,
            about TEXT,
            featured TEXT,
            info TEXT,
            summary TEXT,
            usable_areas TEXT,
            meta_title TEXT,
            meta_desc TEXT,
            schema_desc TEXT,
            meta_keywords TEXT,
            main_image TEXT,
            img1 TEXT,
            video_url TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME
        );"
    );
    // Unique index for upsert semantics (parent+child+subchild defines a node)
    $pdo->exec("CREATE UNIQUE INDEX IF NOT EXISTS ux_categories_path ON categories(parent, child, subchild);");

    // skeleton tables for series, products, ftop
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS series (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT UNIQUE,
            title TEXT,
            description TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );"
    );

    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            series_id INTEGER,
            sku TEXT UNIQUE,
            title TEXT,
            description TEXT,
            price REAL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(series_id) REFERENCES series(id)
        );"
    );

    // ftop: mapping which product belongs to which article page
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS ftop (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER,
            article_id INTEGER,
            note TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(product_id) REFERENCES products(id)
        );"
    );

    // category_photos: stores photos for parent+child (subcategory) combinations
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS category_photos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            parent TEXT NOT NULL,
            child TEXT NOT NULL,
            photo_url TEXT NOT NULL,
            alt_text TEXT,
            display_order INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME
        );"
    );
    // Unique index for parent+child+photo_url to prevent duplicates
    $pdo->exec("CREATE UNIQUE INDEX IF NOT EXISTS ux_category_photos_path ON category_photos(parent, child, photo_url);");

    echo "Database ready at: $dbFile\n";
    echo "Ensured tables: users, categories, series, products, ftop, category_photos\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    if (file_exists($dbFile)) {
        unlink($dbFile);
    }
    exit(1);
}

// Seed admin user if not exists
$existing = $pdo->prepare('SELECT COUNT(*) FROM users WHERE email = :email');
$existing->execute([':email' => 'admin@example.com']);
if ((int)$existing->fetchColumn() === 0) {
    $adminPassword = password_hash('admin123', PASSWORD_DEFAULT);
    $stmt = $pdo->prepare('INSERT INTO users (name, email, password, role) VALUES (:name, :email, :password, :role)');
    $stmt->execute([
        ':name' => 'Admin',
        ':email' => 'admin@example.com',
        ':password' => $adminPassword,
        ':role' => 'admin'
    ]);
    echo "Seeded admin user: admin@example.com (password: admin123)\n";
}

?>
