document.addEventListener('DOMContentLoaded', function () {
    const productPage = JSON.parse(localStorage.getItem('productPage')) || [];
    const productContainer = document.getElementById('products');

    var phpScriptPath = '../assets/database/selectProduct.php';

    var xhr = new XMLHttpRequest();

    xhr.open("GET", phpScriptPath + "?id=" + productPage[0].id, true);

    xhr.onreadystatechange = function() {
        console.log("OK");
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                var data = JSON.parse(xhr.responseText);
                console.log(data);
                renderProductPage(data);
            } else {
                console.error("Request failed:", xhr.status);
            }
        }
    }

    console.log(productPage[0].id);
    xhr.send(productPage[0].id);

    function renderProductPage(data) {
        productContainer.innerHTML = '';
        const productDiv = document.createElement('div');
        productDiv.classList.add('playvinil');
        let productHTML = '';
        
        const photoPaths = data.photo_paths.split(',');

        productHTML += `
            <div class="playvinil-photos">
        `;
        photoPaths.forEach(photoPath => {
            productHTML += `
                <div class="playvinil-photo">
                    <img class="photo" src="../assets/images/${photoPath}" alt="${data.name}" style="max-width: 15em; max-height: 20em;">
                </div>
            `;
        });
        productHTML += `
            </div>
            <div class="playvinil-infomation">
                <div class="playvinil-name"><h2>${data.name}<h2></div>
                <div class="playvinil-price"><b>${data.price} ГРН. </b></div>
                <div class="playvinil-describe">${data.description}</div>
                <table class="infdot">
                    <tbody>
                        <tr>
                            <td class="firstfield">Тип:</td>
                            <td class="secondfield">${data.type}</td>
                        </tr>
                        <tr>
                            <td class="firstfield">Модель:</td>
                            <td class="secondfield">${data.model}</td>
                        </tr>
                        <tr>
                            <td class="firstfield">Скляний опорний диск:</td>
                            <td class="secondfield">${data.glasssupportdics} мм</td>
                        </tr>
                        <tr>
                            <td class="firstfield">Швидкість:</td>
                            <td class="secondfield">${data.electronicspeedchange} об</td>
                        </tr>
                        <tr>
                            <td class="firstfield">Bluetooth:</td>
                            <td class="secondfield">${data.bluetooth}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="playvinil-addtobasket">Додати у кошик</div>
            </div>
        `;
        
        productDiv.innerHTML = productHTML;
        
        productContainer.appendChild(productDiv);
        const addToCartButton = productDiv.querySelector('.playvinil-addtobasket');
        addToCartButton.addEventListener('click', function (event) {
            addToCart(event, data.id, data.name, data.price, photoPaths[0]);
        });                
    }
});

function addToCart(event, id, name, price, photoPath) {
    const productId = id;
    const productName = name;
    const productPrice = price;
    const productImage = photoPath;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(item => item.id === productId);

    cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
    });

    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`Товар "${productName}" додано в кошик.`);
}