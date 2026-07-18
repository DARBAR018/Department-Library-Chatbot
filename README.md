# Department Library AI Chatbot Portal

A production-ready, premium Department Library Web Portal designed for a Diploma Engineering College. This project mimics a professional college system rather than a standard student project, utilizing glassmorphism aesthetics, a blue/white/cyan layout, full light/dark theme compatibility, Animate on Scroll (AOS), and dynamic charts.

It features a **Dual-Mode Data Layer** that runs entirely client-side using `localStorage` and a rich pre-seeded dataset by default, allowing you to test all functions (adding/editing books, notice boards, AI chatbot responses) immediately. It connects to a live **Firebase (Auth & Firestore)** database once credentials are supplied in the configurations.

---

## Technical Stack
- **Frontend Core**: HTML5, CSS3 (Vanilla + Custom CSS Variables), JS (ES6 Modules)
- **Grid Layouts**: Bootstrap 5
- **Icons & Graphics**: Google Material Icons, Font Awesome 5/6
- **Dynamic Charts**: Chart.js v4+
- **Scroll Effects**: AOS Animate On Scroll Library
- **Authentication & Database**: Firebase v9+ (Authentication, Firestore Database, Storage)
- **Local Database Mode**: Custom simulated database mapping mutations to `localStorage`.

---

## File Structure
```
/Department Library Chatbot/
├── index.html                  # Homepage (Hero, Stats, Announcements, Info)
├── login.html                  # Auth Portal (Login, Signup, Reset forms)
├── dashboard.html              # Student Dashboard (Borrow history, renewal, Chart)
├── books.html                  # Book Catalog (Advanced Search, Filters, Reserves)
├── notice.html                 # Notice Board (Latest circulars, Exam schedule form)
├── faculty.html                # Faculty Directory (Staff list, contacts)
├── papers.html                 # Past Papers (Dept/Sem filter, virtual exam sheet preview)
├── ebooks.html                 # Digital E-Books (Read online previewer, download)
├── about.html                  # About Page (Vision, Mission, facilities, timings)
├── contact.html                # Contact Page (Form, map placeholder, social links)
├── admin.html                  # Admin Dashboard (Analytics, inventory editors)
├── 404.html                    # Elegant Error Page
├── css/
│   └── style.css               # Design system, glassmorphism templates, theme managers
├── js/
│   ├── app.js                  # Shared UI Injector (navbar, footer, theme toggler, toasts)
│   ├── config.js               # Firebase variables and environment triggers
│   ├── sample-data.js          # Seed dataset (Books, Faculty, Notices, Papers, FAQs)
│   ├── db.js                   # Unified Database Interface (routes to Firestore or LocalStorage)
│   ├── auth.js                 # Unified Authentication Controller
│   ├── chatbot.js              # Chatbot NLP match engine, speech TTS/STT controllers
│   └── admin.js                # Admin operations controller
└── assets/
    └── docs/                   # Explanation of mock assets handling
```

---

## Getting Started (Immediate Testing)

The project is structured to run immediately in your browser without compiling.

1. **Serve locally**: Run a local HTTP server in the project directory:
   ```bash
   # Using Node.js (recommended)
   npx http-server ./
   
   # Or using Python
   python -m http.server 8000
   ```
2. **Open website**: Open the generated address in your browser (e.g. `http://localhost:8080` or `http://localhost:8000`).
3. **Demo credentials**:
   - **Student Account**: `student@college.edu` | Password: `student123`
   - **Admin Account**: `admin@college.edu` | Password: `admin123`

---

## AI Chatbot Capabilities

Liby, our virtual AI librarian assistant, is accessible via the floating trigger icon on the bottom right of the screen.
- **Natural Language Parsing**: Analyzes user tokens against the keyword mapping index in the FAQs database.
- **Dynamic Catalog Searches**: If you ask: *"Is Andrew Tanenbaum book available?"* the bot queries the books database, locates Tanenbaum's computer networking book, and reports rack locations and remaining copy counts.
- **Faculty Directory Lookup**: Ask: *"Snhea Shah email contact"* to fetch designations, qualifications, and direct contacts.
- **Speech Recognition (STT)**: Use the microphone button to dictate questions.
- **Speech Synthesis (TTS)**: Speak the answers aloud, toggled using the header speaker icon.
- **State Persistence**: Chat logs are cached in `sessionStorage` and persist across page navigation transitions.

---

## Administrative Powers
The Admin dashboard (`admin.html`) is accessible to users logged in with the `admin` role.
- **Real-Time Catalog Changes**: Add, Edit, or Delete books, faculty members, notices, and GTU papers.
- **FAQ Tutoring Panel**: Directly add or modify keyword associations and answers to train Liby's NLP engine.
- **Interactive Analytics**: Doughnut charts of book stocks update as soon as quantities are edited in the catalog.
