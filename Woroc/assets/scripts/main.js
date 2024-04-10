document.addEventListener('DOMContentLoaded', function () {
    const playVinils = document.querySelectorAll(".playvinil");

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
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(item => item.id === productId);

    cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
    });
    
    console.log(`${productId}`);
    console.log(`${productName}`);
    console.log(`${productPrice}`);
    console.log(`${productImage}`);

    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`Товар "${productName}" додано в кошик.`);
}

function goToProduct(event) {
    const productContainer = event.currentTarget;
    const productId = productContainer.dataset.id;
    const productName = productContainer.querySelector('.playvinil-name').innerText;
    const productPrice = parseFloat(productContainer.querySelector('.playvinil-price').innerText);
    const productImage = productContainer.querySelector('.playvinil-photo img').src;

    localStorage.removeItem('productPage');
    let productPage = JSON.parse(localStorage.getItem('productPage')) || [];
    productPage.push({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
    });

    localStorage.setItem('productPage', JSON.stringify(productPage));

    window.location.href = 'pages/product.html';
}
