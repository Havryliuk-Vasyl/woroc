<?php
$servername = "localhost";
$username = "root";
$password = "!Vasia2006";
$database = "woroc"; 

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Підключення не вдалося: " . $conn->connect_error);
}