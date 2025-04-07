let basket = [];
let currentActivePage = "starters";

// current idea : plusOne / MinusOne / Delete = DONE
// Next step: renderBasketItems

function deleteItemFromBasket(index){
    basket.splice(index, 1);
    renderBasketItems();
}

function init() { //ADD currentBasket
    renderCurrentItems(currentActivePage);
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
    let basketContainerRef = document.getElementById('basket-container');
    basketContainerRef.innerHTML = "";
    for (let index = 0; index < basket.length; index++) {
        basketTemplate(index);
    }

    // CREATE NEW FUNCTION HERE AND STORE IN GLOBAL VARIABLE
    let totalSum = calculateSumInBasket();
    let totalSumRef = document.getElementById('total_sum');
    totalSumRef.innerHTML = totalSum;
}

function addItemToCart(category, index) {
    let object = allDishes[category][index];
    if (basket.length > 0) {
        //insertItemCheckerFunction
    } else {
        
    }
    // if object exists in basket already, do this:
    // 

    //do this, if object is not already in basket
    object.amount ++;
    basket.push(object);
    
    // Is item in basket?
    // YES = return index
    // NO = push to basket 
    // Aftewards: increase amount of last item in basket ++

    // End if else here
    
    renderBasketItems ()
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
    basket[index].amount ++;
    renderBasketItems();
}

function itemMinusOne(index){
    basket[index].amount--;
    renderBasketItems();
}

function isItemInBasket(item){
    // 
    // find item, return index
    let itemToBeChecked = item; // this is the entire object
    for (let index = 0; index < basket.length; index++) {
        let basketItem = basket[index];
        if (itemToBeChecked.dish == basketItem.dish) {
            basketItem.amount ++;
            renderBasketItems();
            break
        }
        else {
            continue
        }
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