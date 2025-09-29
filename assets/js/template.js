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


function renderDishes(category) {
    let dishContentRef = document.getElementById('dish-container');
    dishContentRef.innerHTML= "";
    for (let index = 0; index < dishData[category].length; index++) {
        dishContentRef.innerHTML += ` 
        <div class="outer-card-container">
            <div class="dish-card">
                <img src="/assets/img/starters/edamame.jpg" alt="Beispielbild">
                <div class="dish-text">
                    <h2>${dishData[category][index].dishName}</h2>
                    <p>${dishData[category][index].dishDescription}</p>
                </div>
                <div class="dish-card-price-and-button">
                    <div>${dishData[category][index].dishPrice}</div>
                    <button>+</button>
                </div>
            </div>
        </div>
    `
    }   
}

function renderCard(category, index) {
    ` 
        <div class="outer-card-container">
            <div class="dish-card">
                <img src="/assets/img/starters/edamame.jpg" alt="Beispielbild">
                <div class="dish-text">
                    <h2>${dishData[category][index].dishName}</h2>
                    <p>${dishData[category][index].dishDescription}</p>
                </div>
                <div class="dish-card-price-and-button">
                    <div>${dishData[category][index].dishPrice}</div>
                    <button>+</button>
                </div>
            </div>
        </div>
    `
}