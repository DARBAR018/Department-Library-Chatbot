CREATE TABLE book_reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    enrollment_no VARCHAR(30) NOT NULL,
    book_title VARCHAR(150) NOT NULL,
    author_name VARCHAR(100),
    reserve_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Pending','Approved','Rejected') DEFAULT 'Pending'
);
