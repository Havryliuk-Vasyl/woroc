<?php
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $servername = "localhost";
    $username = "root";
    $password = "!Vasia2006";
    $database = "woroc"; 

    if (!isset($_GET['id'])) {
        http_response_code(400);
        exit();
    }

    $productID = $_GET['id'];

    $conn = new mysqli($servername, $username, $password, $database);

    if ($conn->connect_error) {
        die("Підключення не вдалося: " . $conn->connect_error);
    }

    $sql = "SELECT p.id, p.name, p.price, GROUP_CONCAT(ph.photo_path) AS photo_paths, pd.description, pd.type, pd.model, pd.glasssupportdics, pd.electronicspeedchange, pd.bluetooth 
        FROM products p 
        JOIN photos ph ON p.id = ph.product_id 
        JOIN products_description pd ON p.id = pd.product_id
        WHERE p.id = ?;
    ";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $productID);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $data = $result->fetch_assoc();
        echo json_encode($data);
    } else {
        http_response_code(404); 
    }

    $stmt->close();
    $conn->close();
} else {
    http_response_code(405);
}