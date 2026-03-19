function returnDishCard(category, index) { 
    return ` 
        <div class="outer-card-container">
            <div class="dish-card">
                <img src="${dishData[category][index].dishImageURL}" alt="">
                <div class="dish-text">
                    <h2>${dishData[category][index].dishName}</h2>
                    <p>${dishData[category][index].dishDescription}</p>
                </div>
                <div class="dish-card-price-and-button">
                    <div>${dishData[category][index].dishPrice.toFixed(2)} €</div>
                    <button aria-label="Menge erhöhen: ${dishData[category][index].dishName}" onclick="addToBasket('${category}', ${index})">+</button>
                </div>
            </div>
        </div>
    `;
}

function returnFavDishCard(category, index, favDishID) { 
    return ` 
        <li class="outer-card-container dish-card-favorite-box">
            <article class="dish-card" aria-labelledby="${favDishID}">
                <img src="${dishData[category][index].dishImageURL}" alt="${dishData[category][index].dishImageAlt}">
                <div class="dish-text">
                    <h3 id="${favDishID}">${dishData[category][index].dishName}</h3>
                    <p>${dishData[category][index].dishDescription}</p>
                </div>
                <div class="dish-card-price-and-button">
                    <p class="padding-l-20">${dishData[category][index].dishPrice.toFixed(2)} €</p>
                    <button aria-label="Menge erhöhen: ${dishData[category][index].dishName}" onclick="addToBasket('${favDishes[index].category}', ${index})">+</button>
                </div>
            </article>
        </li>
    `;
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
        content += `
                    <div class="basket-item">
                        <div class="ds-flex-basket-l">
                            <h3>${element.dishName}</h3>
                            <button onclick="addNote(${index})" aria-label="Ich möchte eine Anmerkung zu ${element.dishName} hinzufügen, oder ändern!" aria-haspopup="dialog" aria-controls="basket-note-dialog">Notiz!</button>
                        </div>
                        <div class="ds-flex-basket-r">
                            <span>${elementTotal} €</span>
                            <div class="item-basket-buttons-container">
                                <button class="basket-trash-btn" onclick="itemFromBasketToTrash(${index})" aria-label="${element.dishName} aus dem Warenkorb entfernen?">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                </svg>
                                </button>
                                <button onclick="itemMinusOne(${index})" aria-label="${element.dishName} um 1 reduzieren? Aktuelle Menge: ${element.dishAmount}">
                                    <span aria-hidden="true">-</span>
                                </button>
                                <span>${element.dishAmount}</span>
                                <button onclick="itemPlusOne(${index})" aria-label="${element.dishName} um 1 erhöhen? Aktuelle Menge: ${element.dishAmount}">
                                    <span aria-hidden="true">+</span>
                                </button>
                            </div>
                        </div>
                    </div>`
    }
    return content;
}