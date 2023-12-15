document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('mobile-menu');
    const menu = document.querySelector('.menu');
    const playVinils = document.querySelectorAll(".playvinil");

    menuToggle.addEventListener('click', function () {
        menu.classList.toggle('show');
    });

    playVinils.forEach(function(playVinil) {
        var screenWidth = window.innerWidth;
        if (screenWidth > 1024){
            playVinil.addEventListener("mouseover", function() {
                var addToBasket = playVinil.querySelector(".playvinil-addtobasket");
                addToBasket.style.visibility = 'visible';
            });

            playVinil.addEventListener("mouseout", function() {
                var addToBasket = playVinil.querySelector(".playvinil-addtobasket");
                addToBasket.style.visibility = 'hidden';
            });
        }
    });

    const addToCartButtons = document.querySelectorAll('.playvinil-addtobasket');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            addToCart(event);
        });
    });

    const goToProductPage = document.querySelectorAll('.playvinil-container');
    goToProductPage.forEach(button => {
        button.addEventListener('click', function(event){
            goToProduct(event);
        });
    });

});


function addToCart(event) {
    const productContainer = event.target.parentElement;
    const productId = productContainer.dataset.id;
    const productName = productContainer.querySelector('.playvinil-name').innerText;
    const productPrice = parseFloat(productContainer.querySelector('.playvinil-price').innerText);
    const productImage = productContainer.querySelector('.playvinil-photo img').src;
    
    // Отримання або створення кошика в локальному сховищі
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Перевірка, чи товар вже є в кошику
    const existingItem = cart.find(item => item.id === productId);

    // Додавання нового товару до кошика
    cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
    });

    // Вивід інформації про товар в консоль для перевірки
    
    console.log(`${productId}`);
    console.log(`${productName}`);
    console.log(`${productPrice}`);
    console.log(`${productImage}`);

    // Збереження оновленого кошика в локальному сховищі
    localStorage.setItem('cart', JSON.stringify(cart));

    // Оповіщення користувача про додавання товару
    alert(`Товар "${productName}" додано в кошик.`);
}

function goToProduct(event) {
    const productContainer = event.currentTarget;
    const productId = productContainer.dataset.id;
    const productName = productContainer.querySelector('.playvinil-name').innerText;
    const productPrice = parseFloat(productContainer.querySelector('.playvinil-price').innerText);
    const productImage = productContainer.querySelector('.playvinil-photo img').src;

    // Збереження даних на сторінці товару в локальному сховищі
    localStorage.removeItem('productPage');
    let productPage = JSON.parse(localStorage.getItem('productPage')) || [];
    productPage.push({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,    // Використовуємо правильну змінну
    });

    localStorage.setItem('productPage', JSON.stringify(productPage));

    // Перехід на сторінку товару
    window.location.href = 'pages/product.html';
}
