<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Issue and return books in the Department Library system with fine calculation.">
    <title>Book Issue & Return | Library Portal</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <style>
        .tab-nav-custom { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }
        .tab-btn-custom {
            padding: 10px 22px; border-radius: var(--border-radius-sm);
            background: var(--card-bg); border: 1px solid var(--card-border);
            color: var(--text-muted); font-weight: 600; font-size: 14px;
            cursor: pointer; transition: all 0.3s; display: flex; align-items: center; gap: 8px;
        }
        .tab-btn-custom.active, .tab-btn-custom:hover {
            background: var(--primary-color); color: #fff; border-color: var(--primary-color);
        }
        .tab-panel { display: none; }
        .tab-panel.active { display: block; animation: fadeIn 0.35s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .fine-badge {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700;
        }
        .overdue-row { background: rgba(239,68,68,0.05) !important; }
        .issue-form-card { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: var(--border-radius); padding: 28px; }
        .step-badge {
            width: 28px; height: 28px; border-radius: 50%;
            background: var(--primary-color); color: white;
            display: inline-flex; align-items: center; justify-content: center;
            font-size: 13px; font-weight: 700; flex-shrink: 0;
        }
        .preview-card {
            background: linear-gradient(135deg, var(--primary-light) 0%, var(--accent-cyan-light) 100%);
            border: 1px solid var(--card-border); border-radius: var(--border-radius-sm); padding: 16px;
        }
        .return-select-label { font-weight: 700; font-size: 13px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
    </style>
</head>
<body class="d-flex flex-column min-vh-100">

    <div id="loading-screen">
        <div class="spinner-custom"></div>
        <div class="logo-loading">DEPT LIBRARY</div>
        <p class="text-muted mt-2 fs-14">Loading issue records...</p>
    </div>

    <header></header>

    <main class="container my-5 pt-5 flex-grow-1">
        <div id="breadcrumbs-container"></div>

        <!-- Page Title -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 mt-3" data-aos="fade-up">
            <div>
                <h2 class="fw-800 mb-1 d-flex align-items-center gap-2">
                    <span class="material-icons text-primary" style="font-size:32px;">swap_horiz</span>
                    Book Issue & Return
                </h2>
                <p class="text-muted fs-14 mb-0">Issue books to students, process returns, and calculate late fines</p>
            </div>
        </div>

        <!-- Summary Stats -->
        <div class="row g-3 mb-4" data-aos="fade-up" data-aos-delay="100">
            <div class="col-6 col-md-3">
                <div class="glass-card p-4 text-center">
                    <span class="material-icons text-primary" style="font-size:32px;">book_online</span>
                    <div class="fw-800 fs-3 text-primary" id="is-stat-issued">0</div>
                    <div class="text-muted fs-12 fw-600">Currently Issued</div>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="glass-card p-4 text-center">
                    <span class="material-icons text-danger" style="font-size:32px;">schedule</span>
                    <div class="fw-800 fs-3 text-danger" id="is-stat-overdue">0</div>
                    <div class="text-muted fs-12 fw-600">Overdue Books</div>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="glass-card p-4 text-center">
                    <span class="material-icons text-success" style="font-size:32px;">assignment_return</span>
                    <div class="fw-800 fs-3 text-success" id="is-stat-returned">0</div>
                    <div class="text-muted fs-12 fw-600">Total Returned</div>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="glass-card p-4 text-center">
                    <span class="material-icons text-warning" style="font-size:32px;">currency_rupee</span>
                    <div class="fw-800 fs-3 text-warning" id="is-stat-fines">₹0</div>
                    <div class="text-muted fs-12 fw-600">Total Fines Due</div>
                </div>
            </div>
        </div>

        <!-- Tab Navigation -->
        <div class="tab-nav-custom" data-aos="fade-up" data-aos-delay="150">
            <button class="tab-btn-custom active" data-tab="tab-issue">
                <span class="material-icons">add_circle</span> Issue Book
            </button>
            <button class="tab-btn-custom" data-tab="tab-return">
                <span class="material-icons">assignment_return</span> Return Book
            </button>
            <button class="tab-btn-custom" data-tab="tab-history">
                <span class="material-icons">history</span> Issue History
            </button>
            <button class="tab-btn-custom" data-tab="tab-returns">
                <span class="material-icons">receipt_long</span> Return History
            </button>
        </div>

        <!-- TAB: ISSUE BOOK -->
        <div id="tab-issue" class="tab-panel active" data-aos="fade-up" data-aos-delay="200">
            <div class="issue-form-card">
                <h5 class="fw-800 mb-4 d-flex align-items-center gap-2">
                    <span class="material-icons text-primary">library_add</span> Issue a Book to Student
                </h5>
                <form id="issue-book-form" novalidate>
                    <div class="row g-4">
                        <!-- Step 1: Select Student -->
                        <div class="col-md-6">
                            <div class="d-flex align-items-center gap-2 mb-2">
                                <span class="step-badge">1</span>
                                <span class="fw-700 fs-14">Select Student</span>
                            </div>
                            <select id="issue-student-select" class="form-select form-control-custom" required>
                                <option value="">— Choose a registered student —</option>
                            </select>
                            <!-- Student Preview -->
                            <div id="student-preview" class="preview-card mt-3 d-none">
                                <div class="d-flex align-items-center gap-3">
                                    <span class="material-icons text-primary" style="font-size:36px;">account_circle</span>
                                    <div>
                                        <div class="fw-700" id="prev-student-name">—</div>
                                        <div class="text-muted fs-12" id="prev-student-detail">—</div>
                                        <div class="text-muted fs-12" id="prev-student-books">Active issues: 0</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Step 2: Select Book -->
                        <div class="col-md-6">
                            <div class="d-flex align-items-center gap-2 mb-2">
                                <span class="step-badge">2</span>
                                <span class="fw-700 fs-14">Select Book</span>
                            </div>
                            <select id="issue-book-select" class="form-select form-control-custom" required>
                                <option value="">— Choose an available book —</option>
                            </select>
                            <!-- Book Preview -->
                            <div id="book-preview" class="preview-card mt-3 d-none">
                                <div class="d-flex align-items-center gap-3">
                                    <span class="material-icons text-primary" style="font-size:36px;">auto_stories</span>
                                    <div>
                                        <div class="fw-700" id="prev-book-title">—</div>
                                        <div class="text-muted fs-12" id="prev-book-author">—</div>
                                        <div class="text-muted fs-12" id="prev-book-avail">Available: 0</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Due Date Info -->
                        <div class="col-12">
                            <div class="d-flex align-items-center gap-3 p-3 rounded" style="background: var(--primary-light);">
                                <span class="material-icons text-primary">calendar_today</span>
                                <div class="fs-14">
                                    <strong>Issue Date:</strong> <span id="display-issue-date">—</span> &nbsp;|&nbsp;
                                    <strong>Due Date (14 days):</strong> <span id="display-due-date" class="text-primary fw-700">—</span>
                                </div>
                            </div>
                        </div>
                        <!-- Submit -->
                        <div class="col-12 d-flex gap-3">
                            <button type="submit" class="btn btn-primary-custom d-flex align-items-center gap-2 px-4">
                                <span class="material-icons">task_alt</span> Confirm Issue
                            </button>
                            <button type="reset" class="btn btn-outline-custom">Reset</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <!-- TAB: RETURN BOOK -->
        <div id="tab-return" class="tab-panel" data-aos="fade-up">
            <div class="issue-form-card">
                <h5 class="fw-800 mb-4 d-flex align-items-center gap-2">
                    <span class="material-icons text-success">assignment_return</span> Process Book Return
                </h5>
                <div class="row g-4">
                    <div class="col-md-6">
                        <div class="return-select-label mb-2">Select Issue Record to Return</div>
                        <select id="return-issue-select" class="form-select form-control-custom">
                            <option value="">— Select an active issue record —</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <!-- Return Preview -->
                        <div id="return-preview" class="d-none">
                            <div class="return-select-label mb-2">Return Summary</div>
                            <div class="issue-form-card p-3">
                                <table class="table table-sm table-borderless mb-0 fs-13 text-color">
                                    <tr><td class="text-muted fw-600 pe-3">Book</td><td id="ret-book-title" class="fw-700">—</td></tr>
                                    <tr><td class="text-muted fw-600 pe-3">Student</td><td id="ret-student-name">—</td></tr>
                                    <tr><td class="text-muted fw-600 pe-3">Issue Date</td><td id="ret-issue-date">—</td></tr>
                                    <tr><td class="text-muted fw-600 pe-3">Due Date</td><td id="ret-due-date">—</td></tr>
                                    <tr><td class="text-muted fw-600 pe-3">Return Date</td><td class="text-success fw-700" id="ret-today">—</td></tr>
                                    <tr>
                                        <td class="text-muted fw-600 pe-3">Fine</td>
                                        <td id="ret-fine-display">
                                            <span class="fine-badge" id="ret-fine-badge">₹0</span>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div id="return-empty" class="text-muted text-center py-4">
                            <span class="material-icons" style="font-size:40px; opacity:0.3;">assignment_return</span>
                            <p class="mt-2 fs-13">Select an issue record to preview return details.</p>
                        </div>
                    </div>
                    <div class="col-12">
                        <button class="btn btn-primary-custom d-flex align-items-center gap-2 px-4" id="confirm-return-btn" disabled>
                            <span class="material-icons">check_circle</span> Confirm Return
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- TAB: ISSUE HISTORY -->
        <div id="tab-history" class="tab-panel" data-aos="fade-up">
            <div class="glass-card p-4">
                <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
                    <h5 class="fw-800 mb-0">Active Issue Records</h5>
                    <input type="text" id="issue-history-search" class="form-control form-control-custom" placeholder="Search by student or book..." style="max-width:280px;">
                </div>
                <div class="table-responsive">
                    <table class="table custom-table align-middle mb-0">
                        <thead>
                            <tr>
                                <th>Book</th>
                                <th>Student</th>
                                <th>Dept</th>
                                <th>Issue Date</th>
                                <th>Due Date</th>
                                <th>Fine</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="issue-history-body"></tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- TAB: RETURN HISTORY -->
        <div id="tab-returns" class="tab-panel" data-aos="fade-up">
            <div class="glass-card p-4">
                <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
                    <h5 class="fw-800 mb-0">Return History</h5>
                    <input type="text" id="return-history-search" class="form-control form-control-custom" placeholder="Search by student or book..." style="max-width:280px;">
                </div>
                <div class="table-responsive">
                    <table class="table custom-table align-middle mb-0">
                        <thead>
                            <tr>
                                <th>Book</th>
                                <th>Student</th>
                                <th>Issue Date</th>
                                <th>Due Date</th>
                                <th>Return Date</th>
                                <th>Fine Paid</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="return-history-body"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>

    <footer></footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script type="module" src="js/app.js"></script>
    <script type="module">
        import { enforceProtectedRoute } from "./js/auth.js";
        import { getBooks, getStudents, getIssuedBooks, getReturnedBooks, issueBook, returnBook, calculateFine } from "./js/db.js";

        enforceProtectedRoute("admin");

        let allBooks = [], allStudents = [], allIssued = [], allReturned = [];

        document.addEventListener("DOMContentLoaded", async () => {
            await loadAll();
            setupTabs();
            populateDropdowns();
            renderIssueHistory();
            renderReturnHistory();
            bindIssueForm();
            bindReturnForm();
            setDateDisplays();
        });

        async function loadAll() {
            [allBooks, allStudents, allIssued, allReturned] = await Promise.all([
                getBooks(), getStudents(), getIssuedBooks(), getReturnedBooks()
            ]);
            updateStats();
        }

        function updateStats() {
            const today = new Date();
            const overdue = allIssued.filter(i => new Date(i.dueDate) < today);
            const totalFine = allIssued.reduce((s, i) => {
                const due = new Date(i.dueDate);
                return s + (today > due ? Math.ceil((today - due) / 86400000) * 2 : 0);
            }, 0);
            document.getElementById("is-stat-issued").textContent = allIssued.length;
            document.getElementById("is-stat-overdue").textContent = overdue.length;
            document.getElementById("is-stat-returned").textContent = allReturned.length;
            document.getElementById("is-stat-fines").textContent = "₹" + totalFine;
        }

        function setDateDisplays() {
            const today = new Date();
            const due = new Date(); due.setDate(due.getDate() + 14);
            document.getElementById("display-issue-date").textContent = today.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
            document.getElementById("display-due-date").textContent = due.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
        }

        function setupTabs() {
            document.querySelectorAll(".tab-btn-custom").forEach(btn => {
                btn.addEventListener("click", () => {
                    document.querySelectorAll(".tab-btn-custom").forEach(b => b.classList.remove("active"));
                    document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
                    btn.classList.add("active");
                    document.getElementById(btn.dataset.tab).classList.add("active");
                });
            });
        }

        function populateDropdowns() {
            // Students dropdown
            const studSel = document.getElementById("issue-student-select");
            studSel.innerHTML = '<option value="">— Choose a registered student —</option>' +
                allStudents.map(s => `<option value="${s.id}">${s.name} (${s.enrollmentNo || s.id}) — ${s.department}</option>`).join("");

            studSel.addEventListener("change", () => {
                const student = allStudents.find(s => s.id === studSel.value);
                const preview = document.getElementById("student-preview");
                if (student) {
                    const active = allIssued.filter(i => i.studentId === student.id).length;
                    document.getElementById("prev-student-name").textContent = student.name;
                    document.getElementById("prev-student-detail").textContent = `${student.email} | Dept: ${student.department} | Sem ${student.semester}`;
                    document.getElementById("prev-student-books").textContent = `Active issues: ${active} / 3 max`;
                    preview.classList.remove("d-none");
                } else {
                    preview.classList.add("d-none");
                }
            });

            // Books dropdown (only available books)
            const bookSel = document.getElementById("issue-book-select");
            const availBooks = allBooks.filter(b => b.available > 0);
            bookSel.innerHTML = '<option value="">— Choose an available book —</option>' +
                availBooks.map(b => `<option value="${b.id}">${b.title} — by ${b.author} (Avail: ${b.available})</option>`).join("");

            bookSel.addEventListener("change", () => {
                const book = allBooks.find(b => b.id === bookSel.value);
                const preview = document.getElementById("book-preview");
                if (book) {
                    document.getElementById("prev-book-title").textContent = book.title;
                    document.getElementById("prev-book-author").textContent = `by ${book.author} | ISBN: ${book.isbn}`;
                    document.getElementById("prev-book-avail").textContent = `Available: ${book.available} of ${book.quantity}`;
                    preview.classList.remove("d-none");
                } else {
                    preview.classList.add("d-none");
                }
            });

            // Return dropdown
            const retSel = document.getElementById("return-issue-select");
            retSel.innerHTML = '<option value="">— Select an active issue record —</option>' +
                allIssued.map(i => `<option value="${i.id}">${i.bookTitle} → ${i.studentName} (Due: ${i.dueDate})</option>`).join("");

            retSel.addEventListener("change", async () => {
                const record = allIssued.find(i => i.id === retSel.value);
                const preview = document.getElementById("return-preview");
                const empty = document.getElementById("return-empty");
                const confirmBtn = document.getElementById("confirm-return-btn");
                if (record) {
                    const fine = await calculateFine(record.id);
                    document.getElementById("ret-book-title").textContent = record.bookTitle;
                    document.getElementById("ret-student-name").textContent = record.studentName;
                    document.getElementById("ret-issue-date").textContent = record.issueDate;
                    document.getElementById("ret-due-date").textContent = record.dueDate;
                    document.getElementById("ret-today").textContent = new Date().toISOString().split("T")[0];
                    const badge = document.getElementById("ret-fine-badge");
                    badge.textContent = "₹" + fine;
                    badge.style.background = fine > 0 ? "linear-gradient(135deg,#ef4444,#dc2626)" : "linear-gradient(135deg,#22c55e,#16a34a)";
                    preview.classList.remove("d-none");
                    empty.classList.add("d-none");
                    confirmBtn.disabled = false;
                } else {
                    preview.classList.add("d-none");
                    empty.classList.remove("d-none");
                    confirmBtn.disabled = true;
                }
            });
        }

        function bindIssueForm() {
            document.getElementById("issue-book-form").addEventListener("submit", async (e) => {
                e.preventDefault();
                const studentId = document.getElementById("issue-student-select").value;
                const bookId = document.getElementById("issue-book-select").value;
                if (!studentId || !bookId) {
                    window.showToast("Validation", "Please select both a student and a book.", "warning");
                    return;
                }
                const student = allStudents.find(s => s.id === studentId);
                const book = allBooks.find(b => b.id === bookId);
                const activeCount = allIssued.filter(i => i.studentId === studentId).length;
                if (activeCount >= 3) {
                    window.showToast("Limit Exceeded", `${student.name} already has 3 books issued.`, "error");
                    return;
                }
                try {
                    await issueBook({
                        bookId: book.id, bookTitle: book.title, bookAuthor: book.author, bookIsbn: book.isbn,
                        studentId: student.id, studentName: student.name, studentEmail: student.email,
                        department: student.department
                    });
                    window.showToast("Book Issued ✓", `"${book.title}" issued to ${student.name}. Due in 14 days.`, "success");
                    document.getElementById("issue-book-form").reset();
                    document.getElementById("student-preview").classList.add("d-none");
                    document.getElementById("book-preview").classList.add("d-none");
                    await loadAll();
                    populateDropdowns();
                    renderIssueHistory();
                } catch (err) {
                    window.showToast("Issue Failed", err.message, "error");
                }
            });
        }

        function bindReturnForm() {
            document.getElementById("confirm-return-btn").addEventListener("click", async () => {
                const issueId = document.getElementById("return-issue-select").value;
                if (!issueId) return;
                try {
                    const rec = await returnBook(issueId);
                    const msg = rec.fine > 0 ? `Returned with fine ₹${rec.fine}.` : "Returned on time. No fine!";
                    window.showToast("Book Returned ✓", msg, "success");
                    document.getElementById("return-issue-select").value = "";
                    document.getElementById("return-preview").classList.add("d-none");
                    document.getElementById("return-empty").classList.remove("d-none");
                    document.getElementById("confirm-return-btn").disabled = true;
                    await loadAll();
                    populateDropdowns();
                    renderIssueHistory();
                    renderReturnHistory();
                } catch (err) {
                    window.showToast("Return Failed", err.message, "error");
                }
            });
        }

        function renderIssueHistory(filter = "") {
            const today = new Date();
            const records = allIssued.filter(i =>
                !filter || i.bookTitle.toLowerCase().includes(filter) || i.studentName.toLowerCase().includes(filter)
            );
            const tbody = document.getElementById("issue-history-body");
            if (records.length === 0) {
                tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-4">No active issue records found.</td></tr>`;
                return;
            }
            tbody.innerHTML = records.map(i => {
                const due = new Date(i.dueDate);
                const isOverdue = today > due;
                const fine = isOverdue ? Math.ceil((today - due) / 86400000) * 2 : 0;
                return `<tr class="${isOverdue ? 'overdue-row' : ''}">
                    <td><div class="fw-700 fs-13">${i.bookTitle}</div><div class="text-muted fs-11">${i.bookIsbn}</div></td>
                    <td><div class="fw-600">${i.studentName}</div><div class="text-muted fs-11">${i.studentEmail}</div></td>
                    <td><span class="badge bg-secondary rounded-pill">${i.department}</span></td>
                    <td class="fs-13">${i.issueDate}</td>
                    <td class="fs-13 ${isOverdue ? 'text-danger fw-700' : ''}">${i.dueDate}</td>
                    <td>${fine > 0 ? `<span class="fine-badge">₹${fine}</span>` : '<span class="badge bg-success-subtle text-success">None</span>'}</td>
                    <td>${isOverdue ? '<span class="badge bg-danger">Overdue</span>' : '<span class="badge bg-success">Active</span>'}</td>
                </tr>`;
            }).join("");
        }

        function renderReturnHistory(filter = "") {
            const records = allReturned.filter(r =>
                !filter || r.bookTitle.toLowerCase().includes(filter) || r.studentName.toLowerCase().includes(filter)
            );
            const tbody = document.getElementById("return-history-body");
            if (records.length === 0) {
                tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-4">No return records found.</td></tr>`;
                return;
            }
            tbody.innerHTML = records.map(r => `
                <tr>
                    <td><div class="fw-700 fs-13">${r.bookTitle}</div><div class="text-muted fs-11">${r.bookIsbn || ""}</div></td>
                    <td><div class="fw-600">${r.studentName}</div><div class="text-muted fs-11">${r.studentEmail}</div></td>
                    <td class="fs-13">${r.issueDate}</td>
                    <td class="fs-13">${r.dueDate}</td>
                    <td class="fs-13 fw-700 text-success">${r.returnDate}</td>
                    <td>${r.fine > 0 ? `<span class="fine-badge">₹${r.fine}</span>` : '<span class="badge bg-success-subtle text-success">₹0</span>'}</td>
                    <td><span class="badge bg-secondary">Returned</span></td>
                </tr>`).join("");
        }

        // Search listeners
        document.getElementById("issue-history-search").addEventListener("input", e => renderIssueHistory(e.target.value.toLowerCase()));
        document.getElementById("return-history-search").addEventListener("input", e => renderReturnHistory(e.target.value.toLowerCase()));
    </script>
</body>
</html>
