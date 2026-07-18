<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Browse and search all books in the Department Library catalog.">
    <title>Book Catalog | Library Portal</title>
    <!-- Bootstrap 5 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Google Material Icons -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Font Awesome Icons -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <!-- AOS Animate On Scroll -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <!-- Custom Style -->
    <link href="css/style.css" rel="stylesheet">
</head>
<body class="d-flex flex-column min-vh-100">

    <!-- Loading Screen -->
    <div id="loading-screen">
        <div class="spinner-custom"></div>
        <div class="logo-loading">DEPT LIBRARY</div>
        <p class="text-muted mt-2 fs-14">Opening book catalog...</p>
    </div>

    <!-- Global Header -->
    <header></header>

    <!-- Main Body -->
    <main class="container my-5 pt-5 flex-grow-1">
        <!-- Breadcrumbs Placeholder -->
        <div id="breadcrumbs-container"></div>

        <div class="row g-4 mt-3">
            <!-- Filter Sidebar -->
            <div class="col-lg-3" data-aos="fade-right">
                <div class="glass-card p-4 sticky-top" style="top: 100px;">
                    <h5 class="fw-800 mb-3 d-flex align-items-center gap-2 text-primary">
                        <span class="material-icons">filter_alt</span> Filter Catalog
                    </h5>
                    
                    <!-- Search Input Inside Sidebar -->
                    <div class="mb-3">
                        <label class="form-label fw-600 fs-13">Search Query</label>
                        <input type="text" id="search-bar" class="form-control form-control-custom" placeholder="Title, author, ISBN...">
                    </div>

                    <!-- Department Filter -->
                    <div class="mb-3">
                        <label class="form-label fw-600 fs-13">Engineering Department</label>
                        <select id="filter-dept" class="form-select form-control-custom">
                            <option value="">All Departments</option>
                            <option value="CO">Computer Eng.</option>
                            <option value="IF">Information Tech.</option>
                            <option value="EE">Electrical Eng.</option>
                            <option value="ME">Mechanical Eng.</option>
                            <option value="CE">Civil Eng.</option>
                        </select>
                    </div>

                    <!-- Semester Filter -->
                    <div class="mb-3">
                        <label class="form-label fw-600 fs-13">Course Semester</label>
                        <select id="filter-sem" class="form-select form-control-custom">
                            <option value="">All Semesters</option>
                            <option value="1">Semester 1</option>
                            <option value="2">Semester 2</option>
                            <option value="3">Semester 3</option>
                            <option value="4">Semester 4</option>
                            <option value="5">Semester 5</option>
                            <option value="6">Semester 6</option>
                        </select>
                    </div>

                    <!-- Available Switch -->
                    <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" id="filter-avail">
                        <label class="form-check-label fw-600 fs-13 text-color" for="filter-avail">Show Only Available</label>
                    </div>

                    <!-- Reset Button -->
                    <button class="btn btn-outline-custom w-100 py-2 fs-13 mt-2" id="reset-filters-btn">
                        Clear All Filters
                    </button>
                </div>
            </div>

            <!-- Catalog Listing -->
            <div class="col-lg-9" data-aos="fade-left">
                <!-- Search Result Header -->
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="fs-14 text-muted fw-600"><span id="results-count">0</span> books found in database</span>
                </div>

                <!-- Grid of books -->
                <div class="row g-4" id="books-grid-container">
                    <!-- Dynamic book cards -->
                </div>
            </div>
        </div>
    </main>

    <!-- BOOK DETAILS MODAL -->
    <div class="modal fade pdf-modal" id="bookDetailsModal" tabindex="-1" aria-labelledby="bookDetailsModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title fw-800" id="bookDetailsModalLabel">Book Details</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style="filter: var(--text-color) invert(1);"></button>
                </div>
                <div class="modal-body" id="book-modal-details-body">
                    <!-- Loaded dynamically -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-custom" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary-custom" id="modal-reserve-btn">Reserve Hold</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Global Footer -->
    <footer></footer>

    <!-- Bootstrap 5 Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- AOS Library -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <!-- Script Module -->
    <script type="module" src="js/app.js"></script>
    <script type="module">
        import { getBooks, updateBook } from "./js/db.js";
        import { getCurrentUser } from "./js/auth.js";

        let allBooks = [];
        let selectedBookId = null;

        document.addEventListener("DOMContentLoaded", async () => {
            // Load Books list
            await loadBooksData();
            
            // Sync query from home page
            const urlParams = new URLSearchParams(window.location.search);
            const queryParam = urlParams.get("query");
            if (queryParam) {
                document.getElementById("search-bar").value = queryParam;
            }
            
            // Render list
            filterAndRenderBooks();

            // Bind Listeners
            document.getElementById("search-bar").addEventListener("input", filterAndRenderBooks);
            document.getElementById("filter-dept").addEventListener("change", filterAndRenderBooks);
            document.getElementById("filter-sem").addEventListener("change", filterAndRenderBooks);
            document.getElementById("filter-avail").addEventListener("change", filterAndRenderBooks);
            
            document.getElementById("reset-filters-btn").addEventListener("click", () => {
                document.getElementById("search-bar").value = "";
                document.getElementById("filter-dept").value = "";
                document.getElementById("filter-sem").value = "";
                document.getElementById("filter-avail").checked = false;
                filterAndRenderBooks();
            });

            // Bind Reserve button in Modal
            document.getElementById("modal-reserve-btn").addEventListener("click", () => {
                if (selectedBookId) {
                    executeBookReservation(selectedBookId);
                }
            });
        });

        async function loadBooksData() {
            try {
                allBooks = await getBooks();
            } catch (e) {
                console.error("Failed to load catalog books:", e);
            }
        }

        function filterAndRenderBooks() {
            const query = document.getElementById("search-bar").value.toLowerCase();
            const dept = document.getElementById("filter-dept").value;
            const sem = document.getElementById("filter-sem").value;
            const onlyAvail = document.getElementById("filter-avail").checked;

            const filtered = allBooks.filter(book => {
                const matchQuery = book.title.toLowerCase().includes(query) || 
                                   book.author.toLowerCase().includes(query) || 
                                   book.subject.toLowerCase().includes(query) || 
                                   book.isbn.includes(query);
                
                const matchDept = dept === "" || book.department === dept;
                const matchSem = sem === "" || book.semester.toString() === sem;
                const matchAvail = !onlyAvail || book.available > 0;

                return matchQuery && matchDept && matchSem && matchAvail;
            });

            document.getElementById("results-count").textContent = filtered.length;
            renderBooksList(filtered);
        }

        function renderBooksList(books) {
            const container = document.getElementById("books-grid-container");
            if (books.length === 0) {
                container.innerHTML = `
                    <div class="col-12 text-center py-5">
                        <span class="material-icons text-muted" style="font-size: 64px;">menu_book</span>
                        <h4 class="mt-3 text-muted">No books found matching criteria.</h4>
                    </div>
                `;
                return;
            }

            container.innerHTML = books.map(book => {
                const isAvail = book.available > 0;
                const availBadge = isAvail 
                    ? `<span class="badge bg-success-light text-success px-2 py-1 fs-11 rounded">Available: ${book.available}/${book.quantity}</span>`
                    : `<span class="badge bg-danger-light text-danger px-2 py-1 fs-11 rounded">Out of Stock</span>`;
                
                const deptBadges = {
                    CO: "bg-primary",
                    IF: "bg-cyan",
                    EE: "bg-warning",
                    ME: "bg-success",
                    CE: "bg-danger"
                };
                const deptBadgeClass = deptBadges[book.department] || "bg-secondary";

                return `
                    <div class="col-md-6 col-xxl-4">
                        <div class="glass-card p-4 h-100 d-flex flex-column">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <span class="badge ${deptBadgeClass} text-white px-2 py-1 fs-11 rounded">Dept: ${book.department}</span>
                                <span class="badge bg-secondary text-white px-2 py-1 fs-11 rounded">Sem ${book.semester}</span>
                            </div>
                            <h5 class="fw-700 text-truncate-2" style="height: 48px; line-height:1.2; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${book.title}</h5>
                            <p class="text-muted fs-13 mb-3">by ${book.author}</p>
                            
                            <div class="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
                                ${availBadge}
                                <button class="btn btn-sm btn-primary-custom view-details-btn" data-id="${book.id}">View Details</button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            // Attach event listeners
            document.querySelectorAll(".view-details-btn").forEach(btn => {
                btn.addEventListener("click", () => openBookModal(btn.dataset.id));
            });
        }

        function openBookModal(id) {
            const book = allBooks.find(b => b.id === id);
            if (!book) return;

            selectedBookId = id;
            
            const isAvail = book.available > 0;
            const modalBody = document.getElementById("book-modal-details-body");
            const reserveBtn = document.getElementById("modal-reserve-btn");

            // Disable reserve button if unavailable
            if (!isAvail) {
                reserveBtn.disabled = true;
                reserveBtn.textContent = "Unavailable";
            } else {
                reserveBtn.disabled = false;
                reserveBtn.textContent = "Reserve Hold";
            }

            modalBody.innerHTML = `
                <div class="row g-3">
                    <div class="col-sm-4 text-center">
                        <span class="material-icons text-primary" style="font-size: 80px;">book</span>
                    </div>
                    <div class="col-sm-8">
                        <h5 class="fw-800 text-primary">${book.title}</h5>
                        <p class="text-muted mb-2">by <strong>${book.author}</strong></p>
                        
                        <table class="table table-sm borderless fs-13 text-muted">
                            <tr><td><strong>Subject:</strong></td><td>${book.subject}</td></tr>
                            <tr><td><strong>Department:</strong></td><td>${book.department}</td></tr>
                            <tr><td><strong>Semester:</strong></td><td>Semester ${book.semester}</td></tr>
                            <tr><td><strong>Shelf Code:</strong></td><td>${book.location}</td></tr>
                            <tr><td><strong>ISBN Code:</strong></td><td>${book.isbn}</td></tr>
                            <tr><td><strong>Stock:</strong></td><td>${book.available} remaining of ${book.quantity}</td></tr>
                        </table>
                    </div>
                </div>
            `;

            // Open bootstrap modal
            const myModal = new bootstrap.Modal(document.getElementById('bookDetailsModal'));
            myModal.show();
        }

        async function executeBookReservation(id) {
            const user = getCurrentUser();
            if (!user) {
                window.showToast("Login Required", "You must log in to reserve books.", "warning");
                // Dismiss modal and redirect to login
                bootstrap.Modal.getInstance(document.getElementById('bookDetailsModal')).hide();
                setTimeout(() => {
                    window.location.href = "login.html?redirect=books.html";
                }, 1200);
                return;
            }

            // Check borrowing limit
            const borrowingKey = `borrowings_${user.email}`;
            let borrowings = JSON.parse(localStorage.getItem(borrowingKey)) || [];
            
            const activeCount = borrowings.filter(b => b.status === 'issued' || b.status === 'hold').length;
            if (activeCount >= 3) {
                window.showToast("Limit Exceeded", "You cannot borrow more than 3 books simultaneously.", "error");
                bootstrap.Modal.getInstance(document.getElementById('bookDetailsModal')).hide();
                return;
            }

            const book = allBooks.find(b => b.id === id);
            if (book && book.available > 0) {
                try {
                    // Update available count in DB
                    const nextAvailable = book.available - 1;
                    await updateBook(id, { available: nextAvailable });
                    
                    // Add hold to student's record
                    const newHold = {
                        id: "BR" + Date.now(),
                        title: book.title,
                        author: book.author,
                        location: book.location,
                        issueDate: "---",
                        dueDate: "---",
                        status: "hold",
                        fine: 0
                    };
                    borrowings.push(newHold);
                    localStorage.setItem(borrowingKey, JSON.stringify(borrowings));

                    window.showToast("Reserved Successfully", "Book hold placed! Pick it up at the desk.", "success");
                    bootstrap.Modal.getInstance(document.getElementById('bookDetailsModal')).hide();
                    
                    // Reload data
                    await loadBooksData();
                    filterAndRenderBooks();
                } catch (e) {
                    window.showToast("Reservation Failed", e.message, "error");
                }
            }
        }
    </script>
</body>
</html>
