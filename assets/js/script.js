// This document is reserved for the main logic

let basket = [2.5, 4.1, 5.2, 6, 9];
let newBasket = [];
function calculateTotalSum () {
    let totalSum = 0;
    for (let basketIndex = 0; basketIndex < basket.length; basketIndex++) {
        let total = newBasket[basketIndex].dishPrice;
        totalSum += total;
        console.log(totalSum);       
    }
}

// write function to add item to cart -> check if in cart -> createNew / itemPlusOne
// look for item in cart
// only look if cart len != 0 1
// 

let cart = [];

function addToCart(category, index) {
    let element = {[category] : index};
    cart.push(element)
}

addToCart("starters", 0);
addToCart("starters", 1);
addToCart("beverages", 2)
addToCart("troll", 2)

console.log(cart);


// on render function: add the bigger topic to the function as a pointer
// re-use for button category / index


// RESP MENU
function toggleRespMenu () {
    document.getElementById("resp_menu").classList.toggle("resp_menu_closed");
}