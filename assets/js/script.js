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

let introDialog = true;

function toggleSRBox() {
  let srBoxRef = document.getElementById('basket-status').classList.toggle('sr-announcement');
}

function openIntroDialog() {
  if (introDialog === true) {
    document.getElementById('intro-dialog').showModal();
  }
}

function closeIntroDialog() {
  document.getElementById('intro-dialog').close();
}

function dontShowIntroAgain() {
  introDialog = false;
  saveIntroInfoInLS();
  closeIntroDialog();
}

function showIntroAgain() {
  introDialog = true;
  saveIntroInfoInLS();
  openIntroDialog();
}

function saveIntroInfoInLS() {
    localStorage.setItem('introDialogOption', JSON.stringify(introDialog));
}

function fetchIntroInfoFromLS() {
    introDialog = JSON.parse(localStorage.getItem("introDialogOption"));
}

function activateCategoryActiveBorder(category) {
  let oldButtonContentRef = document.querySelectorAll(`.${activeCategory}`);
  let newButtonContentRef = document.querySelectorAll(`.${category}`);
  oldButtonContentRef.forEach(box => { box.classList.remove("active-category"); });
  newButtonContentRef.forEach(box => { box.classList.add("active-category"); });
  activeCategory = category;
  announceActiveCategory(category);
}

const announcementContainerRef = document.getElementById('basket-status')

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

let respMenuState = false;

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

let delivery = false;

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

let pageContentRef = document.getElementById('page-content');
let dialogRef = document.getElementById('basket-dialog');
let mobileDialogRef = document.getElementById('mobile-basket-dialog');
let dialogNoteRef = document.getElementById('basket-note-dialog');

let dialogOpened = false;

function openDialogMobile() {
  mobileDialogRef.showModal();
  dialogOpened = true;
  blockBackgroundContent();
}

function closeDialogMobile() {
  mobileDialogRef.close();
  dialogOpened = false;
  blockBackgroundContent();
}

function openDialog() {
  mobileDialogRef.close();
  renderOrderSummary();
  dialogRef.showModal();
  dialogOpened = true;
  blockBackgroundContent();
}

function closeDialog() {
  dialogRef.close();
  dialogOpened = false;
  blockBackgroundContent();
}

function openNoteDialog() {
  dialogNoteRef.showModal();
  dialogOpened = true;
  blockBackgroundContent();
}

function closeNoteDialog() {
  dialogNoteRef.close();
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
  basketRef.forEach(box => { box.innerHTML = "Vielen Dank für deine Bestellung! Dein Essen sollte in 60 Minuten bei dir sein!"; });
}

let noteContainerRef = document.getElementById('note-text-area');

function addNote(noteIndex) {
  renderNoteCommitButtons(noteIndex);
  noteContainerRef.value = itemBasket[noteIndex].note;
  openNoteDialog();
}

function commitNote(index) {
  let noteToSave = noteContainerRef.value;
  itemBasket[index].note = noteToSave;
  storeItemBasketInLocalStorage();
  closeNoteDialog();
}

function deleteNote(index) {
  itemBasket[index].note = "";
  storeItemBasketInLocalStorage();
  closeNoteDialog();
}

function deleteNoteFromSummary(index) {
  itemBasket[index].note = "";
  storeItemBasketInLocalStorage();
  renderOrderSummary();
}

let restaurantOrderContainer = document.getElementById('order-dialog-for-restaurant');
let currentTestTime = new Date();
let orderNumber = 0;

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

let hiddenState = "";
let vw = window.innerWidth;

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