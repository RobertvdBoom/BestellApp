let basket = [{ dish: "Carpaccio vom Rind", price: 9.00, description: "Dünne Rindfleischscheiben mit Parmesan und Rucola.", amount: 0, "imageURL" : "img/starters/rinder carpaccio.jpg" }];
let currentActivePage = "starters";

// Check Local Storage Function
//save currentActivePage to localStorage to keep the items on reloading

function init() { //ADD currentBasket
    renderCurrentItems(currentActivePage);
    basketTemplate(0);
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


function scrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }


function renderCart(){
    for (let index = 0; index < basket.length; index++) {
        const element = basket[index];
        
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
    logCart();
}

// FOR ITEM IN CART: ADD basketItem to Basket Container
// renderBasket


// pushItemToCart (take object, use Name, Price, Amount, Total)
// itemInBasketCheck

// updateBasket


// itemPlusOne // same button as in basket
// itemMinusOne // only in basket
// updateItemInBasket




// delete item from basket (just use pop item?)

// 

// check amount in basket













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