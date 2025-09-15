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


function createNewItemInBasket(category, index) {
    let pointer = dishData[category][index].dishID;
    let price = dishData[category][index].dishPrice;
    let newElement = {"dishID" : pointer, "dishPrice" : price, "amount" : 1};

    newBasket.push(newElement);
}

createNewItemInBasket("starters", 2)
createNewItemInBasket("starters", 1)
console.log(newBasket);

calculateTotalSum()

function itemPlusOne() {

}

// write function to add item to cart -> check if in cart -> createNew / itemPlusOne
// look for item in cart
// only look if cart len != 0 1
// 