// This document is reserved for the main logic
// RESP MENU
function toggleRespMenu () {
    document.getElementById("resp_menu").classList.toggle("resp_menu_closed");
}


let basket = [];


function calculateRating(){
    return averageRating = (rating.totalStars / rating.totalRatings).toFixed(1);
}

let liked = false;

function restaurantRatingPlusMinus() {
    ratingButtonRef = document.getElementById('ratingButton');
    if (liked == false) {
        ratingButtonRef.innerHTML = "-";
        liked = true;
        restaurantRating.totalRatings ++;
        console.log(restaurantRating.totalRatings)
    } else {
        ratingButtonRef.innerHTML = "+";
        liked = false;
        restaurantRating.totalRatings --;
        console.log(restaurantRating.totalRatings)
    }

}

console.log(newBasket);

function itemPlusOne(index) {
    inventory[index].quantity ++;
    console.log(inventory[index].quantity);
    renderAmount(index);
}

function itemMinusOne(index) {
    inventory[index].quantity --;
    console.log(inventory[index].quantity);
    if (inventory[index].quantity !== 0) {
      renderAmount(index);
    }
    else {
      inventory.splice(index, 1);
      console.log(inventory[index]);
    }
}

function pushItemToBasket(category, index) {
    let itemObjectInBasket = { 
      "category" : category,
      "itemName" : dishData[category][index].dishName,
      "dishPrice" : dishData[category][index].dishPrice,
      "dishAmount" : 1,
    }
    basket.push(itemObjectInBasket);
}

pushItemToBasket('starters', 0)


function isInBasket(item) {
    // Pass name
    // check if its in basket 
    // return index
    // basket[index] ++
    
  }

  function renderAmount(index) {

  }

