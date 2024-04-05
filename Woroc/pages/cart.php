<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Woroc. Кошик</title>
    <link rel="stylesheet" href="../assets/css/cart.css">
    <link rel="shortcut icon" href="../assets/images/Woroc-Logo.png">
    <script src="https://cdn.emailjs.com/dist/email.min.js"></script>
    <script src="../assets/scripts/cart.js"></script>
</head>
<body>
    <?php
    include("../templates/header.php");
    ?>

    <div class="main" id="main">
        <div class="products" id="products">
        </div>
        <form action="" class="form" id="formContainer">
            
        </form>
        <div class="priceandbuying" id="priceandbuying">
        </div>
    </div>

    <?php
    include("../templates/footer.php");
    ?>
</body>
</html>
