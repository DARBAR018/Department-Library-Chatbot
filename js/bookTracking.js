
async function addStudent(studentId, name, enrollmentNo, email) {

    try {

        await db.collection("students").doc(studentId).set({

            name: name,
            enrollmentNo: enrollmentNo,
            email: email,

            createdAt:
                firebase.firestore.FieldValue.serverTimestamp()

        });

        console.log("Student added successfully");

        return true;

    } catch (error) {

        console.error(
            "Error adding student:",
            error
        );

        return false;
    }
}


/* ============================================================
   2. BOOK ACTIVITY - BOOK ISSUE
   ============================================================ */

/**
 * Record when a student receives/borrows a book.
 *
 * Firestore structure:
 *
 * bookActivity
 *   └── activityId
 *        ├── studentId
 *        ├── studentName
 *        ├── bookId
 *        ├── bookTitle
 *        ├── action
 *        ├── issueDate
 *        ├── returnDate
 *        └── timestamp
 */

async function recordBookIssued(
    studentId,
    studentName,
    bookId,
    bookTitle
) {

    try {

        await db.collection("bookActivity").add({

            studentId: studentId,

            studentName: studentName,

            bookId: bookId,

            bookTitle: bookTitle,

            action: "issued",

            issueDate: new Date().toISOString(),

            returnDate: null,

            timestamp:
                firebase.firestore.FieldValue.serverTimestamp()

        });

        console.log(
            "Book issue activity recorded successfully"
        );

        return true;

    } catch (error) {

        console.error(
            "Error recording book issue:",
            error
        );

        return false;
    }
}


/* ============================================================
   3. BOOK RETURN
   ============================================================ */

/**
 * Record when a student returns a book.
 */

async function recordBookReturned(
    studentId,
    studentName,
    bookId,
    bookTitle
) {

    try {

        await db.collection("bookActivity").add({

            studentId: studentId,

            studentName: studentName,

            bookId: bookId,

            bookTitle: bookTitle,

            action: "returned",

            issueDate: null,

            returnDate: new Date().toISOString(),

            timestamp:
                firebase.firestore.FieldValue.serverTimestamp()

        });

        console.log(
            "Book return activity recorded successfully"
        );

        return true;

    } catch (error) {

        console.error(
            "Error recording book return:",
            error
        );

        return false;
    }
}


/* ============================================================
   4. ADMIN / OWNER
   ============================================================ */

/**
 * Create an Owner/Admin record.
 *
 * Firestore structure:
 *
 * admin
 *   └── adminUserId
 *        ├── role: "owner"
 *        └── createdAt
 */

async function createOwner(adminUserId) {

    try {

        await db.collection("admin")
            .doc(adminUserId)
            .set({

                role: "owner",

                createdAt:
                    firebase.firestore.FieldValue.serverTimestamp()

            });

        console.log(
            "Owner created successfully"
        );

        return true;

    } catch (error) {

        console.error(
            "Error creating owner:",
            error
        );

        return false;
    }
}


/* ============================================================
   5. STUDENT TOTAL BOOK COUNT
   ============================================================ */

/**
 * Get total number of books issued to a student.
 *
 * NOTE:
 * "issued" means borrowed/issued.
 * It does NOT prove that the student actually read the
 * physical book.
 */

async function getStudentBookCount(studentId) {

    try {

        const snapshot = await db
            .collection("bookActivity")
            .where(
                "studentId",
                "==",
                studentId
            )
            .where(
                "action",
                "==",
                "issued"
            )
            .get();

        return snapshot.size;

    } catch (error) {

        console.error(
            "Error getting student book count:",
            error
        );

        return 0;
    }
}


/* ============================================================
   6. GET STUDENT BOOK ACTIVITY
   ============================================================ */

/**
 * Get complete book activity of a particular student.
 */

async function getStudentBookActivity(studentId) {

    try {

        const snapshot = await db
            .collection("bookActivity")
            .where(
                "studentId",
                "==",
                studentId
            )
            .get();

        const activities = [];

        snapshot.forEach((doc) => {

            activities.push({

                id: doc.id,

                ...doc.data()

            });

        });

        return activities;

    } catch (error) {

        console.error(
            "Error getting student activity:",
            error
        );

        return [];
    }
}


/* ============================================================
   7. GET ALL BOOK ACTIVITIES
   ============================================================ */

/**
 * IMPORTANT:
 * This function should only be used by the Owner/Admin dashboard.
 */

async function getAllBookActivities() {

    try {

        const snapshot = await db
            .collection("bookActivity")
            .get();

        const activities = [];

        snapshot.forEach((doc) => {

            activities.push({

                id: doc.id,

                ...doc.data()

            });

        });

        return activities;

    } catch (error) {

        console.error(
            "Error getting all book activities:",
            error
        );

        return [];
    }
}


/* ============================================================
   8. GET ALL STUDENTS
   ============================================================ */

/**
 * Get all registered students.
 *
 * This should be used by the Owner/Admin dashboard.
 */

async function getAllStudents() {

    try {

        const snapshot = await db
            .collection("students")
            .get();

        const students = [];

        snapshot.forEach((doc) => {

            students.push({

                id: doc.id,

                ...doc.data()

            });

        });

        return students;

    } catch (error) {

        console.error(
            "Error getting students:",
            error
        );

        return [];
    }
}


/* ============================================================
   9. STUDENT BOOK REPORT
   ============================================================ */

/**
 * Returns a simple report for one student.
 */

async function getStudentBookReport(studentId) {

    try {

        const activities =
            await getStudentBookActivity(studentId);

        const issuedBooks =
            activities.filter(
                item => item.action === "issued"
            );

        const returnedBooks =
            activities.filter(
                item => item.action === "returned"
            );

        return {

            totalIssued: issuedBooks.length,

            totalReturned: returnedBooks.length,

            activities: activities

        };

    } catch (error) {

        console.error(
            "Error creating student report:",
            error
        );

        return {

            totalIssued: 0,

            totalReturned: 0,

            activities: []

        };
    }
}

