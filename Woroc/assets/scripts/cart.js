document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('mobile-menu');
    const menu = document.querySelector('.menu');
    const cartContainer = document.getElementById('products');
    const cartPriceAndBuying = document.getElementById('priceandbuying');

    menuToggle.addEventListener('click', function () {
        menu.classList.toggle('show');
    });

    // Отримайте вміст кошика з локального сховища
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Додайте обробник подій для кнопок видалення
    cartContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('product-delete')) {
            // Отримайте індекс товару, який потрібно видалити
            const indexToRemove = event.target.dataset.index;

            // Видаліть товар з кошика
            cart.splice(indexToRemove, 1);

            // Оновіть кошик в локальному сховищі
            localStorage.setItem('cart', JSON.stringify(cart));

            // Оновіть відображення кошика
            renderCart();
        }
    });

    // Оновіть відображення кошика
    renderCart();

    // Додайте обробник подій для кліку на всім контейнері .products

    function renderCart() {
        // Очистіть поточний вміст кошика
        cartContainer.innerHTML = '';
        cartPriceAndBuying.innerHTML = ''; // Clear previous content

        // Ініціалізуйте загальну суму
        let totalSum = 0;

        // Відобразіть кожен товар у кошику
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('product');
            console.log(item.image);
            cartItem.innerHTML = `
                <div class="product-container" id="${item.id}">
                    <div class="product-photo"><img src="../assets/images/${item.image}" alt="w" style="width: 10em; height: 10em;"></div>
                    <div class="product-name">${item.name}</div>
                    <div class="product-price">${item.price} ГРН.</div>
                </div>
                <div class="product-delete" data-index="${index}">Видалити з кошика</div>
            `;
            cartContainer.appendChild(cartItem);

            // Додайте ціну товару до загальної суми
            totalSum += item.price;
            
            
        });

        const goToProductPage = document.querySelectorAll('.product-container');
        goToProductPage.forEach(button => {
            button.addEventListener('click', function(event) {
                goToProduct(event);
            });
        });
        // Відобразіть загальну суму
        const totalSumElement = document.createElement('div');
        totalSumElement.classList.add('price');
        totalSumElement.textContent = `Загальна сума: ${totalSum} ГРН.`;
        cartPriceAndBuying.appendChild(totalSumElement);

        const buyButton = document.createElement('div');
        buyButton.classList.add('buy');
        buyButton.addEventListener('click', function () {
            placeOrder();
            renderCart();
        });

        buyButton.textContent = 'Замовити';
        cartPriceAndBuying.appendChild(buyButton);
    }
});

function goToProduct(event) {
    console.log("clicked");
    const productContainer = event.currentTarget; 
    const productID = productContainer.id;
    
    console.log(productContainer);
    console.log(productID);

    localStorage.removeItem('productPage');
    let productPage = JSON.parse(localStorage.getItem('productPage')) || [];

    productPage.push({
        dataID: productID
    });

    localStorage.setItem('productPage', JSON.stringify(productPage));

    window.location.href = 'product.html';
}

function placeOrder() {
    // Отримайте дані для замовлення (номер телефону, електронна пошта, спосіб оплати і т.д.)
    const name = document.querySelector('input[name="name"]').value;
    const phoneNumber = document.querySelector('input[name="phone-number"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').id;


    // Отримайте вміст кошика з локального сховища
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Ваша логіка для створення тіла листа і надсилання даних на сервер
    const orderDetails = {
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        paymentMethod: paymentMethod,
        cart: cart,
    };

    // Відправте лист електронної пошти
    sendEmail(orderDetails);

    // Очистіть кошик після замовлення (можете додати цю функціональність)
    localStorage.removeItem('cart');

    // Тут ви можете відобразити повідомлення про успішне замовлення або перенаправити користувача на сторінку "Дякуємо за замовлення"
}

emailjs.init('VbHzrd4cESv1KGWL9');

function sendEmail(orderDetails) {
    // Prepare the email template parameters
    const templateParams = {
        to_email: orderDetails.email, // Замініть на введений електронний лист користувача
        from_name: 'Woroc.',  // Замініть на ваше ім'я
        subject: 'Підтвердження замовлення',
        message: `${orderDetails.name}, дякуємо за ваше замовлення. Номер телефону: ${orderDetails.phoneNumber}. Email: ${orderDetails.email} Спосіб оплати: ${orderDetails.paymentMethod}. Деталі замовлення: ${JSON.stringify(orderDetails.cart)}`,
    };

    // Send the email
    emailjs.send('woroc', 'template_2hq05ma', templateParams)
        .then(function(response) {
            console.log('Email sent successfully:', response);
            alert("Вам був відправлений email лист!");
        })
        .catch(function(error) {
            console.error('Email failed to send:', error);
        });
}
