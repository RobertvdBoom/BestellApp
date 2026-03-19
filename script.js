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