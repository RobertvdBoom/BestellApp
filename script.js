let basket = [{"dish" : "Bruschetta"}];

function setPageActive(category){
    document.getElementById('link-starters').classList.remove('nav-list-active');
    document.getElementById('link-gourmetMainCourses').classList.remove('nav-list-active');
    document.getElementById('link-desserts').classList.remove('nav-list-active');
    document.getElementById('link-drinks').classList.remove('nav-list-active');
    let navItemRef = document.getElementById(`link-${category}`);
    navItemRef.classList.add('nav-list-active')
    
    document.getElementById('item_container').innerHTML = "";
    renderCurrentItems(category);
}

function renderCurrentItems (category) {
    let currentDishArray = allDishes[category];
    for (let index = 0; index < currentDishArray.length; index++) {
        dishTemplate(category, index);
    }
}

renderCurrentItems("starters");

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
    // if dish : dishname is in cart:
    // add ob
    let newItem = allDishes
    basket.push(newItem);
}

console.log(checkCartItems("Bruschetta"));

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