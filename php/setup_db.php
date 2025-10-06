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
            featured INTEGER DEFAULT 0,
            info TEXT,
            summary TEXT,
            usable_areas TEXT,
            meta_title TEXT,
            meta_desc TEXT,
            schema_desc TEXT,
            meta_keywords TEXT,
            main_image TEXT,
            img1 TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME
        );"
    );

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

    echo "Database ready at: $dbFile\n";
    echo "Ensured tables: users, categories, series, products, ftop\n";

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

// Seed categories minimal demo data if table is empty
$cnt = (int)$pdo->query('SELECT COUNT(*) FROM categories')->fetchColumn();
if ($cnt === 0) {
    $ins = $pdo->prepare('INSERT INTO categories (parent, child, subchild, title, title_subtext, about, featured, info, summary, usable_areas, meta_title, meta_desc, schema_desc, meta_keywords, main_image, img1) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
    $seed = [
        ['endustriyel','darbeli-somun-sokme','seri-apac','APAC Serisi','Yüksek performans','APAC hakkında',1,'Bilgi','Özet','Atölye, üretim','APAC Meta','APAC Desc','APAC Schema','apac, seri','', ''],
        ['endustriyel','darbeli-somun-sokme','impactx','ImpactX Serisi','Darbeli güç','ImpactX hakkında',0,'Bilgi','Özet','Endüstri','ImpactX Meta','ImpactX Desc','ImpactX Schema','impactx, seri','', ''],
        ['endustriyel','kompresorler','apac-komp','APAC Kompresör','Sessiz verimlilik','APAC Kompresör',0,'Bilgi','Özet','Fabrikalar','Meta','Desc','Schema','kompresör','', ''],
        ['profesyonel','kompresorler','pro-komp-100','Pro Kompresör 100','Kompakt güç','Pro Kompresör 100',0,'Bilgi','Özet','Servis','Meta','Desc','Schema','pro, komp','', ''],
    ];
    foreach ($seed as $r) { $ins->execute($r); }
    echo "Seeded sample categories (4 rows)\n";
}

?>
