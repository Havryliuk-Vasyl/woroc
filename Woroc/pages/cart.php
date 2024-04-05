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

    <div class="main">
            <div class="products" id="products">
                <!-- <div class="product" id="playVinilID">
                    <div class="product-container">
                        <div class="product-photo"><img src="../assets/images/vinil3.png" alt="w" style="width: 10em; height: 10em;"></div>
                        <div class="product-name">Вініловий програвач</div>
                        <div class="product-price"><b>100 ГРН.</b></div>
                    </div>
                    <div class="product-delete"><b>Видалити з кошика</b></div>
                </div> -->
                
            </div>
                <form action="" class="form">
                        <div class="name">
                            <div><label>Ваше ім'я:</label></div>
                            <div><input type="text" name="name"></div>
                        </div>
                        <div class="phone-number">
                            <div><label>Номер телeфону:</label></div>
                            <div><input type="text" name="phone-number"></div>
                        </div>
                        <div class="email">
                            <div><label>Email:</label></div>
                            <div><input type="text" name="email"></div>
                        </div>
                        <div class="payment">
                            <div>
                                <input type="radio" id="cash" name="payment" checked>
                                <label for="cash">Готівка</label>
                            </div>
                            <div>
                                <input type="radio" id="card" name="payment">
                                <label for="card">Карта</label>
                            </div>
                        </div>
                    </form>
            <div class="priceandbuying" id="priceandbuying">
                <!-- <div class="price">Загальна сума:</div>
                <div class="buy" id="buyBtn"></div> -->
            </div>
    </div>

    <?php
    include("../templates/footer.php");
    ?>
</body>
</html>
