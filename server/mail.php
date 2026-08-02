<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . "/../PHPMailer/Exception.php";
require_once __DIR__ . "/../PHPMailer/PHPMailer.php";
require_once __DIR__ . "/../PHPMailer/SMTP.php";

function getMailer()
{
    $mail = new PHPMailer(true);

    $mail->isSMTP();

    $mail->Host = "smtp.gmail.com";
    $mail->SMTPAuth = true;

    // Your Gmail
    $mail->Username = getenv("MAIL_USERNAME");

    // Gmail App Password
    $mail->Password = getenv("MAIL_PASSWORD");

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom(
        "departmentlibrary.ai@gmail.com",
        "Department Library"
    );

    $mail->isHTML(true);

    return $mail;
}