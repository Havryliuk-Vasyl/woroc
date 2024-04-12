<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include("db.php");
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $price = isset($request->price) ? $request->price : null;
    $speed = isset($request->speed) ? $request->speed : null;
    $glasssupportdics = isset($request->glasssupportdics) ? $request->glasssupportdics : null;

    $sql = "SELECT p.id, p.name, p.price, ph.photo_path FROM products p 
            JOIN photos ph ON p.id = ph.product_id 
            JOIN products_description pd ON p.id = pd.product_id";

    $whereClause = "";
    if ($price !== null && $price > 0) {
        $whereClause .= " AND p.price <= ?";
    }

    if ($speed !== null && $speed != "all") {
        $whereClause .= " AND pd.electronicspeedchange = ?";
    }

    if($glasssupportdics !== null && $glasssupportdics != "all"){
        $whereClause .= " AND pd.glasssupportdics = ?";
    }

    if ($whereClause) {
        $sql .= " WHERE 1=1" . $whereClause;
    }

    $sql .= " GROUP BY p.id, p.name, p.price";

    // Використання підготовленого запиту
    $stmt = $conn->prepare($sql);

    // Перевірка наявності помилок у підготовленому запиті
    if (!$stmt) {
        die("Error in prepared statement: " . $conn->error);
    }

    // Підготовка і виконання запиту з параметрами
    if ($stmt) {
        if ($price !== null && $price > 0) {
            $stmt->bind_param("i", $price); // "i" означає, що передається ціле число
        }
        if ($speed !== null && $speed != "all") {
            $stmt->bind_param("i", $speed);
        }
        if ($glasssupportdics !== null && $glasssupportdics != "all"){
            $stmt->bind_param("i", $glasssupportdics);
        }

        $stmt->execute();
        $result = $stmt->get_result();

        // Отримання даних з результату запиту
        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        // Кодування даних у формат JSON
        $json_data = json_encode($data);

        // Виведення даних
        echo $json_data;

        // Закриття підключення до бази даних
        $stmt->close();
    } else {
        // Обробка помилки підготовленого запиту
        echo "Error in prepared statement";
    }

    $conn->close();
}
