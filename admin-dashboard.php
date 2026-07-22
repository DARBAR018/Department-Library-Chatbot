<?php
session_start();

if (!isset($_SESSION['admin'])) {
    header("Location: admin-login.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard | Library Portal</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <style>
        body {
            background: var(--bg-gradient);
        }
        .sidebar {
            min-height: 100vh;
            background: rgba(255,255,255,0.7);
            border-right: 1px solid var(--card-border);
            backdrop-filter: blur(10px);
        }
        .nav-link {
            color: var(--text-color);
            border-radius: 10px;
            margin-bottom: 6px;
        }
        .nav-link:hover, .nav-link.active {
            background: var(--primary-color);
            color: white;
        }
        .card-stat {
            border-left: 4px solid var(--primary-color);
        }
    </style>
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <aside class="col-md-3 col-lg-2 sidebar p-3">
                <h4 class="fw-800 mb-4">Library Admin</h4>
                <div class="mb-4">
                    <p class="mb-1 text-muted small">Signed in as</p>
                    <h6 class="fw-bold">Administrator</h6>
                </div>
                <nav class="d-flex flex-column">
                    <a class="nav-link active px-3 py-2" href="#"><span class="material-icons me-2">dashboard</span> Dashboard</a>
                    <a class="nav-link px-3 py-2" href="books.php"><span class="material-icons me-2">menu_book</span> Books</a>
                    <a class="nav-link px-3 py-2" href="issue.php"><span class="material-icons me-2">swap_horiz</span> Issue / Return</a>
                    <a class="nav-link px-3 py-2" href="admin-login.php?logout=1"><span class="material-icons me-2">logout</span> Logout</a>
                </nav>
            </aside>

            <main class="col-md-9 col-lg-10 p-4">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 class="fw-800 mb-1">Admin Dashboard</h2>
                        <p class="text-muted mb-0">Manage library operations from one place.</p>
                    </div>
                    <a href="index.html" class="btn btn-outline-custom">View Site</a>
                </div>

                <div class="row g-4 mb-4">
                    <div class="col-sm-6 col-xl-3">
                        <div class="glass-card p-4 card-stat">
                            <h6 class="text-muted">Total Books</h6>
                            <h3 class="fw-800 mb-0">1,250</h3>
                        </div>
                    </div>
                    <div class="col-sm-6 col-xl-3">
                        <div class="glass-card p-4 card-stat">
                            <h6 class="text-muted">Issued Books</h6>
                            <h3 class="fw-800 mb-0">84</h3>
                        </div>
                    </div>
                    <div class="col-sm-6 col-xl-3">
                        <div class="glass-card p-4 card-stat">
                            <h6 class="text-muted">Students</h6>
                            <h3 class="fw-800 mb-0">320</h3>
                        </div>
                    </div>
                    <div class="col-sm-6 col-xl-3">
                        <div class="glass-card p-4 card-stat">
                            <h6 class="text-muted">Pending Returns</h6>
                            <h3 class="fw-800 mb-0">12</h3>
                        </div>
                    </div>
                </div>

                <div class="row g-4">
                    <div class="col-lg-7">
                        <div class="glass-card p-4 h-100">
                            <h5 class="fw-800 mb-3">Quick Actions</h5>
                            <div class="d-grid gap-2">
                                <a href="books.php" class="btn btn-primary-custom text-start">Manage Books</a>
                                <a href="issue.php" class="btn btn-cyan-custom text-start">Issue / Return Books</a>
                                <a href="admin-login.php?logout=1" class="btn btn-outline-custom text-start">Logout</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="glass-card p-4 h-100">
                            <h5 class="fw-800 mb-3">Today’s Summary</h5>
                            <ul class="mb-0 ps-3">
                                <li>New book arrivals were cataloged.</li>
                                <li>2 overdue reminders sent to students.</li>
                                <li>Library notice updated for exams.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</body>
</html>
