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

function renderBasketItems () {
    for (let index = 0; index < basket.length; index++) {
        basketTemplate(index);
    }
    let totalSum = calculateSumInBasket();
    let totalSumRef = document.getElementById('total_sum');
    totalSumRef.innerHTML = totalSum;
}

function addItemToCart(category, index) {
    let object = allDishes[category][index];
    allDishes[category][index].amount ++;
    basket.push(object);

    //basket checker function
}

function calculateSumInBasket(){
    let totalSumInBasket = 0;
    for (let index = 0; index < basket.length; index++) {
        let currentItemSum = basket[index].price * basket[index].amount;
        totalSumInBasket += currentItemSum;
    }
    return totalSumInBasket;
}

function itemPlusOne(index){
    basket[index].amount++;
    renderBasketItems();
}

function itemMinusOne(index){
    basket[index].amount--;
    renderBasketItems();
}

function isItemInBasket(item){
    let itemToBeChecked = item; // this is the entire object
    for (let index = 0; index < basket.length; index++) {
        let basketItem = basket[index];
        
        // if item is == basket Item, basketItem[index].amount ++
    }
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