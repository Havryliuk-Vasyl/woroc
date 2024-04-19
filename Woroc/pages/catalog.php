<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Woroc. Каталог</title>
    <link rel="stylesheet" href="../assets/css/catalog.css">
    <link rel="shortcut icon" href="../assets/images/Woroc-Logo.png">
    <script src="../assets/scripts/catalog.js"></script>
</head>
<body>
    <?php
    include("../templates/header.php");
    ?>
    <div class="main">
        <div class="filters-and-search">
            <form action="#" method="GET">
                <div class="filter-section">
                    <label for="price">Назва програвача:</label>
                    <input type="text" id="name" placeholder="Назва програвача">
                </div> 
                <div class="filter-section">
                    <label for="price">Ціна (до):</label>
                    <input type="number" id="price" name="price" min="0" placeholder="Максимальна ціна">
                </div>
                <div class="filter-section">
                    <label for="speed">Швидкість обертання:</label>
                    <select id="speed" name="speed">
                        <option value="all">Всі</option>
                        <option value="33">33 1/3 об/хв</option>
                        <option value="45">45 об/хв</option>
                        <option value="78">78 об/хв</option>
                    </select>
                </div>
                <div class="filter-section">
                    <label for="glasssupportdics">Підтримка для скла:</label>
                    <select id="glasssupportdics" name="glasssupportdics">
                        <option value="all">Всі</option>
                        <option value="300">300</option>
                        <option value="200">200</option>
                        <option value="100">100</option>
                    </select>
                </div>
                <button id="apply-filters">Застосувати фільтри</button>
            </form>
        </div>
        <div class="products">
        </div>
    </div>

    
    <?php
    include("../templates/footer.php");
    ?>
</body>
</html>
