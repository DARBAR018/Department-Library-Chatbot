<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../PHPMailer/Exception.php';
require '../PHPMailer/PHPMailer.php';
require '../PHPMailer/SMTP.php';

function sendOTP($toEmail, $otp)
{
    $mail = new PHPMailer(true);

    try {
        // SMTP Settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;

        // CHANGE THESE
        $mail->Username = 'departmentlibrary.ai@gmail.com';
        $mail->Password = 'qflc uhhd pmaj bcib';

        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Sender
        $mail->setFrom('departmentlibrary.ai@gmail.com', 'Department Library');

        // Receiver
        $mail->addAddress($toEmail);

        // Email Content
        $mail->isHTML(true);
        $mail->Subject = 'Department Library - OTP Verification';

        $mail->Body = "
            <h2>Department Library</h2>
            <p>Your OTP is:</p>
            <h1 style='color:blue;'>$otp</h1>
            <p>This OTP is valid for 5 minutes.</p>
        ";

        $mail->send();
        return true;

    } catch (Exception $e) {
        return false;
    }
}
?>