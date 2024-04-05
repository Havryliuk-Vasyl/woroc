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
    <header>
        <div class="logo">
            <a href="../index.php"><img src="../assets/images/Woroc-Logo.png" alt="Vinyl record Woroc." style="max-width: 100px; max-height: 60px;"></a>
        </div>
        <div class="menu-toggle" id="mobile-menu">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="menu">
            <div class="navigation">    
                <ul>
                    <li><a href="../index.php">Головна</a></li>
                    <li><a href="catalog.php">Каталог</a></li>
                    <li><a href="cart.php">Кошик</a></li>
                </ul>
            </div>
        </div>
    </header>

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

    <footer class="footer">
        <div class="footertop">
            <div class="container">
                <div class="firstsection">
                    <a href="../index.html" class="footerlogo"><img src="../assets/images/Woroc-Logo.png" alt="Vinyl record Woroc." style="max-width: 100px; max-height: 60px;"></a>
                    <div class="colitems">
                        <div class="sub-title"><b>Адреса</b></div>
                        <div class="col-item">Україна, м. Чернівці, вул. Глибоцька 2а</div>
                        <div class="sub-title "><b>Розробник</b></div>
                        <div class="col-item">Гаврилюк Василь&#169</div>
                        <div class="sub-title"><b>E-mail</b></div>
                        <div class="col-item"><a href="#">flamermanofficial@gmail.com</a></div>
                    </div>
                </div>
                <div class="centersection">                        
                    <div class="footerlogo"><a href="#"><img src="../assets/images/Woroc-Logo.png" alt="Vinyl record Woroc." style="max-width: 100px; max-height: 60px;"></a></div>
                    <div class="colitems">
                        <div class="col-item"><a href="../index.php">Головна</a></div>
                        <div class="col-item"><a href="catalog.php">Каталог</a></div>
                        <div class="col-item"><a href="cart.php">Кошик</a></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footerbottom">

        </div>
    </footer>
</body>
</html>
