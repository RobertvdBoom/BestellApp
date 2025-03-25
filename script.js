let basket = [];

function renderTestOutput(dishCategory, dishIndex) {
    let itemPriceRef = document.getElementById('test-output');
    let itemNameRef = document.getElementById('test-output');
    let itemAmountRef = document.getElementById('test-output');
    let itemDescriptionRef = document.getElementById('');
}

function dishTemplate(category, index) {
    let itemContainerRef = document.getElementById('item_container');
    let price = allDishes[category][index].price;
    price = stylePrice(price);

    itemContainerRef.innerHTML += `
    <div class="wrapper-1440 container-fluid">
      <div class="card dish-container">
        <img src="${allDishes[category][index].imageURL}" class="card-img-top">
        <div class="card-body">
          <h4>${allDishes[category][index].description}</h4>
          <p class="card-text">${allDishes[category][index].description}</p>
        </div>
        <div class="dish-add-btn-and-price">
          <button class="btn btn-outline-basket">+</button>
          <p>${price}</p>
        </div>
      </div>
    </div> `
}


function renderCurrentItems (category) {
    let currentDishArray = allDishes[category];
    for (let index = 0; index < currentDishArray.length; index++) {
        dishTemplate(category, index);
    }
}

renderCurrentItems("starters");
dishTemplate("starters", 3);

// Render Items from List

// pushItemToCart (take object, use Name, Price, Amount, Total)
// itemInBasketCheck

// updateBasket


// itemPlusOne // same button as in basket
// itemMinusOne // only in basket
// updateItemInBasket




// delete item from basket (just use pop item?)

// 

// check amount in basket

function stylePrice(number) {
    let num = number;
    num = twoDigits(num);
    num = replacePriceDot(num);
    return num;
}

function twoDigits (number){
    return Number.parseFloat(number).toFixed(2);
}

function replacePriceDot(number){
    return number.replace(".", ",");
}