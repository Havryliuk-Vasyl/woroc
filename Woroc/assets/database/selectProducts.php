<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include("db.php");

    $sql = "SELECT p.id, p.name, p.price, ph.photo_path FROM products p join photos ph on p.id = ph.product_id
        GROUP BY p.id, p.name, p.price;";
    $result = $conn->query($sql);
    
    $data = array();
    
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }
    
    echo json_encode($data);
    
    $conn->close();
    }