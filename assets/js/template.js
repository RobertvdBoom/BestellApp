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
        `;
let activeCategory = "starters";

function renderDishes(category) {
    activateCategoryActiveBorder(category);
    let dishContentRef = document.getElementById('dish-container');
    dishContentRef.innerHTML = "";
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

function activateCategoryActiveBorder(category) {
    let oldButtonContentRef = document.getElementById(activeCategory);
    let newButtonContentRef = document.getElementById(category);
    oldButtonContentRef.classList.remove("active-category");
    newButtonContentRef.classList.add("active-category");
    activeCategory = category;
}

renderDishes("starters");

let favDishes = [{ "category": "starters", "index": 2 },
{ "category": "starters", "index": 3 },
{ "category": "mainDish", "index": 1 },
{ "category": "mainDish", "index": 3 },
{ "category": "mainDish", "index": 4 },
{ "category": "dessert", "index": 1 },
{ "category": "dessert", "index": 0 }];

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
                    <p>${dishData[element.category][element.index].dishPrice.toFixed(2)} €</p>
                    <button onclick="isInBasket('${favDishes[index].category}', ${element.index})">+</button>
                </div>
            </div>
        </div>
    `
    }
}

renderFavDishes();

// Basket 

let deliveryCost = 0;

function renderDeliveryCost() {
    let deliveryCostRef = document.getElementById('basket-delivery-cost');
    deliveryCostRef.innerHTML = "";
    deliveryCostRef.innerHTML += deliveryCost.toFixed(2) + " €";

}

// renderDeliveryCost();

function renderBasketItems() {
    let basketRef = document.getElementById('basket-items-container');
    basketRef.innerHTML = "";
    if (itemBasket.length == 0) {
        basketRef.innerHTML = "<p>Wir freuen uns auf deine Bestellung!</p>";
    }
    for (let index = 0; index < itemBasket.length; index++) {
        let element = itemBasket[index];
        elementTotal = element.dishPrice * element.dishAmount;
        elementTotal = elementTotal.toFixed(2);
        basketRef.innerHTML += `
                    <div class="basket-item">
                        <div class="ds-flex-basket-l">
                            <h3>${element.dishName}</h3>
                            <button onclick="addNote(${index})"> Anmerkung! </button>
                        </div>
                        <div class="ds-flex-basket-r">
                            <span id="item-price-0">${elementTotal} €</span>
                            <div class="item-basket-buttons-container">
                                <button class="basket-trash-btn" onclick="itemInBasketToTrash(${index})">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                </svg>
                                </button>
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

function itemInBasketToTrash(index) {
    itemBasket.splice(index, 1);
    renderBasketItems();
}

let itemBasket = [];

// renderBasketItems();

function calculateTotalBasket() {
    let basketTotalRef = document.getElementById('basket-total-container');
    basketTotalRef.innerHTML = "";
    let total = 0;
    for (let index = 0; index < itemBasket.length; index++) {
        let element = itemBasket[index];
        total += element.dishAmount * element.dishPrice;
    }
    total += deliveryCost;
    basketTotalRef.innerHTML = total.toFixed(2) + " €";
}

function renderNoteCommitButtons(noteIndex) {
    let noteButtonContainerRef = document.getElementById('note-commit-container');
    noteButtonContainerRef.innerHTML = "";
    // noteButtonContainerRef.innerHTML += `
    // <button onclick="commitNote(${noteIndex})">Anmerkung speichern!</button>
    // <button onclick="deleteNote(${noteIndex})>Anmerkung Löschen</button>
    // <button type="button" onclick="closeNoteDialog()">X</button>
    // `

    if (itemBasket[noteIndex].note !== "") {
        noteButtonContainerRef.innerHTML += `
    <button onclick="commitNote(${noteIndex})">Anmerkung speichern!</button>
    <button onclick="deleteNote(${noteIndex})">Anmerkung Löschen</button>
    <button type="button" onclick="closeNoteDialog()">X</button>
    `
    } else {
        noteButtonContainerRef.innerHTML += `
    <button onclick="commitNote(${noteIndex})">Anmerkung speichern!</button>
    <button type="button" onclick="closeNoteDialog()">X</button>
    `
    }
}

function renderOrderSummary() {
    let orderSummaryContainerRef = document.getElementById('order-summary-container');
    orderSummaryContainerRef.innerHTML = "";
    for (let index = 0; index < itemBasket.length; index++) {
        const element = itemBasket[index];
        orderSummaryContainerRef.innerHTML += `
            <p>${element.dishAmount} x ${element.dishName}</p>
        `
        if (element.note != "") {
            orderSummaryContainerRef.innerHTML += `
            <span class="note-in-summary">Anmerkung: ${element.note}</span>
            <button onclick="deleteNote(${index})>X</button>
        `
        }
    }
}

// render kitchen order -> Later on feature for the backend side / restaurant side to receive the order

function renderKitchenOrderList() {
  let kitchenOrderRef = document.getElementById('restaurant-kitchen-order-container');
  kitchenOrderRef.innerHTML = "";
  for (let index = 0; index < orderList.length; index++) {
    const element = orderList[index];
    kitchenOrderRef.innerHTML += `
        <div>
            <h3>Bestellnummer: ${element.oderID}</h3>
            <p>Time of order: ${element.orderTime}</p>
        </div>
        `
    kitchenOrderRef.innerHTML += createOrderItems(index);
  }
}

function createOrderItems(indexOfOrderList) {
  let orderListItemHTML = "";
  for (let index = 0; index < orderList[indexOfOrderList].orderItems.length; index++) {
    let element = orderList[indexOfOrderList].orderItems[index];
    orderListItemHTML += `
      <p>${element.dishAmount} x ${element.dishName}</p>
    `
    if (element.note != "") {
      orderListItemHTML += `
        <span class="note-in-summary">Anmerkung: ${element.note}</span>
    `
    }
  }
  return orderListItemHTML;
}

