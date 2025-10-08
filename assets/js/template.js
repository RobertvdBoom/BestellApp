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