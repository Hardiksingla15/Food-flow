// menu data 
const menuItems = [
    { id: 1, name: 'Dal Makhni', price: 180, isVeg: true },
    { id: 2, name: 'Paneer Makhni', price: 260, isVeg: true },
    { id: 3, name: 'Kadhai Chaap', price: 260, isVeg: true },
    { id: 4, name: 'Paneer Butter Masala', price: 260, isVeg: true },
    { id: 5, name: 'Shahi Paneer', price: 300, isVeg: true },
    { id: 6, name: 'Pindi Chole', price: 300, isVeg: true },
    { id: 7, name: 'Paneer Butter Masala', price: 260, isVeg: true },
    { id: 8, name: 'Paneer Sandwich', price: 60, isVeg: true },
    { id: 9, name: 'Naan', price: 60, isVeg: true },
    { id: 10, name: 'Paneer Naan', price: 90, isVeg: true },
    { id: 11, name: 'Lassi', price: 100, isVeg: true },
    { id: 12, name: 'Salad', price: 60, isVeg: true }
];

let cart = {}; // Object to store cart items

// Get DOM elements
const menuContainer = document.getElementById('menuItems');
const cartContainer = document.getElementById('cartItems');
const totalBill = document.getElementById('totalBill');

// Render Menu Function
function renderMenu() {
    menuContainer.innerHTML = menuItems.map(item => `
        <div class="menu-item">
            <div class="menu-item-info">
                ${item.isVeg ? '<i class="fas fa-leaf veg-icon"></i>' : ''}
                <span class="menu-item-name">${item.name}</span>
            </div>
            <div class="menu-item-actions">
                <span class="price">₹${item.price}</span>
                ${renderItemControls(item)}
            </div>
        </div>
    `).join('');
}

// Render Item Controls Function (ADD, or quantity controls)
function renderItemControls(item) {
    const quantity = cart[item.id] || 0;
    
    if (quantity === 0) {
        return `
            <button class="add-btn" onclick="addToCart(${item.id})">
                ADD
            </button>
        `;
    }

    return `
        <div class="quantity-controls">
            <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">
                <i class="fas fa-minus"></i>
            </button>
            <span class="quantity">${quantity}</span>
            <button class="quantity-btn" onclick="increaseQuantity(${item.id})">
                <i class="fas fa-plus"></i>
            </button>
        </div>
    `;
}

// Add item to cart
function addToCart(itemId) {
    cart[itemId] = 1;
    renderMenu();
    renderCart();
}

// Increase item quantity in the cart
function increaseQuantity(itemId) {
    cart[itemId] = (cart[itemId] || 0) + 1;
    renderMenu();
    renderCart();
}

// Decrease item quantity in the cart
function decreaseQuantity(itemId) {
    if (cart[itemId] > 1) {
        cart[itemId]--;
    } else {
        delete cart[itemId];
    }
    renderMenu();
    renderCart();
}

// Render Cart Function
function renderCart() {
    const cartItems = Object.keys(cart).map(itemId => {
        const item = menuItems.find(menuItem => menuItem.id == itemId);
        return `
            <div class="cart-item">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-quantity">x${cart[itemId]}</span>
                <span class="cart-item-price">= ₹${item.price * cart[itemId]}</span>
            </div>
        `;
    }).join('');

    cartContainer.innerHTML = cartItems || '<p>Your cart is empty.</p>';

    // Update the total bill
    updateTotalBill();
}

// Update total bill calculation
function updateTotalBill() {
    const total = Object.keys(cart).reduce((total, itemId) => {
        const item = menuItems.find(menuItem => menuItem.id == itemId);
        return total + (item.price * cart[itemId]);
    }, 0);

    totalBill.textContent = `Total Bill= ₹${total}`;
}

// Initialize rendering of menu
renderMenu();