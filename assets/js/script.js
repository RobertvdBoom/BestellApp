function toggleRespMenu() {
  document.getElementById("resp_menu").classList.toggle("resp_menu_closed");
}

function itemPlusOne(index) {
  itemBasket[index].dishAmount++;
  renderBasketItems();
}

function itemMinusOne(index) {
  itemBasket[index].dishAmount--;
  if (itemBasket[index].dishAmount <= 0) {
    itemBasket.splice(index, 1);
    renderBasketItems();
  }
  else {
    renderBasketItems();
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
// JUST FOR REFERENCE: 
  // document.querySelectorAll(".delivery-option-button").forEach(box => {
  // box.classList.add("active");});

  // document.querySelectorAll(".pickup-option-button").forEach(box => {
  // box.classList.add("active");});

//UPDATE FROM HERE
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
//UPDATE UNTIL HERE


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

// Check usability up to next section 
function payItemsNow() {
  let basketRef = document.getElementById('basket-items-container');
  itemBasket = [];
  clearTotalAndDeliveryCost()
  basketRef.innerHTML = "";
  basketRef.innerHTML = "Vielen Dank für deine Bestellung, Sie sollte in  60 Minuten bei dir sein!";
}

function payItemsAtShop() {
  let basketRef = document.getElementById('basket-items-container');
  itemBasket = [];
  clearTotalAndDeliveryCost()
  basketRef.innerHTML = "";
  basketRef.innerHTML = "Vielen Dank für deine Bestellung, Sie sollte in  45 Minuten abholbereit sein!";
}

function clearTotalAndDeliveryCost() {
  let deliverCostRef = document.getElementById('basket-delivery-cost');
  let totalBasketRef = document.getElementById('basket-total-container');
  deliverCostRef.innerHTML = "";
  totalBasketRef.innerHTML = "";
}

// up to here


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

function finishOrder() {
  convertItemBasketToOrderList();
  renderBasketItems();
  closeDialog();
  resetBasketItemsContainer();
}

function convertItemBasketToOrderList() {
  let timeOfOrder = new Date();
  let element = { orderTime: timeOfOrder, orderItems: itemBasket, oderID: (Number(createOrderID()) + orderNumber) };
  orderList.push(element);
  orderNumber++;
  itemBasket = [];
}

// Not even using this one here currently tho
// rework for reference on this and index html
function resetBasketItemsContainer() {
  let basketRef = document.querySelectorAll('.basket-items-anchor');
  basketRef.forEach(box => {box.innerHTML ="Vielen Dank für deine Bestellung! Dein Essen sollte in 60 Minuten bei dir sein!";});
  // basketRef.innerHTML = "Vielen Dank für deine Bestellung! Dein Essen sollte in 60 Minuten bei dir sein!";
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


// save order List to Local Storage

