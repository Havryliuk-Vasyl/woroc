document.addEventListener('DOMContentLoaded', function () {
    console.log("OK!");

    const menuToggle = document.getElementById('mobile-menu');
    const menu = document.querySelector('.menu');
    const products = document.querySelector(".products");

    menuToggle.addEventListener('click', function () {
        menu.classList.toggle('show');
    });

    var phpScriptPath = '../assets/database/selectProducts.php';

    var xhr = new XMLHttpRequest();

    xhr.open("POST", phpScriptPath, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                console.log(data);

                displayProducts(data, products);

                const addToCartButtons = document.querySelectorAll('.playvinil-addtobasket');
                addToCartButtons.forEach(button => {
                    button.addEventListener('click', function (event) {
                        addToCart(event, data);
                    });
                });

                const goToProductPage = document.querySelectorAll('.playvinil-container');
                goToProductPage.forEach(button => {
                    button.addEventListener('click', function (event) {
                        goToProduct(event, data);
                    });
                });

                const playVinils = document.querySelectorAll(".playvinil");
                playVinils.forEach(function (playVinil) {
                    var screenWidth = window.innerWidth;
                    if (screenWidth > 1024) {
                        playVinil.addEventListener("mouseover", function () {
                            var addToBasket = playVinil.querySelector(".playvinil-addtobasket");
                            addToBasket.style.visibility = 'visible';
                        });

                        playVinil.addEventListener("mouseout", function () {
                            var addToBasket = playVinil.querySelector(".playvinil-addtobasket");
                            addToBasket.style.visibility = 'hidden';
                        });
                    }
                });
            } else {
                console.error("Request failed:", xhr.status);
            }
        }
    };

    xhr.send();
});

function addToCart(event, dataArr) {
    const productContainer = event.currentTarget;
    const productID = productContainer.id;

    console.log(productContainer);
    console.log(productID);

    const productId = dataArr[productID - 1].id;
    const productName = dataArr[productID - 1].name;
    const productPrice = dataArr[productID - 1].price;
    const productImage = dataArr[productID - 1].photo_path;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
    });

    localStorage.setItem('cart', JSON.stringify(cart));

    alert(dataArr[productID - 1].name + " був доданий до кошика!");
}

function goToProduct(event, dataArr) {
    const productContainer = event.currentTarget;
    const productName = productContainer.querySelector('.playvinil-name').innerText;

    localStorage.removeItem('productPage');
    let productPage = JSON.parse(localStorage.getItem('productPage')) || [];

    for (let i = 0; i < dataArr.length; i++) {
        console.log(dataArr[i]);
        console.log(productName);
        if (dataArr[i].name === productName) {
            productPage.push({
                id: dataArr[i].id
            })
            break;
        }
    }
    localStorage.setItem('productPage', JSON.stringify(productPage));

    console.log(productPage[0].id);
    window.location.href = 'product.php';
}

function displayProducts(dataArr, products) {
    products.innerHTML = '';

    dataArr.forEach(item => {
        const productItem = createProductItemElement(item);
        products.appendChild(productItem);
    });
}

function createProductItemElement(item) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('playvinil');
    cartItem.setAttribute('id', item.id);
    cartItem.innerHTML = `
        <div class="playvinil-container">
            <div class="playvinil-photo"><img src="../assets/images/${item.photo_path}" alt="w" style="width: 10em; height: 10em;"></div>
            <div class="playvinil-name">${item.name}</div>
            <div class="playvinil-price">${item.price} ГРН.</div>
        </div>
        <div class="playvinil-addtobasket" id="${item.id}">Додати у кошик</div>`;
    return cartItem;
}
