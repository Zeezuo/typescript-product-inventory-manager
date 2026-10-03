"use strict";
const inventory = [];
function addProduct(name, category, price, quantity) {
    const newProduct = {
        id: Date.now(),
        name,
        category,
        price,
        quantity
    };
    inventory.push(newProduct);
    renderInventory();
}
function deleteProduct(id) {
    const index = inventory.findIndex(p => p.id === id);
    if (index !== -1) {
        inventory.splice(index, 1);
        renderInventory();
    }
}
function calculateTotalValue() {
    return inventory.reduce((sum, product) => sum + product.price * product.quantity, 0);
}
function renderInventory() {
    const tbody = document.getElementById("inventory-body");
    const totalDisplay = document.getElementById("total-value");
    if (!tbody || !totalDisplay)
        return;
    tbody.innerHTML = "";
    inventory.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>$${product.price.toFixed(2)}</td>
      <td>${product.quantity}</td>
      <td>$${(product.price * product.quantity).toFixed(2)}</td>
      <td><button onclick="removeProduct(${product.id})">Delete</button></td>
    `;
        tbody.appendChild(row);
    });
    totalDisplay.textContent = calculateTotalValue().toFixed(2);
}
window.removeProduct = (id) => {
    deleteProduct(id);
};
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("product-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nameInput = document.getElementById("name");
        const categoryInput = document.getElementById("category");
        const priceInput = document.getElementById("price");
        const quantityInput = document.getElementById("quantity");
        const name = nameInput.value;
        const category = categoryInput.value;
        const price = parseFloat(priceInput.value);
        const quantity = parseInt(quantityInput.value, 10);
        if (name && category && !isNaN(price) && !isNaN(quantity)) {
            addProduct(name, category, price, quantity);
            form.reset();
        }
    });
});
