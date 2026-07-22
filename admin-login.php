<?php
session_start();

if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: admin-login.php");
    exit;
}

if (isset($_SESSION['admin'])) {
    header("Location: admin-dashboard.php");
    exit;
}

$error = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if ($username !== '' && $password !== '') {
        if ($username === 'admin' && $password === 'admin123') {
            $_SESSION['admin'] = $username;
            header("Location: admin-dashboard.php");
            exit;
        }

        $error = "Invalid admin credentials. Try admin / admin123";
    } else {
        $error = "Please enter both username and password.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login | Library Portal</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <style>
        body {
            min-height: 100vh;
            display: grid;
            place-items: center;
            padding: 20px;
        }
        .login-card {
            width: min(100%, 430px);
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: var(--border-radius-lg);
            box-shadow: var(--shadow-lg);
            padding: 32px;
            backdrop-filter: blur(12px);
        }
    </style>
</head>
<body>
    <div class="login-card">
        <div class="text-center mb-4">
            <h2 class="fw-800 mb-2">Admin Access</h2>
            <p class="text-muted mb-0">Secure portal for library administration</p>
        </div>

        <?php if ($error !== ''): ?>
            <div class="alert alert-danger" role="alert"><?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>

        <form method="post" class="mt-3">
            <div class="mb-3">
                <label class="form-label fw-semibold">Username</label>
                <input type="text" name="username" class="form-control" placeholder="Enter username" required>
            </div>
            <div class="mb-3">
                <label class="form-label fw-semibold">Password</label>
                <input type="password" name="password" class="form-control" placeholder="Enter password" required>
            </div>
            <button type="submit" class="btn btn-primary-custom w-100">Login</button>
        </form>

        <div class="mt-3 small text-muted text-center">
            Demo credentials: <strong>admin / admin123</strong>
        </div>
    </div>
</body>
</html>
