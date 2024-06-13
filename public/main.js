const socket = io();

socket.on("getProducts", (data) => {
    const productsList = document.getElementById("products_list");
    productsList.innerHTML = "";
    data.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.innerHTML = `
            <h3>${product.title}</h3>
            <p>${product.price}</p>
            <p>${product.description}</p>
        `;
        productsList.appendChild(productDiv);
    });
});

socket.on("productAdded", (product) => {
    const productsList = document.getElementById("products_list");
    const productDiv = document.createElement("div");
    productDiv.innerHTML = `
        <h3>${product.title}</h3>
        <p>${product.price}</p>
        <p>${product.description}</p>
    `;
    productsList.appendChild(productDiv);
});

socket.on("productUpdated", (updatedProduct) => {
    const items = document.querySelectorAll('#products_list div');
    items.forEach(item => {
        const titleElement = item.querySelector('h3');
        if (titleElement && titleElement.textContent === updatedProduct.title) {
            item.innerHTML = `
                <h3>${updatedProduct.title}</h3>
                <p>${updatedProduct.price}</p>
                <p>${updatedProduct.description}</p>
            `;
        }
    });
});

socket.on("productDeleted", (productId) => {
    const items = document.querySelectorAll('#products_list div');
    items.forEach(item => {
        const titleElement = item.querySelector('h3');
        if (titleElement && titleElement.textContent === productId) {
            item.remove();
        }
    });
});