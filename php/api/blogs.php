<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

try {
    $stmt = $pdo->query('SELECT id, title, image, paragraph1, paragraph2, paragraph3, author, published_date, slug, meta_title, meta_desc, meta_keywords, schema_desc FROM blogs ORDER BY published_date DESC, created_at DESC');
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    // create an excerpt from paragraph1 if excerpt not provided
    $blogs = array_map(function($r) {
        $excerpt = '';
        if (!empty($r['paragraph1'])) {
            $excerpt = mb_substr(strip_tags($r['paragraph1']), 0, 200);
        }
        return array_merge($r, ['excerpt' => $excerpt]);
    }, $rows);
    json_ok(['blogs' => $blogs]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'db_error', 'message' => $e->getMessage()]);
}

?>
