<?php
session_start();

header("Content-Type: application/json");

$email = $_POST['email'] ?? '';
$otp   = $_POST['otp'] ?? '';

if (empty($email) || empty($otp)) {
    echo json_encode([
        "success" => false,
        "message" => "Email and OTP are required."
    ]);
    exit;
}

if (!isset($_SESSION['otp']) || !isset($_SESSION['otp_email'])) {
    echo json_encode([
        "success" => false,
        "message" => "No OTP found. Please click Send OTP first."
    ]);
    exit;
}

if ($_SESSION['otp_email'] !== $email) {
    echo json_encode([
        "success" => false,
        "message" => "Email does not match."
    ]);
    exit;
}

if ($_SESSION['otp'] != $otp) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid OTP."
    ]);
    exit;
}

// OTP verified successfully
unset($_SESSION['otp']);
unset($_SESSION['otp_email']);

echo json_encode([
    "success" => true,
    "message" => "OTP verified successfully."
]);