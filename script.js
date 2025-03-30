let basket = [{ dish: "Carpaccio vom Rind", price: 9.00, description: "Dünne Rindfleischscheiben mit Parmesan und Rucola.", amount: 0, "imageURL" : "img/starters/rinder carpaccio.jpg" }];
let currentActivePage = "starters";

function init() { //ADD currentBasket
    renderCurrentItems(currentActivePage);
    basketTemplate(0);
}

function scrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

function setPageActive(category){
    currentActivePage = category;
    document.getElementById('link-starters').classList.remove('nav-list-active');
    document.getElementById('link-gourmetMainCourses').classList.remove('nav-list-active');
    document.getElementById('link-desserts').classList.remove('nav-list-active');
    document.getElementById('link-drinks').classList.remove('nav-list-active');
    let navItemRef = document.getElementById(`link-${category}`);
    navItemRef.classList.add('nav-list-active')
    document.getElementById('item_container').innerHTML = "";
    renderCurrentItems(category);
    scrollTop();
}

function renderCurrentItems (category) {
    let currentDishArray = allDishes[category];
    for (let index = 0; index < currentDishArray.length; index++) {
        dishTemplate(category, index);
    }
}

// TEST AREA // TEST AREA // TEST AREA // TEST AREA // TEST AREA // TEST AREA 
function checkCartItems(dish){
    for (let index = 0; index < basket.length; index++) {
        isInCart(dish, basket[index]);
    }
}

function isInCart(dish, basketDish){
    if (dish == basketDish) {
        return true;
    }
}

function addItemToCart(category, index) {
    let object = allDishes[category][index];
    basket.push(object);
}


// Price STYLING SECTION START
function stylePrice(number) {
    let num = number;
    num = twoDigits(num);
    num = replacePriceDot(num);
    return num;
}

function twoDigits (number){
    return Number.parseFloat(number).toFixed(2);
}

function replacePriceDot(number){
    return number.replace(".", ",");
}
// Price STYLING SECTION END