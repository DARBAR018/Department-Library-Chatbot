/**
 * Department Library AI Chatbot
 * Unified Database Controller (Firebase Firestore / LocalStorage Fallback)
 */

import { FIREBASE_CONFIG, isFirebaseConfigured, APP_MODE } from "./config.js";
import * as SampleData from "./sample-data.js";

// Firebase variables
let db = null;

// Initialize Firebase if configured
if (APP_MODE === "localstorage" && isFirebaseConfigured()) {
    try {
        // Dynamically import Firebase on runtime to prevent errors in offline mode
        const { initializeApp } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js");
        const { getFirestore } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js");
        
        const app = initializeApp(FIREBASE_CONFIG);
        db = getFirestore(app);
        console.log("[Database] Firebase Firestore initialized successfully.");
    } catch (error) {
        console.error("[Database] Failed to initialize Firebase Firestore, falling back to LocalStorage:", error);
    }
}

// Fallback: LocalStorage Seeding if empty
const storageKeys = {
    books: "lib_books",
    faculty: "lib_faculty",
    notices: "lib_notices",
    papers: "lib_papers",
    ebooks: "lib_ebooks",
    faqs: "lib_faqs",
    students: "lib_students",
    issuedBooks: "lib_issued",
    returnedBooks: "lib_returned"
};

function seedLocalStorage() {
    if (!localStorage.getItem(storageKeys.books)) {
        localStorage.setItem(storageKeys.books, JSON.stringify(SampleData.SAMPLE_BOOKS));
    }
    if (!localStorage.getItem(storageKeys.faculty)) {
        localStorage.setItem(storageKeys.faculty, JSON.stringify(SampleData.SAMPLE_FACULTY));
    }
    if (!localStorage.getItem(storageKeys.notices)) {
        localStorage.setItem(storageKeys.notices, JSON.stringify(SampleData.SAMPLE_NOTICES));
    }
    if (!localStorage.getItem(storageKeys.papers)) {
        localStorage.setItem(storageKeys.papers, JSON.stringify(SampleData.SAMPLE_PAPERS));
    }
    if (!localStorage.getItem(storageKeys.ebooks)) {
        localStorage.setItem(storageKeys.ebooks, JSON.stringify(SampleData.SAMPLE_EBOOKS));
    }
    if (!localStorage.getItem(storageKeys.faqs)) {
        localStorage.setItem(storageKeys.faqs, JSON.stringify(SampleData.SAMPLE_FAQS));
    }
    if (!localStorage.getItem(storageKeys.students)) {
        localStorage.setItem(storageKeys.students, JSON.stringify(SampleData.SAMPLE_STUDENTS));
    }
    if (!localStorage.getItem(storageKeys.issuedBooks)) {
        localStorage.setItem(storageKeys.issuedBooks, JSON.stringify(SampleData.SAMPLE_ISSUED));
    }
    if (!localStorage.getItem(storageKeys.returnedBooks)) {
        localStorage.setItem(storageKeys.returnedBooks, JSON.stringify(SampleData.SAMPLE_RETURNED));
    }
    console.log("[Database] LocalStorage virtual Firestore seeded with sample data.");
}

// Always seed LocalStorage so it's ready as a backup or active sandbox
seedLocalStorage();

/* ==========================================
   HELPER UTILITIES FOR LOCALSTORAGE CRUD
   ========================================== */
function getLocalData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveLocalData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

/* ==========================================
   DYNAMIC ROUTED CRUD OPERATIONS
   ========================================== */

// --- Books Operations ---
export async function getBooks() {
    if (APP_MODE === "firebase" && db) {
        try {
            const { collection, getDocs } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js");
            const snap = await getDocs(collection(db, "books"));
            const books = [];
            snap.forEach(doc => books.push({ id: doc.id, ...doc.data() }));
            return books;
        } catch (e) {
            console.error("Firestore read error, falling back to LocalStorage:", e);
        }
    }
    return getLocalData(storageKeys.books);
}

export async function addBook(bookData) {
    const id = bookData.id || "BK" + Date.now();
    const newBook = { id, ...bookData };
    
    if (APP_MODE === "firebase" && db) {
        try {
            const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js");
            await setDoc(doc(db, "books", id), newBook);
            return newBook;
        } catch (e) {
            console.error("Firestore write error, writing locally:", e);
        }
    }
    
    const books = getLocalData(storageKeys.books);
    books.push(newBook);
    saveLocalData(storageKeys.books, books);
    return newBook;
}

export async function updateBook(id, updatedData) {
    if (APP_MODE === "firebase" && db) {
        try {
            const { doc, updateDoc } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js");
            await updateDoc(doc(db, "books", id), updatedData);
            return { id, ...updatedData };
        } catch (e) {
            console.error("Firestore update error, writing locally:", e);
        }
    }
    
    const books = getLocalData(storageKeys.books);
    const idx = books.findIndex(b => b.id === id);
    if (idx !== -1) {
        books[idx] = { ...books[idx], ...updatedData };
        saveLocalData(storageKeys.books, books);
        return books[idx];
    }
    throw new Error("Book not found");
}

export async function deleteBook(id) {
    if (APP_MODE === "firebase" && db) {
        try {
            const { doc, deleteDoc } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js");
            await deleteDoc(doc(db, "books", id));
            return id;
        } catch (e) {
            console.error("Firestore delete error, removing locally:", e);
        }
    }
    
    let books = getLocalData(storageKeys.books);
    books = books.filter(b => b.id !== id);
    saveLocalData(storageKeys.books, books);
    return id;
}

// --- Notice Board Operations ---
export async function getNotices() {
    if (APP_MODE === "firebase" && db) {
        try {
            const { collection, getDocs } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js");
            const snap = await getDocs(collection(db, "notices"));
            const notices = [];
            snap.forEach(doc => notices.push({ id: doc.id, ...doc.data() }));
            return notices.sort((a,b) => new Date(b.date) - new Date(a.date));
        } catch (e) {
            console.error("Firestore read error, falling back to LocalStorage:", e);
        }
    }
    return getLocalData(storageKeys.notices).sort((a,b) => new Date(b.date) - new Date(a.date));
}

export async function addNotice(noticeData) {
    const id = noticeData.id || "NT" + Date.now();
    const newNotice = { id, ...noticeData, date: noticeData.date || new Date().toISOString().split('T')[0] };
    
    if (APP_MODE === "firebase" && db) {
        try {
            const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js");
            await setDoc(doc(db, "notices", id), newNotice);
            return newNotice;
        } catch (e) {
            console.error("Firestore write error:", e);
        }
    }
    
    const notices = getLocalData(storageKeys.notices);
    notices.push(newNotice);
    saveLocalData(storageKeys.notices, notices);
    return newNotice;
}

export async function updateNotice(id, updatedData) {
    if (APP_MODE === "firebase" && db) {
        try {
            const { doc, updateDoc } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js");
            await updateDoc(doc(db, "notices", id), updatedData);
            return { id, ...updatedData };
        } catch (e) {
            console.error("Firestore update error:", e);
        }
    }
    
    const notices = getLocalData(storageKeys.notices);
    const idx = notices.findIndex(n => n.id === id);
    if (idx !== -1) {
        notices[idx] = { ...notices[idx], ...updatedData };
        saveLocalData(storageKeys.notices, notices);
        return notices[idx];
    }
    throw new Error("Notice not found");
}

export async function deleteNotice(id) {
    if (APP_MODE === "firebase" && db) {
        try {
            const { doc, deleteDoc } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js");
            await deleteDoc(doc(db, "notices", id));
            return id;
        } catch (e) {
            console.error("Firestore delete error:", e);
        }
    }
    
    let notices = getLocalData(storageKeys.notices);
    notices = notices.filter(n => n.id !== id);
    saveLocalData(storageKeys.notices, notices);
    return id;
}

// --- Faculty Operations ---
export async function getFaculty() {
    if (APP_MODE === "firebase" && db) {
        try {
            const { collection, getDocs } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js");
            const snap = await getDocs(collection(db, "faculty"));
            const faculty = [];
            snap.forEach(doc => faculty.push({ id: doc.id, ...doc.data() }));
            return faculty;
        } catch (e) {
            console.error("Firestore read error, falling back to LocalStorage:", e);
        }
    }
    return getLocalData(storageKeys.faculty);
}

export async function addFaculty(facultyData) {
    const id = facultyData.id || "FC" + Date.now();
    const newFaculty = { id, ...facultyData };
    
    if (APP_MODE === "firebase" && db) {
        try {
            const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js");
            await setDoc(doc(db, "faculty", id), newFaculty);
            return newFaculty;
        } catch (e) {
            console.error("Firestore write error:", e);
        }
    }
    
    const faculty = getLocalData(storageKeys.faculty);
    faculty.push(newFaculty);
    saveLocalData(storageKeys.faculty, faculty);
    return newFaculty;
}

export async function updateFaculty(id, updatedData) {
    if (APP_MODE === "firebase" && db) {
        try {
            const { doc, updateDoc } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js");
            await updateDoc(doc(db, "faculty", id), updatedData);
            return { id, ...updatedData };
        } catch (e) {
            console.error("Firestore update error:", e);
        }
    }
    
    const faculty = getLocalData(storageKeys.faculty);
    const idx = faculty.findIndex(f => f.id === id);
    if (idx !== -1) {
        faculty[idx] = { ...faculty[idx], ...updatedData };
        saveLocalData(storageKeys.faculty, faculty);
        return faculty[idx];
    }
    throw new Error("Faculty not found");
}

export async function deleteFaculty(id) {
    if (APP_MODE === "firebase" && db) {
        try {
            const { doc, deleteDoc } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js");
            await deleteDoc(doc(db, "faculty", id));
            return id;
        } catch (e) {
            console.error("Firestore delete error:", e);
        }
    }
    
    let faculty = getLocalData(storageKeys.faculty);
    faculty = faculty.filter(f => f.id !== id);
    saveLocalData(storageKeys.faculty, faculty);
    return id;
}

// --- Previous Papers Operations ---
export async function getPapers() {
    if (APP_MODE === "firebase" && db) {
        try {
            const { collection, getDocs } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js");
            const snap = await getDocs(collection(db, "papers"));
            const papers = [];
            snap.forEach(doc => papers.push({ id: doc.id, ...doc.data() }));
            return papers;
        } catch (e) {
            console.error("Firestore read error, falling back to LocalStorage:", e);
        }
    }
    return getLocalData(storageKeys.papers);
}

export async function addPaper(paperData) {
    const id = paperData.id || "PP" + Date.now();
    const newPaper = { id, ...paperData };
    
    if (APP_MODE === "firebase" && db) {
        try {
            const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js");
            await setDoc(doc(db, "papers", id), newPaper);
            return newPaper;
        } catch (e) {
            console.error("Firestore write error:", e);
        }
    }
    
    const papers = getLocalData(storageKeys.papers);
    papers.push(newPaper);
    saveLocalData(storageKeys.papers, papers);
    return newPaper;
}

export async function deletePaper(id) {
    if (APP_MODE === "firebase" && db) {
        try {
            const { doc, deleteDoc } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js");
            await deleteDoc(doc(db, "papers", id));
            return id;
        } catch (e) {
            console.error("Firestore delete error:", e);
        }
    }
    
    let papers = getLocalData(storageKeys.papers);
    papers = papers.filter(p => p.id !== id);
    saveLocalData(storageKeys.papers, papers);
    return id;
}

// --- E-Books Operations ---
export async function getEbooks() {
    if (APP_MODE === "firebase" && db) {
        try {
            const { collection, getDocs } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js");
            const snap = await getDocs(collection(db, "ebooks"));
            const ebooks = [];
            snap.forEach(doc => ebooks.push({ id: doc.id, ...doc.data() }));
            return ebooks;
        } catch (e) {
            console.error("Firestore read error, falling back to LocalStorage:", e);
        }
    }
    return getLocalData(storageKeys.ebooks);
}

export async function addEbook(ebookData) {
    const id = ebookData.id || "EB" + Date.now();
    const newEbook = { id, ...ebookData };
    
    if (APP_MODE === "firebase" && db) {
        try {
            const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js");
            await setDoc(doc(db, "ebooks", id), newEbook);
            return newEbook;
        } catch (e) {
            console.error("Firestore write error:", e);
        }
    }
    
    const ebooks = getLocalData(storageKeys.ebooks);
    ebooks.push(newEbook);
    saveLocalData(storageKeys.ebooks, ebooks);
    return newEbook;
}

export async function deleteEbook(id) {
    if (APP_MODE === "firebase" && db) {
        try {
            const { doc, deleteDoc } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js");
            await deleteDoc(doc(db, "ebooks", id));
            return id;
        } catch (e) {
            console.error("Firestore delete error:", e);
        }
    }
    
    let ebooks = getLocalData(storageKeys.ebooks);
    ebooks = ebooks.filter(e => e.id !== id);
    saveLocalData(storageKeys.ebooks, ebooks);
    return id;
}

// --- Chatbot FAQ Operations ---
export async function getFaqs() {
    if (APP_MODE === "firebase" && db) {
        try {
            const { collection, getDocs } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js");
            const snap = await getDocs(collection(db, "faqs"));
            const faqs = [];
            snap.forEach(doc => faqs.push({ id: doc.id, ...doc.data() }));
            return faqs;
        } catch (e) {
            console.error("Firestore read error, falling back to LocalStorage:", e);
        }
    }
    return getLocalData(storageKeys.faqs);
}

export async function addFaq(faqData) {
    const id = faqData.id || "FAQ" + Date.now();
    const newFaq = { id, ...faqData };
    
    if (APP_MODE === "firebase" && db) {
        try {
            const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js");
            await setDoc(doc(db, "faqs", id), newFaq);
            return newFaq;
        } catch (e) {
            console.error("Firestore write error:", e);
        }
    }
    
    const faqs = getLocalData(storageKeys.faqs);
    faqs.push(newFaq);
    saveLocalData(storageKeys.faqs, faqs);
    return newFaq;
}

export async function updateFaq(id, updatedData) {
    if (APP_MODE === "firebase" && db) {
        try {
            const { doc, updateDoc } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js");
            await updateDoc(doc(db, "faqs", id), updatedData);
            return { id, ...updatedData };
        } catch (e) {
            console.error("Firestore update error:", e);
        }
    }
    
    const faqs = getLocalData(storageKeys.faqs);
    const idx = faqs.findIndex(f => f.id === id);
    if (idx !== -1) {
        faqs[idx] = { ...faqs[idx], ...updatedData };
        saveLocalData(storageKeys.faqs, faqs);
        return faqs[idx];
    }
    throw new Error("FAQ not found");
}

export async function deleteFaq(id) {
    if (APP_MODE === "firebase" && db) {
        try {
            const { doc, deleteDoc } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js");
            await deleteDoc(doc(db, "faqs", id));
            return id;
        } catch (e) {
            console.error("Firestore delete error:", e);
        }
    }
    
    let faqs = getLocalData(storageKeys.faqs);
    faqs = faqs.filter(f => f.id !== id);
    saveLocalData(storageKeys.faqs, faqs);
    return id;
}

/* ==========================================
   STUDENT MANAGEMENT OPERATIONS
   ========================================== */

export async function getStudents() {
    return getLocalData(storageKeys.students);
}

export async function addStudent(studentData) {
    const id = studentData.id || "ST" + Date.now();
    const newStudent = { id, ...studentData, createdAt: new Date().toISOString() };
    const students = getLocalData(storageKeys.students);
    students.push(newStudent);
    saveLocalData(storageKeys.students, students);
    return newStudent;
}

export async function updateStudent(id, updatedData) {
    const students = getLocalData(storageKeys.students);
    const idx = students.findIndex(s => s.id === id);
    if (idx !== -1) {
        students[idx] = { ...students[idx], ...updatedData };
        saveLocalData(storageKeys.students, students);
        return students[idx];
    }
    throw new Error("Student not found");
}

export async function deleteStudent(id) {
    let students = getLocalData(storageKeys.students);
    students = students.filter(s => s.id !== id);
    saveLocalData(storageKeys.students, students);
    return id;
}

/* ==========================================
   BOOK ISSUE OPERATIONS
   ========================================== */

export async function getIssuedBooks() {
    return getLocalData(storageKeys.issuedBooks).sort((a,b) => new Date(b.issueDate) - new Date(a.issueDate));
}

export async function issueBook(issueData) {
    const id = "IS" + Date.now();
    const today = new Date();
    const dueDate = new Date(today);
    dueDate.setDate(dueDate.getDate() + 14); // 14-day lending period

    const newIssue = {
        id,
        bookId: issueData.bookId,
        bookTitle: issueData.bookTitle,
        bookAuthor: issueData.bookAuthor,
        bookIsbn: issueData.bookIsbn,
        studentId: issueData.studentId,
        studentName: issueData.studentName,
        studentEmail: issueData.studentEmail,
        department: issueData.department,
        issueDate: today.toISOString().split('T')[0],
        dueDate: dueDate.toISOString().split('T')[0],
        status: "issued",
        fine: 0,
        renewalCount: 0
    };

    const issued = getLocalData(storageKeys.issuedBooks);
    issued.push(newIssue);
    saveLocalData(storageKeys.issuedBooks, issued);

    // Decrement available count for the book
    const books = getLocalData(storageKeys.books);
    const bIdx = books.findIndex(b => b.id === issueData.bookId);
    if (bIdx !== -1 && books[bIdx].available > 0) {
        books[bIdx].available -= 1;
        saveLocalData(storageKeys.books, books);
    }

    return newIssue;
}

export async function renewIssue(issueId) {
    const issued = getLocalData(storageKeys.issuedBooks);
    const idx = issued.findIndex(i => i.id === issueId);
    if (idx !== -1 && issued[idx].renewalCount < 1) {
        const newDue = new Date();
        newDue.setDate(newDue.getDate() + 14);
        issued[idx].dueDate = newDue.toISOString().split('T')[0];
        issued[idx].renewalCount += 1;
        issued[idx].fine = 0;
        saveLocalData(storageKeys.issuedBooks, issued);
        return issued[idx];
    }
    throw new Error("Renewal not allowed.");
}

/* ==========================================
   BOOK RETURN OPERATIONS
   ========================================== */

export async function getReturnedBooks() {
    return getLocalData(storageKeys.returnedBooks).sort((a,b) => new Date(b.returnDate) - new Date(a.returnDate));
}

export async function returnBook(issueId) {
    const issued = getLocalData(storageKeys.issuedBooks);
    const idx = issued.findIndex(i => i.id === issueId);
    if (idx === -1) throw new Error("Issue record not found");

    const record = issued[idx];
    const today = new Date();
    const due = new Date(record.dueDate);
    let fine = 0;
    if (today > due) {
        const diffDays = Math.ceil((today - due) / (1000 * 60 * 60 * 24));
        fine = diffDays * 2; // ₹2 per day
    }

    const returnRecord = {
        ...record,
        id: "RT" + Date.now(),
        issueId: record.id,
        returnDate: today.toISOString().split('T')[0],
        fine,
        status: "returned"
    };

    // Save to returned collection
    const returned = getLocalData(storageKeys.returnedBooks);
    returned.push(returnRecord);
    saveLocalData(storageKeys.returnedBooks, returned);

    // Remove from issued collection
    issued.splice(idx, 1);
    saveLocalData(storageKeys.issuedBooks, issued);

    // Restore available count for the book
    const books = getLocalData(storageKeys.books);
    const bIdx = books.findIndex(b => b.id === record.bookId);
    if (bIdx !== -1) {
        books[bIdx].available = Math.min(books[bIdx].available + 1, books[bIdx].quantity);
        saveLocalData(storageKeys.books, books);
    }

    return returnRecord;
}

export async function calculateFine(issueId) {
    const issued = getLocalData(storageKeys.issuedBooks);
    const record = issued.find(i => i.id === issueId);
    if (!record) return 0;
    const today = new Date();
    const due = new Date(record.dueDate);
    if (today <= due) return 0;
    return Math.ceil((today - due) / (1000 * 60 * 60 * 24)) * 2;
}
