let deliveryCost = 0;
let delivery = false;
let itemBasket = [];
let activeCategory = "starters";
let orderList = [];
let orderNumber = 0;
let currentTestTime = new Date();
let respMenuState = false;
let dialogOpened = false;
let currentlyOpenedDialog = "";
let vw = window.innerWidth;
let hiddenState = "";
let pageContentRef = document.getElementById('page-content');
let basketDialogRef = document.getElementById('basket-dialog');
let mobileDialogRef = document.getElementById('mobile-basket-dialog');
let dialogNoteRef = document.getElementById('basket-note-dialog');
let successfulOrderRef = document.getElementById('successful-order');
let noteContainerRef = document.getElementById('note-text-area');
let restaurantOrderContainer = document.getElementById('order-dialog-for-restaurant');
let mobileItemCountRef = document.getElementById('mobile-basket-opener-and-item-count');
const announcementContainerRef = document.getElementById('basket-status');
let category = "starters";

function init() {
  renderDishes(activeCategory);
  renderFavDishes();
  fetchLocalStorage();
  fetchDeliveryFromLocalStorage();
  adjustDeliveryCost();
  setDeliveryBoxActive();
  renderDeliveryCost();
  renderBasketItems();
  initializeHidden();
  adjustTabSkip();
  fetchIntroInfoFromLS();
  openIntroDialog();
}

function activateCategoryActiveBorder(category) {
  let oldButtonContentRef = document.querySelectorAll(`.${activeCategory}`);
  let newButtonContentRef = document.querySelectorAll(`.${category}`);
  oldButtonContentRef.forEach(box => { box.classList.remove("active-category"); });
  newButtonContentRef.forEach(box => { box.classList.add("active-category"); });
  activeCategory = category;
  announceActiveCategory(category);
}

function toggleRespMenu() {
  let respMenuBtnRef = document.getElementById("resp-menu-btn");
  let respMenuRef = document.getElementById("resp_menu");
  respMenuRef.classList.toggle("resp_menu_closed");
  respMenuState = !respMenuState;
  if (respMenuState === true) {
    respMenuRef.removeAttribute("aria-hidden");
    respMenuBtnRef.setAttribute("aria-expanded", "true");
    respMenuBtnRef.setAttribute("aria-label", "Menü schließen!");
  } else {
    respMenuRef.setAttribute("aria-hidden", "true");
    respMenuBtnRef.setAttribute("aria-expanded", "false");
    respMenuBtnRef.setAttribute("aria-label", "Menü öffnen!");
  }
}

function itemPlusOne(index) {
  itemBasket[index].dishAmount++;
  renderBasketItems();
  announceAmount(itemBasket[index].dishName, "um 1 erhöht", itemBasket[index].dishAmount);
}

function itemMinusOne(index) {
  itemBasket[index].dishAmount--;
  if (itemBasket[index].dishAmount <= 0) {
    let nameSave = itemBasket[index].dishName;
    itemBasket.splice(index, 1);
    renderBasketItems();
    announceAmount(nameSave, "entfernt", 0);
  }
  else {
    renderBasketItems();
    announceAmount(itemBasket[index].dishName, "um 1 reduziert", itemBasket[index].dishAmount);
  }
}

function addToBasket(category, index) {
  let itemIsInBasket = isInBasket(category, index);
  if (itemIsInBasket.itemIsInBasket == false) {
    pushItemToBasket(category, index);
  } else {
    itemBasket[itemIsInBasket.itemIndex].dishAmount++;
  }
  storeItemBasketInLocalStorage();
  renderBasketItems();
}

function isInBasket (category, index) {
  let itemIsInBasket = false;
  let itemIndex = "";
  for (let basketIndex = 0; basketIndex < itemBasket.length; basketIndex++) {
    let itemToBeChecked = itemBasket[basketIndex].dishName;
    if (itemToBeChecked == dishData[category][index].dishName) {
      itemIsInBasket = true;
      itemIndex = basketIndex;
    }
    else {
      continue;
    }
  }
  return {itemIsInBasket, itemIndex};
}

function pushItemToBasket(category, index) {
  let itemObjectInBasket = {
    "category": category,
    "dishName": dishData[category][index].dishName,
    "dishPrice": dishData[category][index].dishPrice,
    "dishAmount": 1,
    "note": ""
  }
  itemBasket.push(itemObjectInBasket);
}

function setDeliveryBoxActive() {
  let deliveryBoxRef = document.querySelectorAll('.delivery-option-button');
  let pickupBoxRef = document.querySelectorAll('.pickup-option-button');

  if (delivery == true) {
    deliveryBoxRef.forEach(box => { box.classList.add("active-category"); });
    pickupBoxRef.forEach(box => { box.classList.remove("active-category"); });
  }
  else if (delivery == false) {
    pickupBoxRef.forEach(box => { box.classList.add("active-category"); });
    deliveryBoxRef.forEach(box => { box.classList.remove("active-category"); });
  }
  announceDeliveryState();
}

function adjustDeliveryCost() {
  if (delivery == true) {
    deliveryCost = 5;
  }
  else if (delivery == false) {
    deliveryCost = 0;
  }
}

function addDeliveryCost() {
  delivery = true;
  storeDeliveryInLocalStorage();
  adjustDeliveryCost();
  calculateTotalBasket();
  setDeliveryBoxActive();
  renderDeliveryCost();
}

function removeDeliveryCost() {
  delivery = false;
  storeDeliveryInLocalStorage();
  adjustDeliveryCost();
  calculateTotalBasket();
  setDeliveryBoxActive();
  renderDeliveryCost();
}

function openDialog(option) {
  if (currentlyOpenedDialog != "") {
    currentlyOpenedDialog.close();
  }
  currentlyOpenedDialog = option;
  option.showModal();
  dialogOpened = true;
  blockBackgroundContent();
}

function closeDialog(option) {
  currentlyOpenedDialog = "";
  option.close();
  dialogOpened = false;
  blockBackgroundContent();
}

function blockBackgroundContent() {
  if (dialogOpened == true) {
    pageContentRef.setAttribute("hidden", "");
  } else {
    pageContentRef.removeAttribute("hidden");
  }
}

function openSuccessfulOrder() {
  let successfulOrderDeliveryRef = document.getElementById('successful-order-note');
  successfulOrderDeliveryRef.innerHTML = "";
  if (delivery === false) {
    successfulOrderDeliveryRef.innerHTML = "Deine Bestellung ist in 45 Minuten abholbereit."
  } else {
    successfulOrderDeliveryRef.innerHTML = "Deine Bestellung ist in ca. 60 Minuten bei dir!"
  }
  successfulOrderRef.showModal();
  setTimeout(closeSuccessfulOrder, 5000);
}

function closeSuccessfulOrder() {
  successfulOrderRef.close()
}

function convertItemBasketToOrderList() {
  let timeOfOrder = new Date();
  let element = { orderTime: timeOfOrder, orderItems: itemBasket, oderID: (Number(createOrderID()) + orderNumber) };
  orderList.push(element);
  orderNumber++;
  itemBasket = [];
}

function finishOrder() {
  convertItemBasketToOrderList();
  renderBasketItems();
  closeDialog(basketDialogRef);
  resetBasketItemsContainer();
  openSuccessfulOrder();
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

function addNote(noteIndex) {
  renderNoteCommitButtons(noteIndex);
  noteContainerRef.value = itemBasket[noteIndex].note;
  openDialog(dialogNoteRef);
}

function commitNote(index) {
  let noteToSave = noteContainerRef.value;
  itemBasket[index].note = noteToSave;
  storeItemBasketInLocalStorage();
  closeDialog(dialogNoteRef);
}

function deleteNote(index) {
  itemBasket[index].note = "";
  storeItemBasketInLocalStorage();
  closeDialog(dialogNoteRef);
}

function deleteNoteFromSummary(index) {
  itemBasket[index].note = "";
  storeItemBasketInLocalStorage();
  renderOrderSummary();
}

function createOrderID() {
  return orderID = currentTestTime.getFullYear().toString() + (currentTestTime.getMonth() + 1).toString() + currentTestTime.getDate().toString() + currentTestTime.getHours().toString();
}

function openOrderListDialog() {
  restaurantOrderContainer.showModal();
  renderKitchenOrderList();
}

function closeOrderListDialog() {
  restaurantOrderContainer.close();
}

function addAllItems() {
  clearItemBasket();
  addAllItemsFromCategory('starters');
  addAllItemsFromCategory('mainDish');
  addAllItemsFromCategory('beverages');
  addAllItemsFromCategory('dessert');
  renderBasketItems();
}

function addAllItemsFromCategory(category) {
  for (let index = 0; index < dishData[category].length; index++) {
    pushItemToBasket(category, index);
  }
}

function clearItemBasket() {
  itemBasket = [];
  renderBasketItems();
}

function announceLoadFromLocalStorage() {
  announcementContainerRef.innerHTML += `Es wird geprüft, ob es Daten im Local Storage gibt.`
}

function announceAmount(dish, action, amountNew) {
  announcementContainerRef.innerHTML += `${dish} wurde ${action}. Aktuelle Menge im Warenkorb: ${amountNew}`;
}

function announcePrice(price) {
  if (price === undefined) {
    announcementContainerRef.innerHTML += `Dein Warenkorb ist derzeit leer. `;
    announceDeliveryState();
  } else {
    announcementContainerRef.innerHTML += `Die Summe der Produkte in deinem Warenkorb beträgt: ${price}. Lieferkosten betragen: ${deliveryCost} €. `;
  }
}

function announceActiveCategory(currentActiveCategory) {
  announcementContainerRef.innerHTML += `Die aktuelle Kategorie ist: ${currentActiveCategory}. `;
}

function announceCurrentActiveCategory() {
  announcementContainerRef.innerHTML += `Die aktuelle Kategorie ist: ${currentActiveCategory}. `;
}

function announceDeliveryState() {
  let deliveryStateForAnnouncement = "";
  if (delivery === true) {
    deliveryStateForAnnouncement = "Lieferung zu dir! ";
  } else if (delivery === false) {
    deliveryStateForAnnouncement = "Abholung bei uns vor Ort! ";
  } else {
    console.log("did not find option for delivery");
  }
  announcementContainerRef.innerHTML += `Du hast folgende Einstellung für deine Bestellung ausgewählt: ${deliveryStateForAnnouncement}`;
}

function updateAriaCurrent() {
  document.querySelectorAll('#resp_menu [aria-current');
}

window.addEventListener("resize", assignHidden);
window.addEventListener("resize", adjustTabSkip);
window.addEventListener("resize", updateVW);

function updateVW() {
  vw = window.innerWidth;
}

function assignHidden() {
  let respMenuBoxRef = document.getElementById('resp_menu');
  if (vw < 1266 && hiddenState == true) {
    respMenuBoxRef.removeAttribute("hidden");
    hiddenState = false;
  } else if (vw > 1266 && hiddenState == false) {
    respMenuBoxRef.setAttribute("hidden", "");
    hiddenState = true;
  }
}

function initializeHidden() {
  let respMenuBoxRef = document.getElementById('resp_menu');
  if (vw < 1266) {
    respMenuBoxRef.removeAttribute("hidden");
    hiddenState = false;
  } else if (vw > 1266) {
    respMenuBoxRef.setAttribute("hidden", "");
    hiddenState = true;
  }
}

function adjustTabSkip() {
  let linkToMainRef = document.getElementById('skip-to-main');
  let linkToCategoryRef = document.getElementById('skip-to-category');
  let linkToCategoryHeaderMobileRef = document.getElementById('mobile-category-header');
  if (vw < 1266) {
    linkToMainRef.removeAttribute("hidden");
    linkToCategoryRef.setAttribute("hidden", "");
    linkToCategoryHeaderMobileRef.removeAttribute("hidden");
  } else if (vw > 1266) {
    linkToCategoryRef.removeAttribute("hidden");
    linkToMainRef.setAttribute("hidden", "");
    linkToCategoryHeaderMobileRef.setAttribute("hidden", "");
  }
}

function displayItemCountInBasket() {
  let totalItemCount = 0;
  itemBasket.forEach((element)=> totalItemCount+=element.dishAmount);
  mobileItemCountRef.innerHTML = `Warenkorb Öffnen! [${totalItemCount}]`;
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
    total = total.toFixed(2) + " €";
    announcePrice(total);
    return total
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