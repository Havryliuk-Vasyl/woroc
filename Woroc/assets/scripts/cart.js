document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('mobile-menu');
    const menu = document.querySelector('.menu');
    const cartContainer = document.getElementById('products');
    const cartPriceAndBuying = document.getElementById('priceandbuying');

    menuToggle.addEventListener('click', function () {
        menu.classList.toggle('show');
    });

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('product-delete')) {

            const indexToRemove = event.target.dataset.index;


            cart.splice(indexToRemove, 1);


            localStorage.setItem('cart', JSON.stringify(cart));

            renderCart();
        }
    });

    renderCart();

    function renderCart() {
        cartContainer.innerHTML = '';
        cartPriceAndBuying.innerHTML = '';

        let totalSum = 0;

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

            totalSum += item.price;
            
            
        });

        const goToProductPage = document.querySelectorAll('.product-container');
        goToProductPage.forEach(button => {
            button.addEventListener('click', function(event) {
                goToProduct(event, cart);
            });
        });

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
    
    localStorage.removeItem('productPage');
    let productPage = JSON.parse(localStorage.getItem('productPage')) || [];

    productPage.push({
        id: productID
    });

    localStorage.setItem('productPage', JSON.stringify(productPage));

    window.location.href = 'product.php';
}

function placeOrder() {
    const name = document.querySelector('input[name="name"]').value;
    const phoneNumber = document.querySelector('input[name="phone-number"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').id;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(cart);
    const orderDetails = {
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        paymentMethod: paymentMethod,
        cart: cart,
    };

    sendEmail(orderDetails);

    localStorage.removeItem('cart');
}

emailjs.init('VbHzrd4cESv1KGWL9');

function sendEmail(orderDetails) {
    const templateParams = {
        to_email: orderDetails.email,
        from_name: 'Woroc.', 
        subject: 'Підтвердження замовлення',
        message: `${orderDetails.name}, дякуємо за ваше замовлення. Номер телефону: ${orderDetails.phoneNumber}. Email: ${orderDetails.email} Спосіб оплати: ${orderDetails.paymentMethod}. Деталі замовлення: ${JSON.stringify(orderDetails.cart)}`,
    };

    emailjs.send('woroc', 'template_2hq05ma', templateParams)
        .then(function(response) {
            console.log('Email sent successfully:', response);
            alert("Вам був відправлений email лист!");
        })
        .catch(function(error) {
            console.error('Email failed to send:', error);
        });
}
