<?php
// admin_login.php
// Accepts JSON { username, password } or form-encoded POST and authenticates against users table.
// Will accept either a hashed password (verified with password_verify) or a plaintext password
// stored in DB. If a plaintext match is used, the stored password will be upgraded to a secure hash.

require_once __DIR__ . '/bootstrap.php';

$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    $input = $_POST;
}

$email = trim($input['username'] ?? $input['email'] ?? '');
$password = $input['password'] ?? null;

if (!$email || !$password) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'missing_credentials']);
    exit;
}

$stmt = $pdo->prepare('SELECT id, name, email, password, role FROM users WHERE email = :email OR name = :email LIMIT 1');
$stmt->execute([':email' => $email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    http_response_code(401);
    echo json_encode(['ok' => false, 'error' => 'invalid_credentials']);
    exit;
}

$stored = $user['password'];
$login_ok = false;
$should_rehash = false;

// If stored value is a recognized hash, try password_verify first
if (password_verify($password, $stored)) {
    $login_ok = true;
    if (password_needs_rehash($stored, PASSWORD_DEFAULT)) {
        $should_rehash = true;
    }
} else {
    // Not a matching hash. If stored value doesn't look like a password hash (algo === 0),
    // treat it as plaintext and compare directly. If it matches, upgrade to a hash.
    $info = password_get_info($stored);
    if (isset($info['algo']) && $info['algo'] === 0) {
        // Treat stored as plaintext: trim both sides to avoid accidental whitespace mismatches
        $storedPlain = trim((string)$stored);
        $provided = trim((string)$password);
        // Use hash_equals for timing-attack-safe comparison
        if (hash_equals($storedPlain, $provided)) {
            $login_ok = true;
            $should_rehash = true; // plaintext -> rehash
        }
    }
}

if (!$login_ok) {
    http_response_code(401);
    echo json_encode(['ok' => false, 'error' => 'invalid_credentials']);
    exit;
}

// Upgrade stored password to a secure hash if needed
if ($should_rehash) {
    $newHash = password_hash($password, PASSWORD_DEFAULT);
    try {
        $upd = $pdo->prepare('UPDATE users SET password = :pw, updated_at = NOW() WHERE id = :id');
        $upd->execute([':pw' => $newHash, ':id' => $user['id']]);
    } catch (Throwable $e) {
        // If update fails, continue — authentication succeeded
    }
}

// Simple token generation for frontend; not persisted server-side in this minimal implementation.
$token = bin2hex(random_bytes(24));

echo json_encode(['ok' => true, 'token' => $token, 'user' => ['email' => $user['email'], 'name' => $user['name'], 'role' => $user['role']]]);

?>
