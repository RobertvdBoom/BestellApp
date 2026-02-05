function init() {
  renderDishes(activeCategory);
  renderFavDishes();
  fetchLocalStorage();
  renderBasketItems();
  fetchLocalStorage();
  // load local storage & 
}

function activateCategoryActiveBorder(category) {
    let oldButtonContentRef = document.querySelectorAll(`.${activeCategory}`);
    let newButtonContentRef = document.querySelectorAll(`.${category}`);
    oldButtonContentRef.forEach(box => {box.classList.remove("active-category");});
    newButtonContentRef.forEach(box => {box.classList.add("active-category");});
    activeCategory = category;
    announceActiveCategory(category);
}

// WCAG Screenreader Announcement
const announcementContainerRef = document.getElementById('basket-status')
function announceAmount(dish, action, amountNew) {
  announcementContainerRef.innerHTML = `${dish} wurde ${action}. Aktuelle Menge im Warenkorb: ${amountNew}`
}

function announceActiveCategory(currentActiveCategory) {
  announcementContainerRef.innerHTML = `Die aktuelle Kategorie ist: ${currentActiveCategory}`;
}

function announceDeliveryState() {
  announcementContainerRef.innerHTML = `Die aktuelle Kategorie ist: ${currentActiveCategory}`;
}

function updateAriaCurrent() {
  document.querySelectorAll('#resp_menu [aria-current');
}

//WCAG SCREENREADER / 

function toggleRespMenu() {
  let respMenuRef = document.getElementById("resp_menu");
  respMenuRef.classList.toggle("resp_menu_closed");
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



function isInBasket(category, index) {
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
  if (itemIsInBasket == false) {
    pushItemToBasket(category, index);
  } else {
    itemBasket[itemIndex].dishAmount++;
  }
  if (itemBasket.length >= 1) {
    for (let basketIndex = 0; basketIndex < itemBasket.length; basketIndex++) {
      let itemToBeChecked = itemBasket[basketIndex].dishName;
      if (itemToBeChecked == dishData[category][index].dishName) {
        itemIsInBasket = true;
      }
      else if (itemIsInBasket == true) {
        itemBasket[basketIndex]
      }
    }
  }
  else {
    pushItemToBasket(category, index);
  }
  storeItemBasketInLocalStorage();
  renderBasketItems();
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

let delivery = false;

function setDeliveryBoxActive() {
  let deliveryBoxRef =  document.querySelectorAll('.delivery-option-button');
  let pickupBoxRef =  document.querySelectorAll('.pickup-option-button');

  if (delivery == true) {
    deliveryBoxRef.forEach(box => { box.classList.add("active-category");});
    pickupBoxRef.forEach(box => { box.classList.remove("active-category");});
  }
  else if (delivery == false) {
    pickupBoxRef.forEach(box => { box.classList.add("active-category");});
    deliveryBoxRef.forEach(box => { box.classList.remove("active-category");});
  }
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
  adjustDeliveryCost();
  renderDeliveryCost();
  calculateTotalBasket();
  setDeliveryBoxActive();
}

function removeDeliveryCost() {
  delivery = false;
  adjustDeliveryCost();
  renderDeliveryCost();
  calculateTotalBasket();
  setDeliveryBoxActive();
}

let dialogRef = document.getElementById('basket-dialog');
let mobileDialogRef = document.getElementById('mobile-basket-dialog');

function openDialogMobile() {
  mobileDialogRef.showModal();
}

function closeDialogMobile () {
  mobileDialogRef.close();
}

function openDialog() {
  renderOrderSummary();
  dialogRef.showModal();
}

function closeDialog() {
  dialogRef.close();
}

let orderList = [];

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
  closeDialog();
  resetBasketItemsContainer();
}

function resetBasketItemsContainer() {
  let basketRef = document.querySelectorAll('.basket-items-anchor');
  basketRef.forEach(box => {box.innerHTML ="Vielen Dank für deine Bestellung! Dein Essen sollte in 60 Minuten bei dir sein!";});
}

// FULL NOTE SECTION
// click -> render note buttons new -> insert current note -> open dialog
let dialogNoteRef = document.getElementById('basket-note-dialog');
let noteContainerRef = document.getElementById('note-text-area');

function openNoteDialog() {
  dialogNoteRef.showModal();
}

function closeNoteDialog() {
  dialogNoteRef.close();
}

function addNote(noteIndex) {
  renderNoteCommitButtons(noteIndex);
  noteContainerRef.value = itemBasket[noteIndex].note;
  openNoteDialog();
}

function commitNote(index) {
  let noteToSave = noteContainerRef.value;
  itemBasket[index].note = noteToSave;
  closeNoteDialog();
}

function deleteNote(index) {
  itemBasket[index].note = "";
  closeNoteDialog();
}

// restaurant side dialog + budget backend '-'
let currentTestTime = new Date();
let orderNumber = 0;

function createOrderID() {
  return orderID = currentTestTime.getFullYear().toString() + (currentTestTime.getMonth() + 1).toString() + currentTestTime.getDate().toString() + currentTestTime.getHours().toString();
}

let restaurantOrderContainer = document.getElementById('order-dialog-for-restaurant');

function openOrderListDialog() {
  restaurantOrderContainer.showModal();
  renderKitchenOrderList();
}

function closeOrderListDialog() {
  restaurantOrderContainer.close();
}

function addAllItems() {
  clearItemBasket();
  for (let index = 0; index < dishData.length; index++) {
    let element = dishData[index];
    let x = index;
    for (let index1 = 0; index1 < element.length; index1++) {
      pushItemToBasket(dishData[x], index1);
    }
  }
}

function clearItemBasket() {
  itemBasket = [];
}