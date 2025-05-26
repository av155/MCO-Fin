// Bingo's Burgers Cashier system
// This is a simple cashier system for a burger restaurant

//CARL
const cashier_login = () => { //constant function to handle cashier login
  const username = prompt("Welcome to Bingo's Burger\nEnter cashier username:");
  const password = prompt("Enter password:");
  // Simple static validation
  if (username === "Cashier" && password === "8080") {
    alert("Login successful.");
    return true;
  } else {
    alert("Invalid login information.");
    alert("\nPlease try again.");
    return cashier_login(); // Retry
  }
};

//AVRIL
const inventory = {   // Inventory of items available in the restaurant with its name, stock and price.
  Burgers: [
    { name: "Hamburger", stock: 10, price: 45.00 },
    { name: "Cheeseburger", stock: 8, price: 50.00 },
    { name: "Chicken patty Burger", stock: 7, price: 55.00 },
    { name: "Veggie Burger", stock: 5, price: 50.00 },
    { name: "Double Burger", stock: 6, price: 70.00 },
    { name: "Double Beef Burger", stock: 10, price: 100.00 },
  ],
  Sides: [
    { name: "French Fries", stock: 15, price: 25.00 },
    { name: "Onion Rings", stock: 10, price: 20.00 },
    { name: "Chicken Nuggets", stock: 12, price: 45.00 },
    { name: "Mozzarella Sticks", stock: 5, price: 50.00 },
    { name: "Vegetable Salad", stock: 6, price: 60.00 },
    { name: "Pickled Raddish", stock: 10, price: 20.00}
  ],
  Drinks: [
    { name: "Royal", stock: 10, price: 20.00 },
    { name: "Sprite", stock: 8, price: 20.00 },
    { name: "Mt. Dew", stock: 7, price: 25.00 },
    { name: "Root beer", stock: 5, price: 35.00 },
    { name: "Water", stock: 20, price: 15.00 },
    { name: "Palamig", stock: 10, price: 30.00}
  ],
  Desserts: [
    { name: "Ice Cream", stock: 6, price: 35.00 },
    { name: "Brownie", stock: 5, price: 40.00 },
    { name: "Churros", stock: 4, price: 45.00 },
    { name: "Shortcake", stock: 6, price: 50.00 },
    { name: "Donut", stock: 10, price: 25.00 },
    { name: "Halo-halo", stock: 10, price: 35.00}
  ],
};

let cart = [];// Cart to hold items added by the user
//BEA
function category_list() {// Function to list all categories
  return Object.keys(inventory);// Returns an array of category names 
}
//MITZIE
function listItems(category) {// Function to list items in a category
  if (inventory[category]) {// Check if category exists
    inventory[category].forEach((item, index) => {// Loop through items in the category
      console.log(`${index + 1}. ${item.name} - $${item.price} (${item.stock} in stock)`);// Display item details
    });
  } else {
    alert("Invalid category.");
  }
}

function addToCart() {// Function to add items to the cart
  const category = prompt(`Choose a category:\n${category_list().join(", ")}`);// Prompt user for category 
  // and display available categories
  if (!inventory[category]) {// 
    alert("Category not found.");
    return;
  }
  listItems(category);// List items in the selected category
  const itemName = prompt("Enter item name to add:");//
  const qty = parseInt(prompt("Enter quantity:"));

  const item = inventory[category].find(i => i.name.toLowerCase() === itemName.toLowerCase());// Find the 
  // selected item in the inventory

  if (item && item.stock >= qty) {//
    item.stock -= qty;//
    const cartItem = cart.find(c => c.name === item.name);//
    if (cartItem) { //
      cartItem.qty += qty;//
    } else {
      cart.push({ name: item.name, qty, price: item.price });//
    }
    alert(`${item.name} added to cart.`);
  } else {
    alert("Item is not available or stock is insufficient.");//
  }
}

//BEA
function removeFromCart() {
  const itemName = prompt("Enter item name to remove from the cart:");
  const qty = parseInt(prompt("Enter quantity to remove:"));

  const cartItemIndex = cart.findIndex(i => i.name.toLowerCase() === itemName.toLowerCase());
  if (cartItemIndex !== -1) {
    const cartItem = cart[cartItemIndex];
    if (qty >= cartItem.qty) {
      cart.splice(cartItemIndex, 1);
    } else {
      cartItem.qty -= qty;
    }

    // Return stock back to inventory
    for (let category in inventory) {
      let item = inventory[category].find(i => i.name === itemName);
      if (item) {
        item.stock += qty;
        break;
      }
    }

    alert(`${itemName} removed from cart.`);
  } else {
    alert("Item not found in cart.");
  }
}

//MITZIE
function viewCart() {
  console.log("🛒 Your Cart:");
  cart.forEach(item => {
    console.log(`${item.name} x ${item.qty} = $${item.qty * item.price}`);
  });
  console.log("Total:", "$" + total());
}

function total() {
  return cart.reduce((total, item) => total + item.qty * item.price, 0);// Calculate total cost of items in the cart and
  // return the total of the cart
}

//BEA
function print_receipt() {
  if (cart.length === 0) {
    alert("Cart is empty.");
    return;
  }
  viewCart();
  const payment = parseFloat(prompt(`Total is $${total()}. Enter payment amount:`)); //parseFloat to convert
  // the string to a
