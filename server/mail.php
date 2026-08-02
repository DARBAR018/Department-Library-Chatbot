<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php';

function getMailer()
{
    $mail = new PHPMailer(true);

    $mail->isSMTP();

    $mail->Host = "smtp.gmail.com";

    $mail->SMTPAuth = true;

    $mail->Username = "departmentlibrary.ai@gmail.com";

    $mail->Password = "qflcuhhdpmajbcib";

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

    $mail->Port = 587;

    $mail->setFrom(
        "departmentlibrary.ai@gmail.com",
        "Department Library"
    );

    $mail->isHTML(true);

    return $mail;
}