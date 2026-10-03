interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

const inventory: Product[] = [];

function addProduct(name: string, category: string, price: number, quantity: number): void {
  const newProduct: Product = {
    id: Date.now(),
    name,
    category,
    price,
    quantity
  };
  inventory.push(newProduct);
  renderInventory();
}

function deleteProduct(id: number): void {
  const index = inventory.findIndex(p => p.id === id);
  if (index !== -1) {
    inventory.splice(index, 1);
    renderInventory();
  }
}

function calculateTotalValue(): number {
  return inventory.reduce((sum, product) => sum + product.price * product.quantity, 0);
}

function renderInventory(): void {
  const tbody = document.getElementById("inventory-body") as HTMLTableSectionElement;
  const totalDisplay = document.getElementById("total-value") as HTMLElement;

  if (!tbody || !totalDisplay) return;

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

(window as any).removeProduct = (id: number) => {
  deleteProduct(id);
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("product-form") as HTMLFormElement;

  form.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    const nameInput = document.getElementById("name") as HTMLInputElement;
    const categoryInput = document.getElementById("category") as HTMLInputElement;
    const priceInput = document.getElementById("price") as HTMLInputElement;
    const quantityInput = document.getElementById("quantity") as HTMLInputElement;

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

