/**
 * Department Library AI Chatbot
 * Global Application Controller & Shared UI Injector
 */

import { getCurrentUser, logout } from "./auth.js";
import { APP_MODE } from "./config.js";

// Page initialization
document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject global shared layouts (Navbar, Footer, Chatbot trigger)
    injectCommonLayouts();
    
    // 2. Setup theme manager (light/dark)
    initThemeManager();
    
    // 3. Setup back to top button
    initBackToTop();
    
    // 4. Initialize Animate on Scroll (AOS)
    if (window.AOS) {
        window.AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
    
    // 5. Build dynamic breadcrumbs
    buildBreadcrumbs();
    
    // 6. Dismiss loading screen
    dismissLoadingScreen();
    
    // 7. Attach Auth action listeners
    attachAuthActionListeners();
});

/**
 * Programmatically injects Navbar, Footer, Toast container, and Chatbot frame
 * to reduce duplication across multiple HTML pages.
 */
function injectCommonLayouts() {
    const user = getCurrentUser();
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    
    // Determine which links are active
    const isActive = (path) => currentPath === path ? "active" : "";
    
    // --- NAVBAR INJECTION ---
    const headerEl = document.querySelector("header");
    if (headerEl) {
        let authButtons = `<a href="login.html" class="btn btn-primary-custom d-flex align-items-center gap-2">
            <span class="material-icons">login</span> Login
        </a>`;
        
        if (user) {
            authButtons = `
                <div class="dropdown">
                    <button class="btn btn-outline-custom dropdown-toggle d-flex align-items-center gap-2" type="button" id="userMenu" data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="material-icons">account_circle</span> ${user.name.split(' ')[0]}
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end glass-card p-2" aria-labelledby="userMenu" style="border-radius:12px;">
                        <li><a class="dropdown-item py-2 px-3 d-flex align-items-center gap-2 text-color" href="dashboard.html"><span class="material-icons text-primary">dashboard</span> Dashboard</a></li>
                        ${user.role === 'admin' ? `
                        <li><a class="dropdown-item py-2 px-3 d-flex align-items-center gap-2 text-color" href="admin.html"><span class="material-icons text-warning">admin_panel_settings</span> Admin Panel</a></li>
                        <li><a class="dropdown-item py-2 px-3 d-flex align-items-center gap-2 text-color" href="students.html"><span class="material-icons text-info">school</span> Students</a></li>
                        <li><a class="dropdown-item py-2 px-3 d-flex align-items-center gap-2 text-color" href="issue.html"><span class="material-icons text-success">swap_horiz</span> Issue / Return</a></li>
                        <li><a class="dropdown-item py-2 px-3 d-flex align-items-center gap-2 text-color" href="reports.html"><span class="material-icons text-danger">assessment</span> Reports</a></li>
                        ` : ''}
                        <li><hr class="dropdown-divider"></li>
                        <li><button class="dropdown-item py-2 px-3 d-flex align-items-center gap-2 text-danger" id="nav-logout-btn"><span class="material-icons">logout</span> Logout</button></li>
                    </ul>
                </div>
            `;
        }

        headerEl.innerHTML = `
            <nav class="navbar navbar-expand-lg glass-navbar fixed-top py-3">
                <div class="container">
                    <a class="navbar-brand d-flex align-items-center gap-2 fw-800 fs-4 text-primary" href="index.html">
                        <span class="material-icons" style="font-size:32px;">local_library</span>
                        <div class="d-flex flex-column lh-1">
                            <span class="fw-800" style="letter-spacing: 0.5px;">LIBRARY PORTAL</span>
                            <span class="fs-10 text-muted fw-500" style="font-size:10px;">Engineering Department</span>
                        </div>
                    </a>
                    
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    
                    <div class="collapse navbar-collapse" id="mainNavbar">
                        <ul class="navbar-nav mx-auto mb-2 mb-lg-0 gap-1">
                            <li class="nav-item"><a class="nav-link ${isActive('index.html')}" href="index.html">Home</a></li>
                            <li class="nav-item"><a class="nav-link ${isActive('books.php')}" href="books.php">Books</a></li>
                            <li class="nav-item"><a class="nav-link ${isActive('notice.html')}" href="notice.html">Notices</a></li>
                            <li class="nav-item"><a class="nav-link ${isActive('faculty.html')}" href="faculty.html">Faculty</a></li>
                            <li class="nav-item"><a class="nav-link ${isActive('papers.html')}" href="papers.html">Papers</a></li>
                            <li class="nav-item"><a class="nav-link ${isActive('ebooks.html')}" href="ebooks.html">E-Books</a></li>
                            <li class="nav-item"><a class="nav-link ${isActive('about.html')}" href="about.html">About</a></li>
                            <li class="nav-item"><a class="nav-link ${isActive('contact.html')}" href="contact.html">Contact</a></li>
                        </ul>
                        
                        <div class="d-flex align-items-center gap-3">
                            <button class="theme-toggle-btn d-flex align-items-center" id="theme-toggle-btn" aria-label="Theme toggle">
                                <span class="material-icons" id="theme-icon">dark_mode</span>
                            </button>
                            ${authButtons}
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }

    // --- FOOTER INJECTION ---
    const footerEl = document.querySelector("footer");
    if (footerEl) {
        footerEl.classList.add("py-5", "mt-auto");
        footerEl.innerHTML = `
            <div class="container">
                <div class="row g-4 justify-content-between">
                    <div class="col-lg-4">
                        <div class="d-flex align-items-center gap-2 mb-3">
                            <span class="material-icons text-primary fs-3">local_library</span>
                            <span class="fw-800 fs-5 text-primary">DEPARTMENT LIBRARY</span>
                        </div>
                        <p class="text-muted mb-4 fs-14">A premium educational library portal offering online book cataloging, exam archives, digital learning modules, and an AI-driven virtual librarian assistant.</p>
                        <div class="d-flex gap-3">
                            <a href="#" class="text-muted"><i class="fab fa-facebook-f fs-5"></i></a>
                            <a href="#" class="text-muted"><i class="fab fa-twitter fs-5"></i></a>
                            <a href="#" class="text-muted"><i class="fab fa-linkedin-in fs-5"></i></a>
                            <a href="#" class="text-muted"><i class="fab fa-instagram fs-5"></i></a>
                        </div>
                    </div>
                    <div class="col-6 col-sm-3 col-lg-2">
                        <h6 class="fw-700 mb-3">Quick Links</h6>
                        <ul class="list-unstyled d-flex flex-column gap-2 fs-14">
                            <li><a href="books.html" class="text-muted hover-link">Browse Books</a></li>
                            <li><a href="notice.html" class="text-muted hover-link">Notice Board</a></li>
                            <li><a href="papers.html" class="text-muted hover-link">GTU Papers</a></li>
                            <li><a href="ebooks.html" class="text-muted hover-link">E-Books</a></li>
                        </ul>
                    </div>
                    <div class="col-6 col-sm-3 col-lg-2">
                        <h6 class="fw-700 mb-3">Library Info</h6>
                        <ul class="list-unstyled d-flex flex-column gap-2 fs-14">
                            <li><a href="about.html" class="text-muted hover-link">Working Hours</a></li>
                            <li><a href="about.html" class="text-muted hover-link">Rules & Dues</a></li>
                            <li><a href="contact.html" class="text-muted hover-link">Contact Us</a></li>
                            <li><a href="about.html" class="text-muted hover-link">Vision & Mission</a></li>
                        </ul>
                    </div>
                    <div class="col-lg-3">
                        <h6 class="fw-700 mb-3">Operational Timings</h6>
                        <ul class="list-unstyled d-flex flex-column gap-2 fs-14 text-muted">
                            <li class="d-flex justify-content-between"><span>Mon - Fri:</span> <span>9:00 AM - 5:00 PM</span></li>
                            <li class="d-flex justify-content-between"><span>Saturday:</span> <span>9:00 AM - 1:00 PM</span></li>
                            <li class="d-flex justify-content-between"><span>Sunday:</span> <span>Closed</span></li>
                            <li class="mt-2 pt-2 border-top d-flex gap-2 align-items-center">
                                <span class="material-icons text-primary fs-18">verified</span>
                                <span class="fw-600 fs-12">Database: ${APP_MODE.toUpperCase()} Mode</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr class="my-4 text-muted opacity-10">
                <div class="row align-items-center justify-content-between fs-12 text-muted">
                    <div class="col-md-6 text-center text-md-start mb-2 mb-md-0">
                        © 2026 Diploma Engineering College. All rights reserved.
                    </div>
                    <div class="col-md-6 text-center text-md-end">
                        Designed & Maintained by Department AI Cell.
                    </div>
                </div>
            </div>
        `;
    }

    // --- TOAST CONTAINER INJECTION ---
    if (!document.getElementById("toast-container")) {
        const tContainer = document.createElement("div");
        tContainer.id = "toast-container";
        document.body.appendChild(tContainer);
    }

    // --- CHATBOT WIDGET INJECTION ---
    // Inject only if not in login or error pages where we might want to disable it
    if (!currentPath.includes("login.php") && !currentPath.includes("404.html") && !document.querySelector(".chatbot-trigger")) {
        injectChatbotWidget();
    }
}

/**
 * Creates the floating chatbot and injects HTML frames
 */
function injectChatbotWidget() {
    const chatContainer = document.createElement("div");
    chatContainer.innerHTML = `
        <!-- Floating Trigger Button -->
        <div class="chatbot-trigger" id="chatbot-trigger-btn" aria-label="Open virtual assistant">
            <span class="material-icons">smart_toy</span>
            <div class="notification-dot d-none" id="chat-alert-dot"></div>
        </div>
        
        <!-- Chatbot Floating Window -->
        <div class="chatbot-window" id="chatbot-window-box">
            <!-- Header -->
            <div class="chat-header">
                <div class="chat-header-info">
                    <div class="chat-header-avatar">
                        <span class="material-icons">smart_toy</span>
                    </div>
                    <div class="chat-header-title">
                        <h5>Liby Assistant</h5>
                        <span>Online | AI Librarian</span>
                    </div>
                </div>
                <div class="chat-header-actions">
                    <button id="chat-voice-toggle" title="Toggle Voice Output"><span class="material-icons">volume_up</span></button>
                    <button id="chat-minimize-btn" title="Minimize"><span class="material-icons">remove</span></button>
                </div>
            </div>
            
            <!-- Chat Logs -->
            <div class="chat-body" id="chat-logs-container">
                <!-- Messages will be generated dynamically -->
            </div>
            
            <!-- Suggestions -->
            <div class="chat-suggestions" id="chat-suggestion-container">
                <!-- Suggested chips -->
            </div>
            
            <!-- Input Bar -->
            <div class="chat-footer">
                <form id="chat-input-form">
                    <div class="chat-input-wrapper">
                        <input type="text" id="chat-user-input" placeholder="Ask library hours, rules, books..." autocomplete="off">
                        <button type="button" class="chat-action-btn" id="chat-mic-btn" title="Voice Input">
                            <span class="material-icons">mic</span>
                        </button>
                        <button type="submit" class="chat-action-btn send-btn" id="chat-send-btn" title="Send Message">
                            <span class="material-icons">send</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
        <!-- Back To Top Trigger -->
        <div class="back-to-top" id="back-to-top-btn" title="Back to Top">
            <span class="material-icons">arrow_upward</span>
        </div>
    `;
    document.body.appendChild(chatContainer);
}

/**
 * Handle user logout click in navbar dropdown
 */
function attachAuthActionListeners() {
    const logoutBtn = document.getElementById("nav-logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
            await logout();
            showToast("Logged Out", "You have successfully signed out.", "info");
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        });
    }
}

/**
 * Light/Dark Mode Manager
 */
function initThemeManager() {
    const themeBtn = document.getElementById("theme-toggle-btn");
    const themeIcon = document.getElementById("theme-icon");
    
    if (!themeBtn) return;
    
    // Load persisted theme
    const activeTheme = localStorage.getItem("lib_theme") || "light";
    document.documentElement.setAttribute("data-theme", activeTheme);
    themeIcon.textContent = activeTheme === "dark" ? "light_mode" : "dark_mode";
    
    themeBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        
        document.documentElement.setAttribute("data-theme", nextTheme);
        localStorage.setItem("lib_theme", nextTheme);
        themeIcon.textContent = nextTheme === "dark" ? "light_mode" : "dark_mode";
        
        // Notify user
        showToast("Theme Changed", `Switched to ${nextTheme} mode.`, "info");
    });
}

/**
 * Back to Top scroll listener
 */
function initBackToTop() {
    const backBtn = document.getElementById("back-to-top-btn");
    if (!backBtn) return;
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backBtn.classList.add("active");
        } else {
            backBtn.classList.remove("active");
        }
    });
    
    backBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/**
 * Breadcrumb Navigator
 */
function buildBreadcrumbs() {
    const breadcrumbContainer = document.getElementById("breadcrumbs-container");
    if (!breadcrumbContainer) return;
    
    const path = window.location.pathname.split("/").pop() || "index.html";
    if (path === "index.html") {
        breadcrumbContainer.style.display = "none";
        return;
    }
    
    const pageTitles = {
        "login.php": "Account Access",
        "dashboard.html": "Student Dashboard",
        "books.php": "Book Catalog",
        "notice.html": "Notice Board",
        "faculty.html": "Faculty Directory",
        "papers.html": "Previous Exam Papers",
        "ebooks.html": "Digital E-Books Library",
        "about.html": "About Library",
        "contact.html": "Contact & Support",
        "admin.html": "Library Administration",
        "students.html": "Student Management",
        "issue.html": "Book Issue & Return",
        "reports.html": "Library Reports"
    };
    
    const title = pageTitles[path] || "Details";
    
    breadcrumbContainer.innerHTML = `
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item"><a href="index.html" class="d-flex align-items-center gap-1"><span class="material-icons" style="font-size:16px;">home</span>Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">${title}</li>
            </ol>
        </nav>
    `;
}

/**
 * Dismiss loading screen overlay
 */
function dismissLoadingScreen() {
    const loader = document.getElementById("loading-screen");
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
        }, 300);
    }
}

/**
 * Toast Notification System
 * type can be 'success', 'error', 'warning', 'info'
 */
export function showToast(title, desc, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;
    
    const toastId = "toast_" + Date.now();
    const icons = {
        success: "check_circle",
        error: "error",
        warning: "warning",
        info: "info"
    };
    
    const toastHTML = `
        <div class="custom-toast ${type}" id="${toastId}">
            <span class="material-icons toast-icon">${icons[type]}</span>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-desc">${desc}</div>
            </div>
            <button class="toast-close" onclick="this.parentElement.classList.remove('show'); setTimeout(() => this.parentElement.remove(), 400);"><span class="material-icons">close</span></button>
        </div>
    `;
    
    container.insertAdjacentHTML("beforeend", toastHTML);
    const toastNode = document.getElementById(toastId);
    
    // Animate in
    setTimeout(() => {
        toastNode.classList.add("show");
    }, 50);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        if (toastNode) {
            toastNode.classList.remove("show");
            setTimeout(() => {
                toastNode.remove();
            }, 400);
        }
    }, 4000);
}

// Attach showToast globally to window so inline triggers can access it
window.showToast = showToast;
