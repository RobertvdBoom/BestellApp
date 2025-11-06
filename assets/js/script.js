function toggleRespMenu() {
  document.getElementById("resp_menu").classList.toggle("resp_menu_closed");
}

function itemPlusOne(index) {
  inventory[index].quantity++;
  console.log(inventory[index].quantity);
  renderAmount(index);
}

function itemMinusOne(index) {
  inventory[index].quantity--;
  console.log(inventory[index].quantity);
  if (inventory[index].quantity !== 0) {
    renderAmount(index);
  }
  else {
    inventory.splice(index, 1);
    console.log(inventory[index]);
  }
}

function isInBasket(category, index) {
  if (itemBasket.length >= 1) {
    for (let basketIndex = 0; basketIndex < itemBasket.length; basketIndex++) {
      let itemToBeChecked = itemBasket[basketIndex].dishName;
      if (itemToBeChecked == dishData[category][index].dishName) {
        console.log("item is in Basket already, add it up");
        itemBasket[basketIndex].dishAmount ++;
        break
      }
      else {
        continue;
      }
    }
  }
  else {
    console.log("item was not yet in basket, therefore added")
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