let dishCardTemplate = ` 
        <div class="outer-card-container">
            <div class="dish-card">
                <img src="/assets/img/starters/edamame.jpg" alt="Beispielbild">
                <div class="dish-text">
                    <h2>${dishData.starters[0].dishName}</h2>
                    <p>Gedämpfte junge Sojabohnen, leicht gesalzen – ein klassischer japanischer Snack.</p>
                </div>
                <div class="dish-card-price-and-button">
                    <div>Price</div>
                    <button>+</button>
                </div>
            </div>
        </div>
        `
let activeCategory = "starters";

function renderDishes(category) {
    activateCategoryActiveBorder(category);
    let dishContentRef = document.getElementById('dish-container');
    dishContentRef.innerHTML= "";
    for (let index = 0; index < dishData[category].length; index++) {
        dishContentRef.innerHTML += ` 
        <div class="outer-card-container">
            <div class="dish-card">
                <img src="${dishData[category][index].dishImageURL}" alt="Beispielbild">
                <div class="dish-text">
                    <h2>${dishData[category][index].dishName}</h2>
                    <p>${dishData[category][index].dishDescription}</p>
                </div>
                <div class="dish-card-price-and-button">
                    <div>${dishData[category][index].dishPrice.toFixed(2)} €</div>
                    <button>+</button>
                </div>
            </div>
        </div>
    `
    }
}

function activateCategoryActiveBorder(category){
    let oldButtonContentRef = document.getElementById(activeCategory);
    let newButtonContentRef = document.getElementById(category);
    oldButtonContentRef.classList.remove("active-category");
    newButtonContentRef.classList.add("active-category");
    activeCategory = category;
}

renderDishes("starters");

let favDishes = [ dishData.starters[2], dishData.starters[3], dishData.mainDish[1], dishData.mainDish[3], dishData.mainDish[4], dishData.dessert[1], dishData.dessert[0]];

function renderFavDishes() {
    let favDishContentRef = document.getElementById('favorite-dishes');
    for (let index = 0; index < favDishes.length; index++) {
        let element = favDishes[index];
        favDishContentRef.innerHTML += ` 
        <div class="outer-card-container dish-card-favorite-box">
            <div class="dish-card">
                <img src="${element.dishImageURL}" alt="${element.dishImageAlt}">
                <div class="dish-text">
                    <h2>${element.dishName}</h2>
                    <p>${element.dishDescription}</p>
                </div>
                <div class="dish-card-price-and-button-fav">
                    <div>${element.dishPrice.toFixed(2)} €</div>
                    <button>+</button>
                </div>
            </div>
        </div>
    `
    }
}

// renderFavDishes();