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

    // articles table (article içerikleri için)
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS articles (
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
    $pdo->exec("CREATE UNIQUE INDEX IF NOT EXISTS ux_articles_path ON articles(parent, child, subchild);");

    // products table (ürünler için)
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT,
            parent TEXT,
            child TEXT,
            subchild TEXT,
            title TEXT NOT NULL,
            sku TEXT,
            paragraph TEXT,
            description TEXT,
            brand TEXT,
            feature1 TEXT,
            feature2 TEXT,
            feature3 TEXT,
            feature4 TEXT,
            feature5 TEXT,
            feature6 TEXT,
            feature7 TEXT,
            feature8 TEXT,
            feature9 TEXT,
            feature10 TEXT,
            feature11 TEXT,
            main_img TEXT,
            p_img1 TEXT,
            p_img2 TEXT,
            p_img3 TEXT,
            p_img4 TEXT,
            p_img5 TEXT,
            p_img6 TEXT,
            p_img7 TEXT,
            meta_description TEXT,
            meta_title TEXT,
            schema_description TEXT,
            keywords TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME
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

    // site_images: stores dynamic site images for different sections
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS site_images (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            section_key TEXT NOT NULL UNIQUE,
            image_path TEXT NOT NULL,
            width INTEGER,
            height INTEGER,
            alt_text TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME
        );"
    );

    echo "Database ready at: $dbFile\n";
    echo "Ensured tables: users, articles, products, category_photos, site_images\n";

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

// Seed default site images if table is empty
$existingImages = $pdo->query('SELECT COUNT(*) FROM site_images')->fetchColumn();
if ((int)$existingImages === 0) {
    $defaultImages = [
        // Ana sayfa görselleri
        ['home_hero_1', '/keten_banner.jpg', 1920, 1080, 'Keten Pnömatik'],
        ['home_hero_2', '/endus.jpg', 1920, 1080, 'Endüstriyel Seri'],
        ['home_hero_3', '/professional_banner.png', 1920, 1080, 'Profesyonel Seri'],
        ['home_electric', '/professional_banner.png', 1920, 1080, 'Elektrikli ürünler'],
        ['home_battery', '/professional_banner.png', 1920, 1080, 'Akülü ürünler'],
        ['home_pneumatic', '/endus.jpg', 1920, 1080, 'Havalı ürünler'],
        ['home_process_1', '/technical_service_banner.png', 1920, 1080, 'İhtiyaç analizi'],
        ['home_process_2', '/keten_banner.jpg', 1920, 1080, 'Ürün/Seri seçimi'],
        ['home_process_3', '/technical_service_banner.png', 1920, 1080, 'Kurulum ve eğitim'],
        ['home_process_4', '/professional_banner.png', 1920, 1080, 'Servis ve takip'],
        
        // Hakkımızda ana sayfa
        ['about_hero', '/dist.jpg', 1920, 1080, 'Distribütörlük hero'],
        ['about_kolver', '/professional_banner.png', 1920, 1080, 'Kolver Elektrikli Tork Sistemleri'],
        ['about_apac', '/keten_banner.jpg', 1920, 1080, 'APAC Pnömatik El Aletleri'],
        ['about_hiyoki', '/endus.jpg', 1920, 1080, 'Hiyoki Ölçüm Cihazları'],
        ['about_service', '/technical_service_banner.png', 1920, 1080, 'Keten Pnömatik Teknik Servis'],
        
        // Kolver detay sayfası
        ['kolver_section_1', '/professional_banner.png', 1920, 1080, 'Kolver tork çözümleri'],
        ['kolver_section_2', '/keten_banner.jpg', 1920, 1080, 'Kolver Ergonomik Tasarım'],
        ['kolver_section_3', '/endus.jpg', 1920, 1080, 'Kolver Endüstriyel Uygulamalar'],
        
        // APAC detay sayfası
        ['apac_section_1', '/keten_banner.jpg', 1920, 1080, 'APAC ürün gamı'],
        ['apac_section_2', '/professional_banner.png', 1920, 1080, 'APAC Pnömatik Aletler'],
        ['apac_section_3', '/endus.jpg', 1920, 1080, 'APAC Endüstriyel Uygulamalar'],
        
        // Hiyoki detay sayfası
        ['hiyoki_section_1', '/endus.jpg', 1920, 1080, 'Hiyoki ölçüm çözümleri'],
        ['hiyoki_section_2', '/professional_banner.png', 1920, 1080, 'Hiyoki Ölçüm Sistemleri'],
        ['hiyoki_section_3', '/keten_banner.jpg', 1920, 1080, 'Hiyoki Teknik Destek'],
        
        // Teknik Servis
        ['technical_service_hero', '/technical_service_banner.png', 1920, 1080, 'Teknik Servis'],
    ];
    
    $stmt = $pdo->prepare("
        INSERT INTO site_images (section_key, image_path, width, height, alt_text)
        VALUES (:section_key, :image_path, :width, :height, :alt_text)
    ");
    
    foreach ($defaultImages as $img) {
        $stmt->execute([
            ':section_key' => $img[0],
            ':image_path' => $img[1],
            ':width' => $img[2],
            ':height' => $img[3],
            ':alt_text' => $img[4]
        ]);
    }
    
    echo "Seeded " . count($defaultImages) . " default site images\n";
}

?>
