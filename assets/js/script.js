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
    itemBasket[itemIndex].dishAmount ++;
  }


  if (itemBasket.length >= 1) {
    for (let basketIndex = 0; basketIndex < itemBasket.length; basketIndex++) {
      let itemToBeChecked = itemBasket[basketIndex].dishName;
      if (itemToBeChecked == dishData[category][index].dishName) {
        itemIsInBasket = true;
      }
      else if(itemIsInBasket == true){
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
    }
    itemBasket.push(itemObjectInBasket);
  }

  function calculateTotalBasket() {
  let basketTotalRef = document.getElementById('basket-total-container');
  basketTotalRef.innerHTML="";
  let total = 0;
  for (let index = 0; index < itemBasket.length; index++) {
    let element = itemBasket[index];
    total += element.dishAmount*element.dishPrice;
  }
  total += deliveryCost;
  basketTotalRef.innerHTML = total.toFixed(2) + " €";
}

let delivery = true;

function adjustDeliveryCost() {
  if (delivery == true) {
    deliveryCost = 5;
  }
  else if (delivery == false){
    deliveryCost = 0;
  }
}

function addDeliveryCost() {
  delivery = true;
  adjustDeliveryCost();
  renderDeliveryCost();
  calculateTotalBasket();
}

function removeDeliveryCost() {
  delivery = false;
  adjustDeliveryCost();
  renderDeliveryCost();
  calculateTotalBasket();
}

function payItemsNow() {
  let basketRef = document.getElementById('basket-items-container');
  itemBasket = [];
  clearTotalAndDeliveryCost()
  basketRef.innerHTML= "";
  basketRef.innerHTML= "Vielen Dank für deine Bestellung, Sie sollte in  60 Minuten bei dir sein!";
}

function payItemsAtShop() {
  let basketRef = document.getElementById('basket-items-container');
  itemBasket = [];
  clearTotalAndDeliveryCost()
  basketRef.innerHTML= "";
  basketRef.innerHTML= "Vielen Dank für deine Bestellung, Sie sollte in  45 Minuten abholbereit sein!";
}

function clearTotalAndDeliveryCost() {
  let deliverCostRef = document.getElementById('basket-delivery-cost');
  let totalBasketRef = document.getElementById('basket-total-container');
  deliverCostRef.innerHTML = "";
  totalBasketRef.innerHTML = "";
}

function toggleItemBasketBoxes () {
  let deliverCostRef = document.getElementById('basket-delivery-cost');
  let totalContainerRef = document.getElementById('basket-total-container');
  deliverCostRef.classList.toggle('item-basket-display-none');
  totalContainerRef.classList.toggle('item-basket-display-none');
}

let dialogRef = document.getElementById('basket-dialog');

function openDialog() {
  dialogRef.showModal();
}

function closeDialog() {
  dialogRef.close();
}

let orderList = [];

function finishOrder(){
  orderList.push(itemBasket);
  itemBasket = [];
  let containerRef = document.getElementById('basket-item-container');
  containerRef.innerHTML = "";
  console.log(orderList);
  dialogRef.close();
}