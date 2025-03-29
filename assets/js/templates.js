function dishTemplate(category, index) {
  let itemContainerRef = document.getElementById('item_container');
  let price = allDishes[category][index].price;
  price = stylePrice(price);

  itemContainerRef.innerHTML += `
    <div class="wrapper-1440 container-fluid">
      <div class="card dish-container">
        <img src="${allDishes[category][index].imageURL}" class="dish-image">
        <div class="card-body">
          <h4>${allDishes[category][index].dish}</h4>
          <p class="card-text">${allDishes[category][index].description}</p>
        </div>
        <div class="dish-add-btn-and-price">
          <button class="btn btn-outline-basket" onclick="addItemToCart('${currentActivePage}', ${index})">+</button>
          <p>${price} €</p>
        </div>
      </div>
    </div> `
}

function basketTemplate(index) {
  let basketContainerRef = document.getElementById('basket-container');

  basketContainerRef.innerHTML += `
  <div class="basket-card">
        <div class="basket-left-right">
          <h5>${basket[index].dish}</h5>
          <div class="ds-flex">
            <button onclick="itemPlusOne()">+</button>
            <p id="amount_in_basket_0">Amount</p>
            <button onclick="itemPlusOne()">-</button>
            trash
          </div>
        </div>
        <div class="basket-left-right">
          <h5>Item Amount</h5>
          <h5>Item Total Price</h5>
        </div>
      </div>`
}