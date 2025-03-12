<?php
// Configuración de cabeceras para respuesta JSON
header('Content-Type: application/json');

// Solo permitir solicitudes POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Configuración de correo - ACTUALIZA ESTOS VALORES
$to_email = "info@cotef.com.ar"; // Cambiar al correo que recibirá los mensajes
$subject = "Nuevo mensaje desde el formulario de contacto COTEF";

// Capturar datos del formulario y sanitizarlos
$name = filter_var($_POST['name'] ?? '', FILTER_SANITIZE_STRING);
$email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
$message_subject = filter_var($_POST['subject'] ?? '', FILTER_SANITIZE_STRING);
$message = filter_var($_POST['message'] ?? '', FILTER_SANITIZE_STRING);

// Validar campos obligatorios
if (empty($name) || empty($email) || empty($message_subject) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'Por favor complete todos los campos requeridos']);
    exit;
}

// Validar formato de email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Por favor ingrese un correo electrónico válido']);
    exit;
}

// Construir el cuerpo del mensaje
$body = "Nombre: $name\n";
$body .= "Email: $email\n";
$body .= "Asunto: $message_subject\n\n";
$body .= "Mensaje:\n$message";

// Configurar cabeceras del correo
$headers = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Intentar enviar el correo
try {
    // Opción 1: Usando la función mail() de PHP
    if (mail($to_email, "$subject: $message_subject", $body, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Su mensaje ha sido enviado. ¡Gracias!']);
    } else {
        throw new Exception("Error al enviar el correo");
    }
    
    /* 
    // Opción 2: Usar PHPMailer (requiere instalación)
    // Descomenta este código si decides usar PHPMailer en lugar de la función mail()
    
    require 'vendor/autoload.php'; // Asegúrate de tener instalado PHPMailer vía Composer
    
    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.hostinger.com'; // Servidor SMTP de Hostinger
    $mail->SMTPAuth = true;
    $mail->Username = 'info@cotef.com.ar'; // Tu correo en Hostinger
    $mail->Password = 'tu_contraseña'; // Tu contraseña
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
    
    $mail->setFrom($email, $name);
    $mail->addAddress($to_email);
    $mail->Subject = "$subject: $message_subject";
    $mail->Body = $body;
    
    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Su mensaje ha sido enviado. ¡Gracias!']);
    */
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Hubo un error al enviar su mensaje. Por favor intente más tarde.']);
    
    // Opcionalmente, registrar el error (comenta esta línea en producción)
    // error_log('Error en formulario de contacto: ' . $e->getMessage());
}
?>