<?php
// setup_db.php
// Creates MySQL database tables for the project.

require_once 'api/bootstrap.php';

try {

    // users table (full structure requested)
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(50) NOT NULL DEFAULT 'user',
            is_active TINYINT(1) NOT NULL DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;"
    );

    // articles table (article içerikleri için)
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS articles (
            id INT AUTO_INCREMENT PRIMARY KEY,
            parent VARCHAR(255),
            child VARCHAR(255),
            subchild VARCHAR(255),
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
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;"
    );
    // Unique index for upsert semantics (parent+child+subchild defines a node)
    $pdo->exec("CREATE UNIQUE INDEX IF NOT EXISTS ux_articles_path ON articles(parent, child, subchild);");

    // products table (ürünler için)
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            url TEXT,
            parent VARCHAR(255),
            child VARCHAR(255),
            subchild VARCHAR(255),
            title VARCHAR(255) NOT NULL,
            sku VARCHAR(255),
            paragraph TEXT,
            description TEXT,
            brand VARCHAR(255),
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
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;"
    );

    // category_photos: stores photos for parent+child (subcategory) combinations
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS category_photos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            parent VARCHAR(255) NOT NULL,
            child VARCHAR(255) NOT NULL,
            photo_url TEXT NOT NULL,
            alt_text TEXT,
            display_order INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;"
    );
    // Unique index for parent+child+photo_url to prevent duplicates
    $pdo->exec("CREATE UNIQUE INDEX IF NOT EXISTS ux_category_photos_path ON category_photos(parent, child, photo_url);");

    // site_images: stores dynamic site images for different sections
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS site_images (
            id INT AUTO_INCREMENT PRIMARY KEY,
            section_key VARCHAR(255) NOT NULL UNIQUE,
            image_path TEXT NOT NULL,
            width INT,
            height INT,
            alt_text TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;"
    );

    // demo_requests: stores demo request submissions from the site
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS demo_requests (
            id INT AUTO_INCREMENT PRIMARY KEY,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            email VARCHAR(255),
            phone VARCHAR(255),
            company VARCHAR(255),
            products TEXT,
            notes TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;"
    );

    // blogs table: simple blog posts with 1 image and 3 paragraphs + SEO fields
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS blogs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            image TEXT,
            paragraph1 TEXT,
            paragraph2 TEXT,
            paragraph3 TEXT,
            meta_title TEXT,
            meta_desc TEXT,
            meta_keywords TEXT,
            schema_desc TEXT,
            author VARCHAR(255),
            published_date VARCHAR(255),
            slug VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;"
    );
    // Ensure slug column exists (for older DBs) and add unique index
    try {
        $pdo->exec("ALTER TABLE blogs ADD COLUMN slug VARCHAR(255);");
    } catch (Exception $e) {
        // ignore if column exists
    }
    try {
        $pdo->exec("CREATE UNIQUE INDEX IF NOT EXISTS ux_blogs_slug ON blogs(slug);");
    } catch (Exception $e) {
        // ignore
    }

    echo "MySQL database tables created successfully!\n";
    echo "Ensured tables: users, articles, products, category_photos, site_images, blogs, demo_requests\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    exit(1);
}

// Seed admin user if not exists
$existing = $pdo->prepare('SELECT COUNT(*) FROM users WHERE email = :email');
$existing->execute([':email' => 'keten@example.com']);
if ((int)$existing->fetchColumn() === 0) {
    // Create admin user 'keten' with the requested password
    $adminPassword = password_hash('keten@4145', PASSWORD_DEFAULT);
    $stmt = $pdo->prepare('INSERT INTO users (name, email, password, role) VALUES (:name, :email, :password, :role)');
    $stmt->execute([
        ':name' => 'keten',
        ':email' => 'keten@example.com',
        ':password' => $adminPassword,
        ':role' => 'admin'
    ]);
    echo "Seeded admin user: keten@example.com (password: keten@4145)\n";
}

// Seed default site images if table is empty
$existingImages = $pdo->query('SELECT COUNT(*) FROM site_images')->fetchColumn();
if ((int)$existingImages === 0) {
    $defaultImages = [
        // Ana sayfa görselleri
        ['home_hero_1', '/keten_banner.jpg', 1920, 1080, 'Keten Pnömatik'],
        ['home_hero_2', '/endus.jpg', 1920, 1080, 'Endüstriyel Seri'],
        ['home_hero_3', '/professional_banner.png', 1920, 1080, 'Profesyonel Seri'],
        
        // Elektrikli Ürünler - Profesyonel & Endüstriyel
        ['home_electric_professional', '/professional_banner.png', 1920, 1080, 'Profesyonel Elektrikli ürünler'],
        ['home_electric_industrial', '/endus.jpg', 1920, 1080, 'Endüstriyel Elektrikli ürünler'],
        
        // Akülü Ürünler - Profesyonel & Endüstriyel
        ['home_battery_professional', '/professional_banner.png', 1920, 1080, 'Profesyonel Akülü ürünler'],
        ['home_battery_industrial', '/endus.jpg', 1920, 1080, 'Endüstriyel Akülü ürünler'],
        
        // Havalı Ürünler - Profesyonel & Endüstriyel
        ['home_pneumatic_professional', '/professional_banner.png', 1920, 1080, 'Profesyonel Havalı ürünler'],
        ['home_pneumatic_industrial', '/endus.jpg', 1920, 1080, 'Endüstriyel Havalı ürünler'],
        
        // Özel Çözümler & Süreç
        ['home_custom_solutions', '/professional_banner.png', 1920, 1080, 'Özel çözümler'],
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
