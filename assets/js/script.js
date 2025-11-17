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