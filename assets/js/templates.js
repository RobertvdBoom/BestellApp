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
          <button class="btn btn-outline-basket" onclick="addItemToCart(${allDishes[category][index].dish})">+</button>
          <p>${price} €</p>
        </div>
      </div>
    </div> `
}