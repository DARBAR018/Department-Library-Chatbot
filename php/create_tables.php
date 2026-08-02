<?php
include("db.php");

// Create OTP table
$sql = "CREATE TABLE IF NOT EXISTS otp_verification (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    otp VARCHAR(6) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo "OTP table created successfully.";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>