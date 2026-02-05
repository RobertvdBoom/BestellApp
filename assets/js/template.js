let deliveryCost = 0;
let activeCategory = "starters";
let itemBasket = [];

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
    createMobileCategoryHeader(category);
}

function createMobileCategoryHeader(category) {
    let mobileHeaderRef = document.getElementById('mobile-category-header');
    mobileHeaderRef.innerHTML = "";
    if (category = "starters") {
        mobileHeaderRef.innerHTML = "Vorspeisen";
    } else if (category = "mainDish"){
        mobileHeaderRef.innerHTML = "Hauptgerichte";
    } else if (category = "dessert"){
        mobileHeaderRef.innerHTML = "Nachspeisen";
    } else if (category = "beverages"){
        mobileHeaderRef.innerHTML = "Getränke";
    } else {
        console.log('did not find header');
    };  
}

let favDishes = [
{ "category": "starters", "index": 2 },
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
        <li class="outer-card-container dish-card-favorite-box">
            <div class="dish-card">
                <img src="${dishData[element.category][element.index].dishImageURL}" alt="${dishData[element.category][element.index].dishImageAlt}">
                <div class="dish-text">
                    <h3>${dishData[element.category][element.index].dishName}</h3>
                    <p>${dishData[element.category][element.index].dishDescription}</p>
                </div>
                <div class="dish-card-price-and-button-fav">
                    <p>${dishData[element.category][element.index].dishPrice.toFixed(2)} €</p>
                    <button onclick="isInBasket('${favDishes[index].category}', ${element.index})">+</button>
                </div>
            </div>
        </li>
    `
    }
}

function renderDeliveryCost() {
    let deliveryCostRef = document.querySelectorAll('.basket-delivery-cost');
    deliveryCostRef.forEach(box => {
        box.innerHTML = deliveryCost.toFixed(2) + " €";
    });
}

// rework this for whole document

function renderBasketItems() {
    let basketRef = document.querySelectorAll('.basket-items-anchor');
    basketRef.innerHTML = "";
    basketRef.forEach(box => {box.innerHTML = createBasketItems();});
    calculateTotalBasket();
    storeItemBasketInLocalStorage()
}

function createBasketItems() {
    let content = "";
    if (itemBasket.length == 0) {
        content = "<p>Wir freuen uns auf deine Bestellung!</p>";
    }
    for (let index = 0; index < itemBasket.length; index++) {
        let element = itemBasket[index];
        elementTotal = element.dishPrice * element.dishAmount;
        elementTotal = elementTotal.toFixed(2);
        content += `
                    <div class="basket-item">
                        <div class="ds-flex-basket-l">
                            <h3>${element.dishName}</h3>
                            <button onclick="addNote(${index})">Notiz!</button>
                        </div>
                        <div class="ds-flex-basket-r">
                            <span>${elementTotal} €</span>
                            <div class="item-basket-buttons-container">
                                <button class="basket-trash-btn" onclick="itemFromBasketToTrash(${index})" aria-label="${element.dishName} aus dem Warenkorb entfernen.">
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
                    </div>`
    }
    return content;
}

function itemFromBasketToTrash(index) {
    itemBasket.splice(index, 1);
    renderBasketItems();
}

function calculateTotalBasket() {
    let basketTotalRef = document.querySelectorAll('.basket-total-container');
    let total = addUpBasketItems();
    basketTotalRef.forEach(box => {
    box.innerHTML = "";
    box.innerHTML = total;
    })
}

function addUpBasketItems() {
    let total = 0;
    for (let index = 0; index < itemBasket.length; index++) {
        let element = itemBasket[index];
        total += element.dishAmount * element.dishPrice;
    }
    total += deliveryCost;
    return total.toFixed(2) + " €";
}

// From here on, its all fine '-' - single use case / container
function renderNoteCommitButtons(noteIndex) {
    let noteButtonContainerRef = document.getElementById('note-commit-container');
    noteButtonContainerRef.innerHTML = "";
    if (itemBasket[noteIndex].note !== "") {
        noteButtonContainerRef.innerHTML += `
    <button onclick="commitNote(${noteIndex})">Anmerkung speichern!</button>
    <button onclick="deleteNote(${noteIndex})">Anmerkung Löschen</button>
    <button type="button" onclick="closeNoteDialog()">X</button>`
    } else {
        noteButtonContainerRef.innerHTML += `
    <button onclick="commitNote(${noteIndex})">Anmerkung speichern!</button>
    <button type="button" onclick="closeNoteDialog()">X</button>`
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
            <button onclick="deleteNote(${index})>X</button>`
        }
    }
}


// in progress: local storage
function storeItemBasketInLocalStorage() {
    localStorage.setItem('itemBasket', JSON.stringify(itemBasket));
}
// rework to general function? 
function fetchLocalStorage() {
    itemBasket = JSON.parse(localStorage.getItem("itemBasket"));
}

// render kitchen order -> Later on feature for the backend side / restaurant side to receive the order
function renderKitchenOrderList() {
  let kitchenOrderRef = document.getElementById('restaurant-kitchen-order-container');
  kitchenOrderRef.innerHTML = "";
  for (let index = 0; index < orderList.length; index++) {
    const element = orderList[index];
    kitchenOrderRef.innerHTML += `
        <li>
            <h3>Bestellnummer: ${element.oderID}</h3>
        </li>
        <p>Time of order: ${element.orderTime}</p>
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