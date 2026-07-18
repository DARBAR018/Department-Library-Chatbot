/**
 * Department Library AI Chatbot
 * Library Administration Panel Controller
 */

import { enforceProtectedRoute } from "./auth.js";
import { APP_MODE } from "./config.js";
import { 
    getBooks, addBook, updateBook, deleteBook,
    getNotices, addNotice, updateNotice, deleteNotice,
    getFaculty, addFaculty, updateFaculty, deleteFaculty,
    getPapers, addPaper, deletePaper,
    getEbooks, addEbook, deleteEbook,
    getFaqs, addFaq, updateFaq, deleteFaq
} from "./db.js";

// Restrict route
enforceProtectedRoute("admin");

// Global caching
let books = [];
let notices = [];
let faculty = [];
let papers = [];
let ebooks = [];
let faqs = [];
let analyticsChart = null;

// Modals
let bookModal = null;
let noticeModal = null;
let paperModal = null;
let ebookModal = null;
let facultyModal = null;
let faqModal = null;

document.addEventListener("DOMContentLoaded", async () => {
    // Initialize Modals
    bookModal = new bootstrap.Modal(document.getElementById("bookFormModal"));
    noticeModal = new bootstrap.Modal(document.getElementById("noticeFormModal"));
    paperModal = new bootstrap.Modal(document.getElementById("paperFormModal"));
    ebookModal = new bootstrap.Modal(document.getElementById("ebookFormModal"));
    facultyModal = new bootstrap.Modal(document.getElementById("facultyFormModal"));
    faqModal = new bootstrap.Modal(document.getElementById("faqFormModal"));

    // 1. Setup Section Switching
    setupSectionSwitching();

    // 2. Load DB Data & Analytics
    await syncAllData();

    // 3. Attach Form Submit Listeners
    attachFormListeners();

    // 4. Attach Create Buttons Listeners
    attachCreateTriggers();
});

/* ==========================================
   NAVIGATION SWITCHING
   ========================================== */
function setupSectionSwitching() {
    const navLinks = document.querySelectorAll(".admin-nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            const target = link.dataset.target;
            document.querySelectorAll(".admin-section").forEach(sec => {
                sec.classList.remove("active");
            });
            document.getElementById(target).classList.add("active");
        });
    });
}

/* ==========================================
   SYNC & RENDER CORE
   ========================================== */
async function syncAllData() {
    try {
        books = await getBooks();
        notices = await getNotices();
        faculty = await getFaculty();
        papers = await getPapers();
        ebooks = await getEbooks();
        faqs = await getFaqs();

        // Render analytics stats
        document.getElementById("db-mode-indicator").textContent = `${APP_MODE.toUpperCase()} MODE`;
        
        let totalQty = 0;
        books.forEach(b => totalQty += b.quantity);
        document.getElementById("total-vols-label").textContent = totalQty;
        document.getElementById("total-notices-label").textContent = notices.length;
        document.getElementById("total-fac-label").textContent = faculty.length;

        // Render sections
        renderAnalyticsChart();
        renderBooksTable();
        renderNoticesTable();
        renderPapersTable();
        renderEbooksTable();
        renderFacultyTable();
        renderFaqsTable();
    } catch (e) {
        console.error("[Admin Controller] Sync failed:", e);
        window.showToast("Data Sync Error", "Failed to fetch database collections.", "error");
    }
}

/* ==========================================
   ANALYTICS CHART
   ========================================== */
function renderAnalyticsChart() {
    const ctx = document.getElementById("adminVolsChart").getContext("2d");
    
    const countMap = { CO: 0, IF: 0, EE: 0, ME: 0, CE: 0 };
    books.forEach(b => {
        if (countMap[b.department] !== undefined) {
            countMap[b.department] += b.quantity;
        }
    });

    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const gridColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
    const labelColor = isDark ? "#94a3b8" : "#64748b";

    if (analyticsChart) {
        analyticsChart.destroy();
    }

    analyticsChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Computer", "IT", "Electrical", "Mechanical", "Civil"],
            datasets: [{
                data: [countMap.CO, countMap.IF, countMap.EE, countMap.ME, countMap.CE],
                backgroundColor: [
                    "#0b5ed7",
                    "#06b6d4",
                    "#f59e0b",
                    "#10b981",
                    "#ef4444"
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "right",
                    labels: {
                        color: labelColor,
                        font: { family: "Outfit", size: 12 }
                    }
                }
            }
        }
    });
}

/* ==========================================
   TABLES RENDERING
   ========================================== */

function renderBooksTable() {
    const tbody = document.getElementById("admin-books-tbody");
    tbody.innerHTML = books.map(b => `
        <tr>
            <td>
                <div class="fw-700">${b.title}</div>
                <div class="text-muted fs-11">by ${b.author} | ISBN: ${b.isbn}</div>
            </td>
            <td>Sem ${b.semester} (${b.department})</td>
            <td>Stock: <strong class="${b.available > 0 ? 'text-success':'text-danger'}">${b.available}</strong> of ${b.quantity}</td>
            <td><span class="badge bg-light text-dark border px-2 py-1 fs-12">${b.location}</span></td>
            <td class="text-center">
                <button class="btn btn-sm btn-outline-primary edit-book-btn" data-id="${b.id}">Edit</button>
                <button class="btn btn-sm btn-outline-danger delete-book-btn" data-id="${b.id}">Delete</button>
            </td>
        </tr>
    `).join("");

    // Bind triggers
    tbody.querySelectorAll(".edit-book-btn").forEach(btn => {
        btn.addEventListener("click", () => populateBookEditor(btn.dataset.id));
    });
    tbody.querySelectorAll(".delete-book-btn").forEach(btn => {
        btn.addEventListener("click", () => handleDeleteBook(btn.dataset.id));
    });
}

function renderNoticesTable() {
    const tbody = document.getElementById("admin-notices-tbody");
    tbody.innerHTML = notices.map(n => `
        <tr>
            <td>
                <div class="fw-700 text-truncate" style="max-width:280px;">${n.title}</div>
                <div class="text-muted fs-11 text-truncate" style="max-width:280px;">${n.content}</div>
            </td>
            <td><span class="badge bg-primary fs-11">${n.category}</span></td>
            <td>${n.date}</td>
            <td>${n.important ? '<span class="text-danger fw-600 fs-12">Important</span>' : 'Standard'}</td>
            <td class="text-center">
                <button class="btn btn-sm btn-outline-primary edit-notice-btn" data-id="${n.id}">Edit</button>
                <button class="btn btn-sm btn-outline-danger delete-notice-btn" data-id="${n.id}">Delete</button>
            </td>
        </tr>
    `).join("");

    tbody.querySelectorAll(".edit-notice-btn").forEach(btn => {
        btn.addEventListener("click", () => populateNoticeEditor(btn.dataset.id));
    });
    tbody.querySelectorAll(".delete-notice-btn").forEach(btn => {
        btn.addEventListener("click", () => handleDeleteNotice(btn.dataset.id));
    });
}

function renderPapersTable() {
    const tbody = document.getElementById("admin-papers-tbody");
    tbody.innerHTML = papers.map(p => `
        <tr>
            <td><strong>${p.title}</strong></td>
            <td>Sem ${p.semester} (${p.department})</td>
            <td>${p.year}</td>
            <td class="text-center">
                <button class="btn btn-sm btn-outline-danger delete-paper-btn" data-id="${p.id}">Remove</button>
            </td>
        </tr>
    `).join("");

    tbody.querySelectorAll(".delete-paper-btn").forEach(btn => {
        btn.addEventListener("click", () => handleDeletePaper(btn.dataset.id));
    });
}

function renderEbooksTable() {
    const tbody = document.getElementById("admin-ebooks-tbody");
    tbody.innerHTML = ebooks.map(e => `
        <tr>
            <td>
                <div class="fw-700">${e.title}</div>
                <div class="text-muted fs-11">by ${e.author}</div>
            </td>
            <td><span class="badge bg-info text-dark fs-11">${e.category}</span></td>
            <td>${e.size}</td>
            <td class="text-center">
                <button class="btn btn-sm btn-outline-danger delete-ebook-btn" data-id="${e.id}">Remove</button>
            </td>
        </tr>
    `).join("");

    tbody.querySelectorAll(".delete-ebook-btn").forEach(btn => {
        btn.addEventListener("click", () => handleDeleteEbook(btn.dataset.id));
    });
}

function renderFacultyTable() {
    const tbody = document.getElementById("admin-faculty-tbody");
    tbody.innerHTML = faculty.map(f => `
        <tr>
            <td>
                <div class="d-flex align-items-center gap-2">
                    <img src="${f.photo}" alt="" class="rounded-circle" style="width:32px; height:32px; object-fit:cover;">
                    <div>
                        <div class="fw-700">${f.name}</div>
                        <div class="text-muted fs-11">${f.qualification}</div>
                    </div>
                </div>
            </td>
            <td>Sem ${f.department}</td>
            <td>${f.designation}</td>
            <td>${f.email}</td>
            <td class="text-center">
                <button class="btn btn-sm btn-outline-primary edit-fac-btn" data-id="${f.id}">Edit</button>
                <button class="btn btn-sm btn-outline-danger delete-fac-btn" data-id="${f.id}">Delete</button>
            </td>
        </tr>
    `).join("");

    tbody.querySelectorAll(".edit-fac-btn").forEach(btn => {
        btn.addEventListener("click", () => populateFacultyEditor(btn.dataset.id));
    });
    tbody.querySelectorAll(".delete-fac-btn").forEach(btn => {
        btn.addEventListener("click", () => handleDeleteFaculty(btn.dataset.id));
    });
}

function renderFaqsTable() {
    const tbody = document.getElementById("admin-faqs-tbody");
    tbody.innerHTML = faqs.map(faq => `
        <tr>
            <td>
                <div class="fw-700 fs-13">${faq.question}</div>
                <div class="text-muted fs-11 text-truncate" style="max-width:350px;">Ans: ${faq.answer}</div>
            </td>
            <td>${faq.keywords.map(k => `<span class="badge bg-light text-dark border fs-10 m-1">${k}</span>`).join("")}</td>
            <td class="text-center">
                <button class="btn btn-sm btn-outline-primary edit-faq-btn" data-id="${faq.id}">Edit</button>
                <button class="btn btn-sm btn-outline-danger delete-faq-btn" data-id="${faq.id}">Delete</button>
            </td>
        </tr>
    `).join("");

    tbody.querySelectorAll(".edit-faq-btn").forEach(btn => {
        btn.addEventListener("click", () => populateFaqEditor(btn.dataset.id));
    });
    tbody.querySelectorAll(".delete-faq-btn").forEach(btn => {
        btn.addEventListener("click", () => handleDeleteFaq(btn.dataset.id));
    });
}

/* ==========================================
   CRUD ACTION TRIGGERS
   ========================================== */

function attachCreateTriggers() {
    // Books
    document.getElementById("add-book-trigger-btn").addEventListener("click", () => {
        document.getElementById("book-admin-form").reset();
        document.getElementById("admin-book-id").value = "";
        document.getElementById("book-modal-title").textContent = "Add New Book";
        bookModal.show();
    });

    // Notices
    document.getElementById("add-notice-trigger-btn").addEventListener("click", () => {
        document.getElementById("notice-admin-form").reset();
        document.getElementById("admin-notice-id").value = "";
        document.getElementById("notice-modal-title").textContent = "Publish Notice";
        noticeModal.show();
    });

    // Papers
    document.getElementById("add-paper-trigger-btn").addEventListener("click", () => {
        document.getElementById("paper-admin-form").reset();
        paperModal.show();
    });

    // E-Books
    document.getElementById("add-ebook-trigger-btn").addEventListener("click", () => {
        document.getElementById("ebook-admin-form").reset();
        ebookModal.show();
    });

    // Faculty
    document.getElementById("add-faculty-trigger-btn").addEventListener("click", () => {
        document.getElementById("faculty-admin-form").reset();
        document.getElementById("admin-fac-id").value = "";
        document.getElementById("faculty-modal-title").textContent = "Register Faculty";
        facultyModal.show();
    });

    // FAQs
    document.getElementById("add-faq-trigger-btn").addEventListener("click", () => {
        document.getElementById("faq-admin-form").reset();
        document.getElementById("admin-faq-id").value = "";
        document.getElementById("faq-modal-title").textContent = "Teach Chatbot FAQ";
        faqModal.show();
    });
}

// --- Editors Populating ---
function populateBookEditor(id) {
    const b = books.find(item => item.id === id);
    if (!b) return;
    
    document.getElementById("admin-book-id").value = b.id;
    document.getElementById("admin-book-title").value = b.title;
    document.getElementById("admin-book-author").value = b.author;
    document.getElementById("admin-book-dept").value = b.department;
    document.getElementById("admin-book-sem").value = b.semester;
    document.getElementById("admin-book-subj").value = b.subject;
    document.getElementById("admin-book-isbn").value = b.isbn;
    document.getElementById("admin-book-qty").value = b.quantity;
    document.getElementById("admin-book-loc").value = b.location;

    document.getElementById("book-modal-title").textContent = "Edit Book Details";
    bookModal.show();
}

function populateNoticeEditor(id) {
    const n = notices.find(item => item.id === id);
    if (!n) return;

    document.getElementById("admin-notice-id").value = n.id;
    document.getElementById("admin-notice-title").value = n.title;
    document.getElementById("admin-notice-cat").value = n.category;
    document.getElementById("admin-notice-content").value = n.content;
    document.getElementById("admin-notice-imp").checked = n.important;

    document.getElementById("notice-modal-title").textContent = "Edit Notice Details";
    noticeModal.show();
}

function populateFacultyEditor(id) {
    const f = faculty.find(item => item.id === id);
    if (!f) return;

    document.getElementById("admin-fac-id").value = f.id;
    document.getElementById("admin-fac-name").value = f.name;
    document.getElementById("admin-fac-dept").value = f.department;
    document.getElementById("admin-fac-desig").value = f.designation;
    document.getElementById("admin-fac-qual").value = f.qualification;
    document.getElementById("admin-fac-email").value = f.email;
    document.getElementById("admin-fac-phone").value = f.contact;

    document.getElementById("faculty-modal-title").textContent = "Edit Staff Info";
    facultyModal.show();
}

function populateFaqEditor(id) {
    const faq = faqs.find(item => item.id === id);
    if (!faq) return;

    document.getElementById("admin-faq-id").value = faq.id;
    document.getElementById("admin-faq-q").value = faq.question;
    document.getElementById("admin-faq-keys").value = faq.keywords.join(", ");
    document.getElementById("admin-faq-ans").value = faq.answer;

    document.getElementById("faq-modal-title").textContent = "Edit Chatbot FAQ Rule";
    faqModal.show();
}

// --- Deletions ---
async function handleDeleteBook(id) {
    if (confirm("Are you sure you want to delete this book?")) {
        await deleteBook(id);
        window.showToast("Deleted Book", "Book removed from catalog.", "info");
        syncAllData();
    }
}
async function handleDeleteNotice(id) {
    if (confirm("Are you sure you want to delete this notice?")) {
        await deleteNotice(id);
        window.showToast("Notice Deleted", "Notice removed from board.", "info");
        syncAllData();
    }
}
async function handleDeletePaper(id) {
    if (confirm("Are you sure you want to remove this GTU paper?")) {
        await deletePaper(id);
        window.showToast("Paper Removed", "Previous paper deleted.", "info");
        syncAllData();
    }
}
async function handleDeleteEbook(id) {
    if (confirm("Are you sure you want to remove this E-book?")) {
        await deleteEbook(id);
        window.showToast("E-Book Removed", "Digital book catalog entry deleted.", "info");
        syncAllData();
    }
}
async function handleDeleteFaculty(id) {
    if (confirm("Are you sure you want to remove this faculty record?")) {
        await deleteFaculty(id);
        window.showToast("Staff Removed", "Faculty record deleted.", "info");
        syncAllData();
    }
}
async function handleDeleteFaq(id) {
    if (confirm("Are you sure you want to delete this FAQ training rule?")) {
        await deleteFaq(id);
        window.showToast("FAQ Rule Deleted", "AI Chatbot training rule removed.", "info");
        syncAllData();
    }
}

/* ==========================================
   FORM SUBMIT WRAPPERS
   ========================================== */

function attachFormListeners() {
    // Book Form
    const bookForm = document.getElementById("book-admin-form");
    bookForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!bookForm.checkValidity()) {
            bookForm.classList.add("was-validated");
            return;
        }

        const id = document.getElementById("admin-book-id").value;
        const title = document.getElementById("admin-book-title").value;
        const author = document.getElementById("admin-book-author").value;
        const department = document.getElementById("admin-book-dept").value;
        const semester = parseInt(document.getElementById("admin-book-sem").value);
        const subject = document.getElementById("admin-book-subj").value;
        const isbn = document.getElementById("admin-book-isbn").value;
        const quantity = parseInt(document.getElementById("admin-book-qty").value);
        const location = document.getElementById("admin-book-loc").value;

        const data = { title, author, department, semester, subject, isbn, quantity, available: quantity, location };

        try {
            if (id) {
                await updateBook(id, data);
                window.showToast("Book Updated", "Details updated successfully.", "success");
            } else {
                await addBook(data);
                window.showToast("Book Cataloged", "New book added to library inventory.", "success");
            }
            bookModal.hide();
            syncAllData();
        } catch (err) {
            window.showToast("Operation Failed", err.message, "error");
        }
    });

    // Notice Form
    const noticeForm = document.getElementById("notice-admin-form");
    noticeForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!noticeForm.checkValidity()) {
            noticeForm.classList.add("was-validated");
            return;
        }

        const id = document.getElementById("admin-notice-id").value;
        const title = document.getElementById("admin-notice-title").value;
        const category = document.getElementById("admin-notice-cat").value;
        const content = document.getElementById("admin-notice-content").value;
        const important = document.getElementById("admin-notice-imp").checked;

        const data = { title, category, content, important };

        try {
            if (id) {
                await updateNotice(id, data);
                window.showToast("Notice Updated", "Alert board updated.", "success");
            } else {
                await addNotice(data);
                window.showToast("Notice Published", "New alert published on notice board.", "success");
            }
            noticeModal.hide();
            syncAllData();
        } catch (err) {
            window.showToast("Operation Failed", err.message, "error");
        }
    });

    // Paper Form
    const paperForm = document.getElementById("paper-admin-form");
    paperForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!paperForm.checkValidity()) {
            paperForm.classList.add("was-validated");
            return;
        }

        const title = document.getElementById("admin-paper-title").value;
        const department = document.getElementById("admin-paper-dept").value;
        const semester = parseInt(document.getElementById("admin-paper-sem").value);
        const subject = document.getElementById("admin-paper-subj").value;
        const year = parseInt(document.getElementById("admin-paper-year").value);
        const fileName = "gtu_" + subject.toLowerCase() + "_" + year + ".pdf";

        const data = { title, department, semester, subject, year, fileName };

        try {
            await addPaper(data);
            window.showToast("Paper Uploaded", "Exam paper added to archives.", "success");
            paperModal.hide();
            syncAllData();
        } catch (err) {
            window.showToast("Upload Failed", err.message, "error");
        }
    });

    // E-Book Form
    const ebookForm = document.getElementById("ebook-admin-form");
    ebookForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!ebookForm.checkValidity()) {
            ebookForm.classList.add("was-validated");
            return;
        }

        const title = document.getElementById("admin-ebook-title").value;
        const author = document.getElementById("admin-ebook-author").value;
        const category = document.getElementById("admin-ebook-cat").value;
        const size = document.getElementById("admin-ebook-size").value;
        const fileName = title.toLowerCase().replace(/\s+/g, "_") + ".pdf";

        const data = { title, author, category, size, fileName };

        try {
            await addEbook(data);
            window.showToast("E-Book Cataloged", "Digital book added to digital library catalog.", "success");
            ebookModal.hide();
            syncAllData();
        } catch (err) {
            window.showToast("Catalog Failed", err.message, "error");
        }
    });

    // Faculty Form
    const facultyForm = document.getElementById("faculty-admin-form");
    facultyForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!facultyForm.checkValidity()) {
            facultyForm.classList.add("was-validated");
            return;
        }

        const id = document.getElementById("admin-fac-id").value;
        const name = document.getElementById("admin-fac-name").value;
        const department = document.getElementById("admin-fac-dept").value;
        const designation = document.getElementById("admin-fac-desig").value;
        const qualification = document.getElementById("admin-fac-qual").value;
        const email = document.getElementById("admin-fac-email").value;
        const contact = document.getElementById("admin-fac-phone").value;
        const photo = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200"; // default placeholder

        const data = { name, department, designation, qualification, email, contact, photo };

        try {
            if (id) {
                await updateFaculty(id, data);
                window.showToast("Faculty Updated", "Staff registry updated.", "success");
            } else {
                await addFaculty(data);
                window.showToast("Faculty Added", "Registered new staff member.", "success");
            }
            facultyModal.hide();
            syncAllData();
        } catch (err) {
            window.showToast("Operation Failed", err.message, "error");
        }
    });

    // FAQ Form
    const faqForm = document.getElementById("faq-admin-form");
    faqForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!faqForm.checkValidity()) {
            faqForm.classList.add("was-validated");
            return;
        }

        const id = document.getElementById("admin-faq-id").value;
        const question = document.getElementById("admin-faq-q").value;
        const keysText = document.getElementById("admin-faq-keys").value;
        const answer = document.getElementById("admin-faq-ans").value;

        const keywords = keysText.split(",").map(k => k.trim().toLowerCase()).filter(k => k.length > 0);

        const data = { question, keywords, answer };

        try {
            if (id) {
                await updateFaq(id, data);
                window.showToast("FAQ Rule Updated", "AI bot knowledgebase updated.", "success");
            } else {
                await addFaq(data);
                window.showToast("FAQ Rule Taught", "New matching patterns loaded in chatbot.", "success");
            }
            faqModal.hide();
            syncAllData();
        } catch (err) {
            window.showToast("Operation Failed", err.message, "error");
        }
    });
}
