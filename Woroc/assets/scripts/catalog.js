document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('mobile-menu');
    const menu = document.querySelector('.menu');
    const products = document.querySelector(".products");

    menuToggle.addEventListener('click', function () {
        menu.classList.toggle('show');
    });
    
    var jsonFilePath = '../data/data.json';
    var dataArr;

    fetch(jsonFilePath)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        dataArr = data;  // Оновлено зчитування даних
        displayProducts(dataArr, products);

        
        const addToCartButtons = document.querySelectorAll('.playvinil-addtobasket');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function (event) {
                addToCart(event, dataArr);
            });
        });
    
        const goToProductPage = document.querySelectorAll('.playvinil-container');
        goToProductPage.forEach(    button => {
            button.addEventListener('click', function(event){
                goToProduct(event, dataArr);
            });
        });

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
    })
    .catch(error => console.error('There has been a problem with your fetch operation:', error));
});

function addToCart(event, dataArr) {
    const productContainer = event.currentTarget; 
    const productID = productContainer.id;
    
    console.log(productContainer);
    console.log(productID);

    const productId = dataArr[productID-1].id;
    const productName = dataArr[productID-1].name;
    const productPrice = dataArr[productID-1].price;
    const productImage = dataArr[productID-1].images[0];

    // Отримання або створення кошика в локальному сховищі
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
    });

    // Збереження оновленого кошика в локальному сховищі
    localStorage.setItem('cart', JSON.stringify(cart));

    // Оповіщення користувача про додавання товару
    alert(dataArr[productID-1].name + " був доданий до кошика!");
}

function goToProduct(event, dataArr){
    const productContainer = event.currentTarget; 
    const productName = productContainer.querySelector('.playvinil-name').innerText;
    localStorage.removeItem('productPage');
    let productPage = JSON.parse(localStorage.getItem('productPage')) || [];

    for (i = 0; i < dataArr.length; i++)
    {
        if (dataArr[i].name === productName)
        {
            console.log(dataArr[i].id);
            productPage.push({
                dataID: dataArr[i].id
            })
        }
    }
    localStorage.setItem('productPage', JSON.stringify(productPage));

    window.location.href = 'product.html';
}

// Функція для виведення товарів у кошику
function displayProducts(dataArr, products) {
    // Очищення контейнера перед виведенням нових товарів
    products.innerHTML = '';

    // Виведення кожного товару в кошику
    dataArr.forEach(item => {
        const productItem = createProductItemElement(item);
        products.appendChild(productItem);
    });
}

// Функція для створення DOM-елементу товару в кошику
function createProductItemElement(item) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('playvinil');
    cartItem.setAttribute('id', item.id);
    cartItem.innerHTML = `
        <div class="playvinil-container">
            <div class="playvinil-photo"><img src="../assets/images/${item.images[0]}" alt="w" style="width: 10em; height: 10em;"></div>
            <div class="playvinil-name">${item.name}</div>
            <div class="playvinil-price">${item.price} ГРН.</div>
        </div>
        <div class="playvinil-addtobasket" id="${item.id}">Додати у кошик</div>`;
    return cartItem;
}