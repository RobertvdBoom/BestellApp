// This document is reserved for the main logic

let basket = [2.5, 4.1, 5.2, 6, 9];

function calculateTotalSum () {
    let totalSum = 0;
    for (let basketIndex = 0; basketIndex < basket.length; basketIndex++) {
        totalSum += basket[basketIndex];
        console.log(totalSum);       
    }
}

calculateTotalSum();
console.log(basket);
console.log("hello");