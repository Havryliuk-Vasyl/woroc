<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include("db.php");
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $name = isset($request->name) ? $request->name : null;
    $price = isset($request->price) ? $request->price : null;
    $speed = isset($request->speed) ? $request->speed : null;
    $glasssupportdics = isset($request->glasssupportdics) ? $request->glasssupportdics : null;

    $sql = "SELECT p.id, p.name, p.price, ph.photo_path, COALESCE(d.discount, 0) AS discount
        FROM products p 
        JOIN photos ph ON p.id = ph.product_id 
        JOIN products_description pd ON p.id = pd.product_id
        LEFT JOIN discount d ON p.id = d.product_id";

    $whereClause = "";

    if ($name !== null && $name !== ""){
        $whereClause .= " AND p.name LIKE ?";
        $nameParam = "%" . $name . "%";
    }

    if ($price !== null && $price > 0) {
        $whereClause .= " AND p.price <= ?";
        $priceParam = $price;
    }

    if ($speed !== null && $speed != "all") {
        $whereClause .= " AND pd.electronicspeedchange = ?";
        $speedParam = $speed;
    }

    if($glasssupportdics !== null && $glasssupportdics != "all"){
        $whereClause .= " AND pd.glasssupportdics = ?";
        $glassParam = $glasssupportdics;
    }

    if ($whereClause) {
        $sql .= " WHERE 1=1" . $whereClause;
    }

    $sql .= " GROUP BY p.id, p.name, p.price";

    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        die("Error in prepared statement: " . $conn->error);
    }

    if ($stmt) {
        // Зв'язування параметрів
        if (isset($nameParam)) {
            $stmt->bind_param("s", $nameParam);
        }
        if (isset($priceParam)) {
            $stmt->bind_param("i", $priceParam);
        }
        if (isset($speedParam)) {
            $stmt->bind_param("i", $speedParam);
        }
        if (isset($glassParam)) {
            $stmt->bind_param("i", $glassParam);
        }

        $stmt->execute();
        $result = $stmt->get_result();

        $data = array();
        while ($row = $result->fetch_assoc()) {
            $row['discount'] = (int)$row['discount'];
            $data[] = $row;
        }
        
        $json_data = json_encode($data);
        
        echo $json_data;
        
        $stmt->close();
    } else {
        echo "Error in prepared statement";
    }

    $conn->close();
}