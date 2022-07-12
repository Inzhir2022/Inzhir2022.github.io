<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$email = $_POST['email'];
$text = $_POST['text'];


// Формирование самого письма
$title = "Заголовок письма";
$body = "
<h2>Новое письмо</h2>
<b>Имя:</b> $name<br>
<b>Почта:</b> $email<br><br>
<b>Сообщение:</b><br>$text
";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    $mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false, //Проверка используемого SSL-сертификата
            'verify_peer_name' => false, //Проверка имени узла
            'allow_self_signed' => true //Разрешение на самоподписанные сертификаты
        )
    );


    // Настройки вашей почты
    $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
    $mail->Username   = 'inzhir91@gmail.com'; // Логин на почте
    $mail->Password   = 'mvpunmjsvnglmqtq'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('inzhir91@gmail.com', 'Inzhir'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('inzhevatkinaip@gmail.com');  
    $mail->addAddress('youremail@gmail.com'); // Ещё один, если нужен


// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
if($result=="success") {
  echo "<p class='successSend'>Ваше сообщение успешно отправлено!</p>
  <br>
  <a href='/CV' class='successSendLink'> Вернуться на главную страницу</a>
  ";
} else {
  echo "<p class='failSend'>При отправке данных возникли сложности. Пожалуйста, повторите попытку позже</p>";
}
