/**
 * Department Library AI Chatbot
 * Sample/Seed Data for Demo Mode
 */

export const SAMPLE_DEPARTMENTS = [
    { id: "CO", name: "Computer Engineering" },
    { id: "IF", name: "Information Technology" },
    { id: "EE", name: "Electrical Engineering" },
    { id: "ME", name: "Mechanical Engineering" },
    { id: "CE", name: "Civil Engineering" }
];

export const SAMPLE_BOOKS = [
    {
        id: "BK001",
        title: "Object Oriented Programming with C++",
        author: "E. Balagurusamy",
        department: "CO",
        semester: 3,
        subject: "OOP",
        isbn: "978-0070669079",
        quantity: 10,
        available: 7,
        location: "Rack A-Shelf 2"
    },
    {
        id: "BK002",
        title: "Database System Concepts",
        author: "Abraham Silberschatz",
        department: "CO",
        semester: 4,
        subject: "DBMS",
        isbn: "978-0073523309",
        quantity: 8,
        available: 5,
        location: "Rack A-Shelf 4"
    },
    {
        id: "BK003",
        title: "Computer Networks",
        author: "Andrew S. Tanenbaum",
        department: "IF",
        semester: 5,
        subject: "CN",
        isbn: "978-0132126953",
        quantity: 12,
        available: 10,
        location: "Rack B-Shelf 1"
    },
    {
        id: "BK004",
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        department: "CO",
        semester: 5,
        subject: "ADA",
        isbn: "978-0262033848",
        quantity: 5,
        available: 2,
        location: "Rack A-Shelf 1"
    },
    {
        id: "BK005",
        title: "Basic Electrical Engineering",
        author: "B.L. Theraja",
        department: "EE",
        semester: 1,
        subject: "BEE",
        isbn: "978-8121908719",
        quantity: 15,
        available: 12,
        location: "Rack C-Shelf 3"
    },
    {
        id: "BK006",
        title: "Theory of Machines",
        author: "R.S. Khurmi",
        department: "ME",
        semester: 4,
        subject: "TOM",
        isbn: "978-8121925242",
        quantity: 8,
        available: 4,
        location: "Rack D-Shelf 2"
    },
    {
        id: "BK007",
        title: "Surveying and Levelling",
        author: "N.N. Basak",
        department: "CE",
        semester: 3,
        subject: "Surveying",
        isbn: "978-9332901537",
        quantity: 7,
        available: 7,
        location: "Rack E-Shelf 1"
    },
    {
        id: "BK008",
        title: "Software Engineering",
        author: "Roger S. Pressman",
        department: "IF",
        semester: 4,
        subject: "SE",
        isbn: "978-0078022128",
        quantity: 9,
        available: 6,
        location: "Rack B-Shelf 3"
    },
    {
        id: "BK009",
        title: "Digital Logic & Computer Design",
        author: "M. Morris Mano",
        department: "CO",
        semester: 3,
        subject: "DLD",
        isbn: "978-8177584097",
        quantity: 10,
        available: 8,
        location: "Rack A-Shelf 3"
    },
    {
        id: "BK010",
        title: "Power System Engineering",
        author: "D.P. Kothari",
        department: "EE",
        semester: 5,
        subject: "PSE",
        isbn: "978-0070647916",
        quantity: 6,
        available: 3,
        location: "Rack C-Shelf 1"
    }
];

export const SAMPLE_FACULTY = [
    {
        id: "FC001",
        name: "Dr. Rajesh P. Patel",
        designation: "HOD & Professor",
        qualification: "Ph.D. in Computer Engineering",
        department: "CO",
        email: "hod.computer@college.edu",
        contact: "+91 98765 43210",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
        id: "FC002",
        name: "Prof. Sneha M. Shah",
        designation: "Assistant Professor",
        qualification: "M.E. in Information Technology",
        department: "IF",
        email: "sneha.shah@college.edu",
        contact: "+91 98765 43211",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
        id: "FC003",
        name: "Prof. Amit K. Verma",
        designation: "Assistant Professor",
        qualification: "M.Tech in Electrical Power Systems",
        department: "EE",
        email: "amit.verma@college.edu",
        contact: "+91 98765 43212",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
        id: "FC004",
        name: "Dr. Vikram S. Rathod",
        designation: "Associate Professor",
        qualification: "Ph.D. in Thermal Engineering",
        department: "ME",
        email: "vikram.rathod@college.edu",
        contact: "+91 98765 43213",
        photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
        id: "FC005",
        name: "Prof. Pooja D. Vyas",
        designation: "Assistant Professor",
        qualification: "M.E. in Structural Engineering",
        department: "CE",
        email: "pooja.vyas@college.edu",
        contact: "+91 98765 43214",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200"
    }
];

export const SAMPLE_NOTICES = [
    {
        id: "NT001",
        title: "GTU Winter Examination Form Submission",
        content: "Students are required to fill out and submit their GTU Winter examination forms online through the student portal by October 25, 2026. Make sure to clear all library dues before submitting.",
        category: "Exam",
        date: "2026-10-10",
        important: true
    },
    {
        id: "NT002",
        title: "Annual TechFest 'IGNITE 2026' Registration Open",
        content: "Registration for the annual state-level technical symposium 'IGNITE 2026' is now open. Events include robot war, code debugging, and paper presentations. Register at the department office.",
        category: "Event",
        date: "2026-10-12",
        important: false
    },
    {
        id: "NT003",
        title: "Updated Library Timings for Mid-Sem Prep",
        content: "To support students in preparation for the upcoming mid-semester examinations, the central and department libraries will remain open until 8:00 PM on weekdays starting next Monday.",
        category: "Circular",
        date: "2026-10-14",
        important: true
    },
    {
        id: "NT004",
        title: "Placement Drive: TCS Campus Recruitment",
        content: "TCS is conducting a virtual campus recruitment drive for final year Computer and IT Diploma students. Online registration link has been shared via registered emails. Deadline: October 20.",
        category: "Announcement",
        date: "2026-10-15",
        important: true
    }
];

export const SAMPLE_PAPERS = [
    {
        id: "PP001",
        title: "GTU Winter 2025 - Database Management Systems",
        department: "CO",
        semester: 4,
        subject: "DBMS",
        year: 2025,
        fileName: "gtu_dbms_w2025.pdf"
    },
    {
        id: "PP002",
        title: "GTU Summer 2025 - Object Oriented Programming",
        department: "CO",
        semester: 3,
        subject: "OOP",
        year: 2025,
        fileName: "gtu_oop_s2025.pdf"
    },
    {
        id: "PP003",
        title: "GTU Winter 2024 - Computer Networks",
        department: "IF",
        semester: 5,
        subject: "CN",
        year: 2024,
        fileName: "gtu_cn_w2024.pdf"
    },
    {
        id: "PP004",
        title: "GTU Winter 2025 - Theory of Machines",
        department: "ME",
        semester: 4,
        subject: "TOM",
        year: 2025,
        fileName: "gtu_tom_w2025.pdf"
    },
    {
        id: "PP005",
        title: "GTU Summer 2025 - Surveying",
        department: "CE",
        semester: 3,
        subject: "Surveying",
        year: 2025,
        fileName: "gtu_surveying_s2025.pdf"
    }
];

export const SAMPLE_EBOOKS = [
    {
        id: "EB001",
        title: "Clean Code: A Handbook of Agile Software Craftsmanship",
        author: "Robert C. Martin",
        category: "Programming",
        size: "4.2 MB",
        fileName: "clean_code.pdf"
    },
    {
        id: "EB002",
        title: "HTML and CSS: Design and Build Websites",
        author: "Jon Duckett",
        category: "Web Development",
        size: "18.5 MB",
        fileName: "html_and_css.pdf"
    },
    {
        id: "EB003",
        title: "Learning Python, 5th Edition",
        author: "Mark Lutz",
        category: "Python",
        size: "12.8 MB",
        fileName: "learning_python.pdf"
    },
    {
        id: "EB004",
        title: "Practical Electronics for Inventors",
        author: "Paul Scherz",
        category: "Electrical",
        size: "24.1 MB",
        fileName: "practical_electronics.pdf"
    },
    {
        id: "EB005",
        title: "A Textbook of Machine Design",
        author: "R.S. Khurmi",
        category: "Mechanical",
        size: "35.2 MB",
        fileName: "machine_design.pdf"
    }
];

export const SAMPLE_FAQS = [
    {
        id: "FAQ001",
        keywords: ["timing", "hour", "open", "close", "when"],
        question: "What are the library timings?",
        answer: "The library is open from 9:00 AM to 5:00 PM on weekdays (Monday to Friday). During exams, timings are extended till 8:00 PM."
    },
    {
        id: "FAQ002",
        keywords: ["rule", "guideline", "card", "id card"],
        question: "What are the library rules?",
        answer: "1. Silence must be maintained in the library. 2. A valid Student ID Card is mandatory for entry and issuing. 3. Group discussions are only allowed in the designated study rooms. 4. Food and drinks are strictly prohibited inside the main reading hall."
    },
    {
        id: "FAQ003",
        keywords: ["fine", "dues", "late", "charges", "delay"],
        question: "How is the fine calculated for late returns?",
        answer: "A fine of ₹2 per book per day will be charged if books are returned after the designated due date. Dues can be cleared at the library desk."
    },
    {
        id: "FAQ004",
        keywords: ["issue", "borrow", "take", "checkout", "days", "duration"],
        question: "What is the book issue process and duration?",
        answer: "To issue a book: 1. Search the library catalog. 2. Fetch the book from the shelf. 3. Present the book along with your Student ID Card at the Issue Desk. Students can borrow up to 3 books for a duration of 14 days. Renewal is permitted once if there is no pending reserve on that book."
    },
    {
        id: "FAQ005",
        keywords: ["return", "give back", "submit"],
        question: "How do I return a book?",
        answer: "Simply hand over the book to the librarian at the Return Counter. They will scan the barcode, update your library record, and verify if there are any late return fines."
    },
    {
        id: "FAQ006",
        keywords: ["syllabus", "gtu", "course", "curriculum"],
        question: "Where can I find the GTU syllabus?",
        answer: "The GTU syllabus is available department-wise. You can download the latest syllabus PDF from the GTU official website, or search our E-Books page for syllabus guidelines and reference text guides."
    },
    {
        id: "FAQ007",
        keywords: ["contact", "phone", "email", "librarian", "support", "call"],
        question: "What is the library contact information?",
        answer: "You can email us at library@college.edu or call the administration office at +91 98765 00011 (Ext: 204). The Librarian's cabin is located on the ground floor next to the reading room."
    },
    {
        id: "FAQ008",
        keywords: ["how many", "limit", "books count"],
        question: "How many books can I issue at once?",
        answer: "A diploma student can issue a maximum of 3 books at any given time for up to 14 days. Faculty members can borrow up to 10 books for a duration of 1 semester."
    }
];

/* ==========================================
   SAMPLE STUDENT DATA
   ========================================== */
export const SAMPLE_STUDENTS = [
    {
        id: "ST001",
        name: "Rahul Sharma",
        enrollmentNo: "2024CO001",
        department: "CO",
        semester: 4,
        email: "rahul.sharma@student.college.edu",
        phone: "+91 98765 11001",
        address: "123, Gandhi Nagar, Ahmedabad",
        createdAt: "2024-07-01T00:00:00.000Z"
    },
    {
        id: "ST002",
        name: "Priya Patel",
        enrollmentNo: "2024IF002",
        department: "IF",
        semester: 3,
        email: "priya.patel@student.college.edu",
        phone: "+91 98765 11002",
        address: "45, Navrangpura, Ahmedabad",
        createdAt: "2024-07-01T00:00:00.000Z"
    },
    {
        id: "ST003",
        name: "Arjun Verma",
        enrollmentNo: "2024EE003",
        department: "EE",
        semester: 5,
        email: "arjun.verma@student.college.edu",
        phone: "+91 98765 11003",
        address: "78, Maninagar, Ahmedabad",
        createdAt: "2024-07-01T00:00:00.000Z"
    },
    {
        id: "ST004",
        name: "Sneha Desai",
        enrollmentNo: "2024ME004",
        department: "ME",
        semester: 4,
        email: "sneha.desai@student.college.edu",
        phone: "+91 98765 11004",
        address: "56, Ellisbridge, Ahmedabad",
        createdAt: "2024-07-01T00:00:00.000Z"
    },
    {
        id: "ST005",
        name: "Vikram Singh",
        enrollmentNo: "2024CE005",
        department: "CE",
        semester: 3,
        email: "vikram.singh@student.college.edu",
        phone: "+91 98765 11005",
        address: "90, Vastrapur, Ahmedabad",
        createdAt: "2024-07-01T00:00:00.000Z"
    },
    {
        id: "ST006",
        name: "Anjali Mehta",
        enrollmentNo: "2024CO006",
        department: "CO",
        semester: 5,
        email: "anjali.mehta@student.college.edu",
        phone: "+91 98765 11006",
        address: "11, Paldi, Ahmedabad",
        createdAt: "2024-07-02T00:00:00.000Z"
    },
    {
        id: "ST007",
        name: "Rohan Gupta",
        enrollmentNo: "2024IF007",
        department: "IF",
        semester: 5,
        email: "rohan.gupta@student.college.edu",
        phone: "+91 98765 11007",
        address: "32, Bodakdev, Ahmedabad",
        createdAt: "2024-07-02T00:00:00.000Z"
    },
    {
        id: "ST008",
        name: "Kavya Nair",
        enrollmentNo: "2024EE008",
        department: "EE",
        semester: 2,
        email: "kavya.nair@student.college.edu",
        phone: "+91 98765 11008",
        address: "67, Satellite, Ahmedabad",
        createdAt: "2024-07-03T00:00:00.000Z"
    },
    {
        id: "ST009",
        name: "Manish Rao",
        enrollmentNo: "2024ME009",
        department: "ME",
        semester: 2,
        email: "manish.rao@student.college.edu",
        phone: "+91 98765 11009",
        address: "14, Thaltej, Ahmedabad",
        createdAt: "2024-07-03T00:00:00.000Z"
    },
    {
        id: "ST010",
        name: "Pooja Joshi",
        enrollmentNo: "2024CE010",
        department: "CE",
        semester: 6,
        email: "pooja.joshi@student.college.edu",
        phone: "+91 98765 11010",
        address: "99, Chandkheda, Ahmedabad",
        createdAt: "2024-07-04T00:00:00.000Z"
    }
];

/* ==========================================
   SAMPLE ISSUED BOOK RECORDS
   ========================================== */
export const SAMPLE_ISSUED = [
    {
        id: "IS001",
        bookId: "BK001",
        bookTitle: "Object Oriented Programming with C++",
        bookAuthor: "E. Balagurusamy",
        bookIsbn: "978-0070669079",
        studentId: "ST001",
        studentName: "Rahul Sharma",
        studentEmail: "rahul.sharma@student.college.edu",
        department: "CO",
        issueDate: "2026-07-05",
        dueDate: "2026-07-19",
        status: "issued",
        fine: 0,
        renewalCount: 0
    },
    {
        id: "IS002",
        bookId: "BK003",
        bookTitle: "Computer Networks",
        bookAuthor: "Andrew S. Tanenbaum",
        bookIsbn: "978-0132126953",
        studentId: "ST002",
        studentName: "Priya Patel",
        studentEmail: "priya.patel@student.college.edu",
        department: "IF",
        issueDate: "2026-07-01",
        dueDate: "2026-07-15",
        status: "issued",
        fine: 6,
        renewalCount: 0
    },
    {
        id: "IS003",
        bookId: "BK004",
        bookTitle: "Introduction to Algorithms",
        bookAuthor: "Thomas H. Cormen",
        bookIsbn: "978-0262033848",
        studentId: "ST006",
        studentName: "Anjali Mehta",
        studentEmail: "anjali.mehta@student.college.edu",
        department: "CO",
        issueDate: "2026-07-10",
        dueDate: "2026-07-24",
        status: "issued",
        fine: 0,
        renewalCount: 0
    }
];

/* ==========================================
   SAMPLE RETURNED BOOK RECORDS
   ========================================== */
export const SAMPLE_RETURNED = [
    {
        id: "RT001",
        issueId: "IS_OLD001",
        bookId: "BK002",
        bookTitle: "Database System Concepts",
        bookAuthor: "Abraham Silberschatz",
        bookIsbn: "978-0073523309",
        studentId: "ST003",
        studentName: "Arjun Verma",
        studentEmail: "arjun.verma@student.college.edu",
        department: "EE",
        issueDate: "2026-06-01",
        dueDate: "2026-06-15",
        returnDate: "2026-06-18",
        fine: 6,
        status: "returned"
    },
    {
        id: "RT002",
        issueId: "IS_OLD002",
        bookId: "BK005",
        bookTitle: "Basic Electrical Engineering",
        bookAuthor: "B.L. Theraja",
        bookIsbn: "978-8121908719",
        studentId: "ST008",
        studentName: "Kavya Nair",
        studentEmail: "kavya.nair@student.college.edu",
        department: "EE",
        issueDate: "2026-06-10",
        dueDate: "2026-06-24",
        returnDate: "2026-06-24",
        fine: 0,
        status: "returned"
    },
    {
        id: "RT003",
        issueId: "IS_OLD003",
        bookId: "BK009",
        bookTitle: "Digital Logic & Computer Design",
        bookAuthor: "M. Morris Mano",
        bookIsbn: "978-8177584097",
        studentId: "ST001",
        studentName: "Rahul Sharma",
        studentEmail: "rahul.sharma@student.college.edu",
        department: "CO",
        issueDate: "2026-05-20",
        dueDate: "2026-06-03",
        returnDate: "2026-06-05",
        fine: 4,
        status: "returned"
    }
];

