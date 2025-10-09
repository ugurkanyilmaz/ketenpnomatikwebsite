<?php
require __DIR__ . '/../api/bootstrap.php';
try {
    echo 'PDO driver: ' . $pdo->getAttribute(PDO::ATTR_DRIVER_NAME) . PHP_EOL;
} catch (Throwable $e) {
    echo 'Error: ' . $e->getMessage() . PHP_EOL;
}
