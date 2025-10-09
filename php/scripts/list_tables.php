<?php
// list_tables.php - inspect php/database.sqlite and print tables + demo_requests schema
$dbPath = __DIR__ . '/../database.sqlite';
if (!file_exists($dbPath)) {
    echo "Database file not found: $dbPath\n";
    exit(1);
}
try {
    $pdo = new PDO('sqlite:' . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    echo "SQLite DB: $dbPath\n\n";

    $rows = $pdo->query("SELECT name, type FROM sqlite_master WHERE type IN ('table','view') ORDER BY name")->fetchAll(PDO::FETCH_ASSOC);
    if (!$rows) {
        echo "No tables or views found.\n";
        exit(0);
    }

    echo "Tables/Views:\n";
    foreach ($rows as $r) {
        echo " - {$r['name']} ({$r['type']})\n";
    }

    if (in_array('demo_requests', array_column($rows, 'name'))) {
        echo "\nSchema for demo_requests:\n";
        $cols = $pdo->query("PRAGMA table_info('demo_requests')")->fetchAll(PDO::FETCH_ASSOC);
        foreach ($cols as $c) {
            echo sprintf("  %s %s %s %s default:%s pk:%s\n", $c['cid'], $c['name'], $c['type'], $c['notnull'] ? 'NOTNULL' : 'NULL', $c['dflt_value'], $c['pk']);
        }
        $count = (int)$pdo->query("SELECT COUNT(*) as c FROM demo_requests")->fetch(PDO::FETCH_ASSOC)['c'];
        echo "\nRows in demo_requests: $count\n";
    } else {
        echo "\nTable 'demo_requests' not found.\n";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    exit(2);
}
