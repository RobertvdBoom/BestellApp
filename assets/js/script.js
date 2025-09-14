// This document is reserved for the main logic

let basket = [2.5, 4.1, 5.2, 6, 9];

function calculateTotalSum () {
    let totalSum = 0;
    for (let basketIndex = 0; basketIndex < basket.length; basketIndex++) {
        totalSum += basket[basketIndex];
        console.log(totalSum);       
    }
}


console.log(dishData.starters[0].dishPrice);

let newBasket = [];

function createNewItemInBasket(category, index) {
    objectName = dishData[category][index].dishID;
    let newElement = {["dishID" : objectName, "dishPrice" :  ]};

    newBasket.push(newElement);
}
createNewItemInBasket("starters", 2)
console.log(newBasket);