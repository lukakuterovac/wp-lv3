// Get elements
const cartButton = document.querySelector(".cart-button");
const cartBadge = document.querySelector(".cart-badge");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".close");
const buyButton = document.querySelector(".buy-btn");
const cartItemsList = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const itemsGrid = document.querySelector(".items-grid");
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
const searchBar = document.querySelector(".search-bar");

let items = [
  {
    id: 1,
    name: "Apple",
    price: 1.99,
  },
  {
    id: 2,
    name: "Banana",
    price: 10,
  },
  {
    id: 3,
    name: "Orange",
    price: 2.5,
  },
  {
    id: 4,
    name: "Grapes",
    price: 5.99,
  },
  {
    id: 5,
    name: "Watermelon",
    price: 8.75,
  },
  {
    id: 6,
    name: "Pineapple",
    price: 3.99,
  },
];

let cart = [];

function fillItemsGrid(items) {
  for (const item of items) {
    let itemElement = document.createElement("div");
    itemElement.classList.add("item");
    itemElement.innerHTML = `
            <img src="https://picsum.photos/200/300?random=${item.id}" alt="${item.name}">
            <div class="item-info">
            <h2>${item.name}</h2>
            <p>$${item.price}</p>
            <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
            </div>
        `;
    itemsGrid.appendChild(itemElement);
  }

  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", addToCartHandler);
  });
}

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function addToCartHandler(event) {
  const itemId = parseInt(event.target.getAttribute("data-id"));
  const item = items.find((item) => item.id === itemId);
  cart.push(item);
  updateCart();
}

function updateCart() {
  cartItemsList.innerHTML = "";
  let total = 0;
  const cartItemsCount = {};

  for (const item of cart) {
    if (cartItemsCount[item.id]) {
      cartItemsCount[item.id].count++;
    } else {
      cartItemsCount[item.id] = { ...item, count: 1 };
    }
  }

  for (const itemId in cartItemsCount) {
    const item = cartItemsCount[itemId];
    let itemElement = document.createElement("li");
    itemElement.classList.add("cart-item");
    itemElement.innerHTML = `
      <img src="https://picsum.photos/50/50?random=${item.id}" alt="${
      item.name
    }">
      <h3>${item.name} (x${item.count})</h3>
      <p>$${(item.price * item.count).toFixed(2)}</p>
      <button class="delete-btn" data-id="${item.id}">Delete</button>
    `;
    cartItemsList.appendChild(itemElement);
    total += item.price * item.count;
  }

  cartTotal.textContent = `$${total.toFixed(2)}`;
  cartBadge.textContent = cart.length;

  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteItemHandler);
  });
}

function deleteItemHandler(event) {
  console.log("Delete button clicked");
  const itemId = parseInt(event.target.getAttribute("data-id"));
  const itemIndex = cart.findIndex((item) => item.id === itemId);
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
    updateCart();
  }
}

function filterItems(event) {
  const searchText = event.target.value.toLowerCase();
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchText)
  );
  itemsGrid.innerHTML = "";
  fillItemsGrid(filteredItems);
}

function handleBuy() {
  if (cart.length === 0) {
    alert("Your cart is empty. Please add items before buying.");
    toggleModal();
    return;
  }
  cart = [];
  alert("Thank you for your purchase!");
  updateCart();
  toggleModal();
}

fillItemsGrid(items);

cartButton.addEventListener("click", toggleModal);
modalClose.addEventListener("click", toggleModal);
searchBar.addEventListener("input", filterItems);
buyButton.addEventListener("click", handleBuy);
