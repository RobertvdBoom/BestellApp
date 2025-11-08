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

let favDishes = [ dishData.starters[2], dishData.starters[3], dishData.mainDish[1], dishData.mainDish[3], dishData.mainDish[4], dishData.dessert[1], dishData.dessert[0]];

function renderFavDishes() {
    let favDishContentRef = document.getElementById('favorite-dishes');
    for (let index = 0; index < favDishes.length; index++) {
        let element = favDishes[index];
        favDishContentRef.innerHTML += ` 
        <div class="outer-card-container dish-card-favorite-box">
            <div class="dish-card">
                <img src="${element.dishImageURL}" alt="${element.dishImageAlt}">
                <div class="dish-text">
                    <h2>${element.dishName}</h2>
                    <p>${element.dishDescription}</p>
                </div>
                <div class="dish-card-price-and-button-fav">
                    <div>${element.dishPrice.toFixed(2)} €</div>
                    <button>+</button>
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

function updatePrice(totalSum) {
    let priceContainerRef = document.getElementById('basket-total-container');
    priceContainerRef.innerHTML += "Gesamt: " + totalSum.toFixed(2) + "€";
}

updatePrice(24.40);

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