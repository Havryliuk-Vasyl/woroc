document.addEventListener("DOMContentLoaded", function () {
    const productsSection = document.getElementById("products");
    const cartSection = document.getElementById("cart");
    const cartItems = document.getElementById("cart-items");
    const totalDisplay = document.getElementById("total");

    const products = [
        { id: 1, name: "Товар 1", price: 10.99 },
        { id: 2, name: "Товар 2", price: 19.99 },
        // Додайте більше товарів за потреби
    ];

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.innerHTML = `
            <p>${product.name} - $${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Додати в кошик</button>
        `;
        productsSection.appendChild(productElement);
    });

    window.addToCart = function (productId, productName, productPrice) {
        const existingItem = document.getElementById(`item-${productId}`);
        if (existingItem) {
            // Якщо товар вже є в кошику, збільште кількість
            const quantityElement = existingItem.querySelector(".quantity");
            const quantity = parseInt(quantityElement.textContent, 10) + 1;
            quantityElement.textContent = quantity;
        } else {
            // Якщо товару немає в кошику, додайте новий елемент
            const cartItem = document.createElement("li");
            cartItem.id = `item-${productId}`;
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                <span>${productName}</span>
                <span class="quantity">1</span>
                <span>$${productPrice.toFixed(2)}</span>
                <button onclick="removeFromCart(${productId}, ${productPrice})">Видалити</button>
            `;
            cartItems.appendChild(cartItem);
        }

        // Оновлення загальної суми
        updateTotal(productPrice);
    };

    window.removeFromCart = function (productId, productPrice) {
        const cartItem = document.getElementById(`item-${productId}`);
        const quantity = parseInt(cartItem.querySelector(".quantity").textContent, 10);

        if (quantity > 1) {
            // Зменшити кількість, якщо більше одного екземпляра
            cartItem.querySelector(".quantity").textContent = quantity - 1;
        } else {
            // Видалити елемент, якщо це єдиний екземпляр
            cartItems.removeChild(cartItem);
        }

        // Оновлення загальної суми
        updateTotal(-productPrice);
    };

    function updateTotal(amount) {
        const currentTotal = parseFloat(totalDisplay.textContent.replace("$", ""));
        const newTotal = currentTotal + amount;
        totalDisplay.textContent = `Загальна сума: $${newTotal.toFixed(2)}`;
    }
});
