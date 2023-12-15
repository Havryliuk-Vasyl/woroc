document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('mobile-menu');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', function () {
        menu.classList.toggle('show');
    });

    // Отримайте вміст кошика з локального сховища
    const productPage = JSON.parse(localStorage.getItem('productPage')) || [];
    const productContainer = document.getElementById('products');

    function renderProductPage() {
        productContainer.innerHTML = '';

        productPage.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('playvinil');

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
                console.log(dataArr[product.dataID-1]);

                // Створюємо змінну для HTML-рядка
                let productHTML = '';

                productHTML += `
                    <div class="playvinil-photos">
                `

                // Додаємо вміст продукту
                for (let i = 0; i < dataArr[product.dataID-1].images.length; i++) {
                    console.log("iteration #" + i);
                    productHTML += `
                        <div class="playvinil-photo">
                            <img class="photo" src="../assets/images/${dataArr[product.dataID-1].images[i]}" alt="${dataArr[product.dataID-1].name}" style="max-width: 15em; max-height: 20em;">
                        </div>
                    `;
                }

                // Додаємо решту вмісту продукту
                productHTML += `
                    </div>
                    <div class="playvinil-infomation">
                        <div class="playvinil-name">${dataArr[product.dataID-1].name}</div>
                        <div class="playvinil-price"><b>${dataArr[product.dataID-1].price} ГРН. </b></div>
                        <div class="playvinil-describe">${dataArr[product.dataID-1].descibe}</div>
                        <table class="infdot">
                            <tbody>
                                <tr>
                                    <td class="firstfield">Тип:</td>
                                    <td class="secondfield">${dataArr[product.dataID-1].type}</td>
                                </tr>
                                <tr>
                                    <td class="firstfield">Модель:</td>
                                    <td class="secondfield">${dataArr[product.dataID-1].model}</td>
                                </tr>
                                <tr>
                                    <td class="firstfield">Скляний опорний диск:</td>
                                    <td class="secondfield">${dataArr[product.dataID-1].glasssupportdics} мм</td>
                                </tr>
                                <tr>
                                    <td class="firstfield">Швидкість:</td>
                                    <td class="secondfield">${dataArr[product.dataID-1].electronicspeedchange} об</td>
                                </tr>
                                <tr>
                                    <td class="firstfield">Bluetooth:</td>
                                    <td class="secondfield">${dataArr[product.dataID-1].bluetooth}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="playvinil-addtobasket">Додати у кошик</div>
                    </div>
                `;

                // Встановлюємо HTML-вміст у productDiv
                productDiv.innerHTML = productHTML;

                // Додаємо productDiv до контейнера продукту
                productContainer.appendChild(productDiv);

                console.log(product.dataID-1);
                const addToCartButton = productDiv.querySelector('.playvinil-addtobasket');
                addToCartButton.addEventListener('click', function (event) {
                    addToCart(event, dataArr, product.dataID-1);
                });                
            });
        });
    }
    // Викликаємо функцію для рендерингу при завантаженні сторінки
    renderProductPage();
});

function addToCart(event, dataArr, productID) {
    console.log(productID);
    const productId = dataArr[productID].id;
    const productName = dataArr[productID].name;
    const productPrice = dataArr[productID].price;
    const productImage = dataArr[productID].images[0];

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

    // Збереження оновленого кошика в локальному сховищі
    localStorage.setItem('cart', JSON.stringify(cart));

    // Оповіщення користувача про додавання товару
    alert(`Товар "${productName}" додано в кошик.`);
}
