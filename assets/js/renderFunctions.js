function renderDeliveryCost() {
    let deliveryCostRef = document.querySelectorAll('.basket-delivery-cost');
    deliveryCostRef.forEach(box => {
        box.innerHTML = deliveryCost.toFixed(2) + " €";
    });
}

function renderBasketItems() {
    let basketRef = document.querySelectorAll('.basket-items-anchor');
    basketRef.innerHTML = "";
    basketRef.forEach(box => {box.innerHTML = createBasketItems();});
    calculateTotalBasket();
    storeItemBasketInLocalStorage();
    displayItemCountInBasket();
}

function renderDishes(category) {
    activateCategoryActiveBorder(category);
    let dishContentRef = document.getElementById('dish-container');
    dishContentRef.innerHTML = "";
    for (let index = 0; index < dishData[category].length; index++) {
        dishContentRef.innerHTML += returnDishCard(category, index);
    }
    createMobileCategoryHeader();
    announcePrice();
}

function createMobileCategoryHeader() {
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

function renderFavDishes() {
    let favDishContentRef = document.getElementById('favorite-dishes');
    for (let index = 0; index < favDishes.length; index++) {
        let element = favDishes[index];
        let favDishID = `fav-item-${favDishes[index].category}-${favDishes[index].index}`;
        favDishContentRef.innerHTML += returnFavDishCard(element.category, element.index, favDishID);
    }
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
        content += returnBasketItem(element, index);
    }
    return content;
}

function renderNoteCommitButtons(noteIndex) {
    let noteButtonContainerRef = document.getElementById('note-commit-container');
    noteButtonContainerRef.innerHTML = "";
    if (itemBasket[noteIndex].note !== "") {
        noteButtonContainerRef.innerHTML += `
    <button onclick="commitNote(${noteIndex})">Anmerkung speichern!</button>
    <button onclick="deleteNote(${noteIndex})">Anmerkung Löschen</button>
    <button type="button" onclick="closeDialog(dialogNoteRef)">Close</button>`
    } else {
        noteButtonContainerRef.innerHTML += `
    <button onclick="commitNote(${noteIndex})">Anmerkung speichern!</button>
    <button type="button" onclick="closeDialog(dialogNoteRef)">Close</button>`
    }
}

function renderOrderSummary() {
    let orderSummaryContainerRef = document.getElementById('order-summary-container');
    orderSummaryContainerRef.innerHTML = "";
    for (let index = 0; index < itemBasket.length; index++) {
        let element = itemBasket[index];
        let contentForDiv = "";
        contentForDiv = `
            <p>${element.dishAmount} x ${element.dishName}</p>
        `
        if (element.note != "") {
            contentForDiv += `
            <span class="note-in-summary">Anmerkung: ${element.note}</span>
            <button onclick="deleteNoteFromSummary(${index})" aria-label="Notiz zu ${element.dishName} Löschen!">Notiz Löschen!</button>`
        };
        
        let outerDiv = `<div class="outer-summary-item">${contentForDiv}</div> `
        orderSummaryContainerRef.innerHTML += outerDiv;
    }
}

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

function displayItemCountInBasket() {
  let totalItemCount = 0;
  itemBasket.forEach((element)=> totalItemCount+=element.dishAmount);
  mobileItemCountRef.innerHTML = `Warenkorb Öffnen! [${totalItemCount}]`;
}

function resetBasketItemsContainer() {
  let basketRef = document.querySelectorAll('.basket-items-anchor');
  basketRef.forEach(box => { 
    if (delivery === false) {
      box.innerHTML = "Vielen Dank für deine Bestellung! Dein Essen ist in 45 Minuten abholbereit!";
    } else {
      box.innerHTML = "Vielen Dank für deine Bestellung! Dein Essen sollte in 60 Minuten bei dir sein!";
    }
     });
}

function storeItemBasketInLocalStorage() {
    localStorage.setItem('itemBasket', JSON.stringify(itemBasket));
}

function fetchLocalStorage() {
    announceLoadFromLocalStorage();
    itemBasket = JSON.parse(localStorage.getItem("itemBasket")) || [];
}

function storeDeliveryInLocalStorage() {
    localStorage.setItem('delivery', JSON.stringify(delivery));
}

function fetchDeliveryFromLocalStorage() {
    delivery = JSON.parse(localStorage.getItem("delivery"));
}

function itemFromBasketToTrash(index) {
    itemBasket.splice(index, 1);
    renderBasketItems();
}