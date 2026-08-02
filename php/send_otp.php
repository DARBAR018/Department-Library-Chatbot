<?php
session_start();

require 'mail.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $email = trim($_POST["email"]);

    // Generate 6-digit OTP
    $otp = rand(100000, 999999);

    // Store OTP in session
    $_SESSION['otp'] = $otp;
    $_SESSION['otp_email'] = $email;
    $_SESSION['otp_time'] = time();

    if (sendOTP($email, $otp)) {
        echo "success";
    } else {
        echo "failed";
    }
}
?>