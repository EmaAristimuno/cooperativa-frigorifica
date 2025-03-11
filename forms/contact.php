<?php


// Replace contact@example.com with your real receiving email address
$receiving_email_address = 'info@cotef.com.ar'; // Cambia esto a tu email

// Valores para la copia (CC)
$cc_email = ''; // Opcional: para recibir una copia del mensaje

// Log de los mensajes recibidos
$log_file = '../logs/contact_form_log.txt';
$log_directory = dirname($log_file);

// Asegurarse de que el directorio de logs exista
if (!file_exists($log_directory)) {
  mkdir($log_directory, 0755, true);
}

// Validación del lado del servidor
$errors = array();

// Validar email
if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
  $errors[] = "Email inválido";
}

// Validar que el nombre no esté vacío
if (empty($_POST['name'])) {
  $errors[] = "El nombre es requerido";
}

// Validar que el mensaje tenga al menos 10 caracteres
if (strlen($_POST['message']) < 10) {
  $errors[] = "El mensaje debe tener al menos 10 caracteres";
}

// Si hay errores, terminar
if (!empty($errors)) {
  echo implode(", ", $errors);
  die();
}

// Comprobar si existe la biblioteca PHP Email Form
if (file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php')) {
  include($php_email_form);
} else {
  die('Unable to load the "PHP Email Form" Library!');
}

$contact = new PHP_Email_Form;
$contact->ajax = true;

$contact->to = $receiving_email_address;
$contact->cc = $cc_email; // Agregar copia
$contact->from_name = $_POST['name'];
$contact->from_email = $_POST['email'];
$contact->subject = $_POST['subject'];

// Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
/*
$contact->smtp = array(
  'host' => 'example.com',
  'username' => 'example',
  'password' => 'pass',
  'port' => '587'
);
*/

// Agregar todos los campos al mensaje
$contact->add_message($_POST['name'], 'Nombre');
$contact->add_message($_POST['email'], 'Email');

// Agregar teléfono si está presente
if (isset($_POST['phone']) && !empty($_POST['phone'])) {
  $contact->add_message($_POST['phone'], 'Teléfono');
}

$contact->add_message($_POST['message'], 'Mensaje', 10);

// Añadir fecha y hora de recepción
$date = new DateTime();
$contact->add_message($date->format('Y-m-d H:i:s'), 'Fecha de envío');

// Registrar en el log
$log_entry = date('Y-m-d H:i:s') . " - Mensaje de: " . $_POST['name'] . " (" . $_POST['email'] . ")\n";
file_put_contents($log_file, $log_entry, FILE_APPEND);

// Información adicional para el log (IP del remitente)
$ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'Unknown';
file_put_contents($log_file, "IP: " . $ip . "\n\n", FILE_APPEND);

// Enviar el formulario
echo $contact->send();

// Opcional: Guardar una copia en la base de datos
/*
if (extension_loaded('mysqli')) {
  $mysqli = new mysqli('localhost', 'user', 'password', 'database');
  
  if (!$mysqli->connect_error) {
    $stmt = $mysqli->prepare("INSERT INTO contact_messages (name, email, subject, message, phone, created_at) VALUES (?, ?, ?, ?, ?, NOW())");
    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
    $stmt->bind_param("sssss", $_POST['name'], $_POST['email'], $_POST['subject'], $_POST['message'], $phone);
    $stmt->execute();
    $stmt->close();
    $mysqli->close();
  }
}
*/
?>