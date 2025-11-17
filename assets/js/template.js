let dishCardTemplate = ` 
        <div class="outer-card-container">
            <div class="dish-card">
                <img src="/assets/img/starters/edamame.jpg" alt="Beispielbild">
                <div class="dish-text">
                    <h2>${dishData.starters[0].dishName}</h2>
                    <p>Gedämpfte junge Sojabohnen, leicht gesalzen – ein klassischer japanischer Snack.</p>
                </div>
                <div class="dish-card-price-and-button">
                    <div>Price</div>
                    <button>+</button>
                </div>
            </div>
        </div>
        `
let activeCategory = "starters";

function renderDishes(category) {
    activateCategoryActiveBorder(category);
    let dishContentRef = document.getElementById('dish-container');
    dishContentRef.innerHTML= "";
    for (let index = 0; index < dishData[category].length; index++) {
        dishContentRef.innerHTML += ` 
        <div class="outer-card-container">
            <div class="dish-card">
                <img src="${dishData[category][index].dishImageURL}" alt="Beispielbild">
                <div class="dish-text">
                    <h2>${dishData[category][index].dishName}</h2>
                    <p>${dishData[category][index].dishDescription}</p>
                </div>
                <div class="dish-card-price-and-button">
                    <div>${dishData[category][index].dishPrice.toFixed(2)} €</div>
                    <button onclick="isInBasket('${category}', ${index})">+</button>
                </div>
            </div>
        </div>
    `
    }
}

function activateCategoryActiveBorder(category){
    let oldButtonContentRef = document.getElementById(activeCategory);
    let newButtonContentRef = document.getElementById(category);
    oldButtonContentRef.classList.remove("active-category");
    newButtonContentRef.classList.add("active-category");
    activeCategory = category;
}

renderDishes("starters");

let favDishes = [{"category" : "starters", "index" : 2}, 
{"category" : "starters", "index" : 3},
{"category" : "mainDish", "index" : 1},
{"category" : "mainDish", "index" : 3},
{"category" : "mainDish", "index" : 4},
{"category" : "dessert", "index" : 1},
{"category" : "dessert", "index" : 0}];

function renderFavDishes() {
    let favDishContentRef = document.getElementById('favorite-dishes');
    for (let index = 0; index < favDishes.length; index++) {
        let element = favDishes[index];
        favDishContentRef.innerHTML += ` 
        <div class="outer-card-container dish-card-favorite-box">
            <div class="dish-card">
                <img src="${dishData[element.category][element.index].dishImageURL}" alt="${dishData[element.category][element.index].dishImageAlt}">
                <div class="dish-text">
                    <h2>${dishData[element.category][element.index].dishName}</h2>
                    <p>${dishData[element.category][element.index].dishDescription}</p>
                </div>
                <div class="dish-card-price-and-button-fav">
                    <div>${dishData[element.category][element.index].dishPrice.toFixed(2)} €</div>
                    <button onclick="isInBasket('${favDishes[index].category}', ${index})">+</button>
                </div>
            </div>
        </div>
    `
    }
}

renderFavDishes();

// Basket 

let deliveryCost = 5;

function renderDeliveryCost(){
    let deliveryCostRef = document.getElementById('basket-delivery-cost');
    deliveryCostRef.innerHTML += deliveryCost.toFixed(2) + " €";

}

renderDeliveryCost();

function renderBasketItems() {
    let basketRef = document.getElementById('basket-items-container');
    basketRef.innerHTML = "";
    for (let index = 0; index < itemBasket.length; index++) {
        let element = itemBasket[index];
        elementTotal = element.dishPrice*element.dishAmount;
        elementTotal = elementTotal.toFixed(2);
        basketRef.innerHTML += `
                    <div class="basket-item">
                        <div class="ds-flex-basket">
                            <h3>${element.dishName}</h3>
                            <span id="item-price-0">${elementTotal} €</span>
                        </div>
                        <div class="ds-flex-basket">
                            <span>Anmerkung hinzufügen</span>
                            <div >
                                <button onclick="itemMinusOne(${index})">-</button>
                                <span>${element.dishAmount}</span>
                                <button onclick="itemPlusOne(${index})">+</button>
                            </div>
                        </div>
                    </div>
    `
    }
    calculateTotalBasket();
}

let itemBasket = [];

renderBasketItems();