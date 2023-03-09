let meals = [];
let prices = [];
let amounts = [];
let sales = [];
let scrollX = 0;
let scrollY = 0;


function onTop() {
    window.scrollTo(0, 0);
}


function getXPosition() {
    scrollX = window.scrollX;
    return scrollX;
}


function getYPosition() {
    scrollY = window.scrollY;
    return scrollY;
}


function backToPosition(x, y) {
    window.scrollTo(x, y);
}


function removeClassById(anyId, removeClass) {
    document.getElementById(anyId).classList.remove(removeClass);
}


function addClassById(anyId, addClass) {
    document.getElementById(anyId).classList.add(addClass);
}


function getContentById(anyId) {
    let content = document.getElementById(anyId).innerHTML;
    return content;
}


function setContentById(anyId, content) {
    document.getElementById(anyId).innerHTML = content;
}


function setFormatedValueById(anyId, value) {
    value = value.toFixed(2).replace('.', ',');
    document.getElementById(anyId).innerHTML = value;
}


function getReplyContainsClass(anyId, containsClass) {
    let reply = document.getElementById(anyId).classList.contains(containsClass);
    return reply;
}


function changeClassByCheck(value1st, value2nd, anyId, removeClass, addClass) {
    if (value1st == value2nd) {
        removeClassById(anyId, removeClass);
    } else {
        addClassById(anyId, addClass);
    }
}


function switchBasket() {
    let value1st = getReplyContainsClass('contentRight', 'showBasket');
    let value2nd = true;
    changeClassByCheck(value1st, value2nd, 'contentRight', 'showBasket', 'showBasket');
}


function showBasket() {
    addClassById('contentRight', 'showBasket');
}


function closeBasket() {
    removeClassById('contentRight', 'showBasket');
    backToPosition(scrollX, scrollY);
}


function showEmptyBasket() {
    removeClassById('emptyBasket', 'hidden');
    setContentById('subtotal', '');
    setContentById('total', '');
    setContentById('totalBasketButton', '0,00');
}


function createIdWithIndex(text, i) {
    let newId = text + i;
    return newId;
}


function getContentByTextId(text, i) {
    let newMeal = getContentById(createIdWithIndex(text, i));
    return newMeal;
}


function getValueByTextId(text, i) {
    let newPrice = +getContentById(createIdWithIndex(text, i));
    return newPrice;
}


function addToBasket(i) {
    getXPosition();
    getYPosition();
    if (getMealIndex(i) == -1) {
        addNewMealToBasket(getContentByTextId('meal', i), getValueByTextId('price', i));
    } else {
        checkAmountAndCalcMeal(getMealIndex(i));
    }
    showBasket();
}


function checkAmountAndCalcMeal(i) {
    let newAmount = calcNewAmount(i);
    if (newAmount > 12) {
        amounts[i] = 12;
        renderBasket();
    } else {
        updateBasket(i)
    }
}


function calcSale(i) {
    sales[i] = amounts[i] * prices[i];
    sales[i] = +sales[i];
}


function calcNewAmount(i) {
    amounts[i] = amounts[i] + 1;
    newAmount = +amounts[i];
    return newAmount;
}


function amountMinus(i) {
    amounts[i] = amounts[i] - 1;
    if (amounts[i] <= 1) {
        amounts[i] = 1;
    }
    updateBasket(i);
}


function amountPlus(i) {
    amounts[i] = amounts[i] + 1;
    if (amounts[i] > 12) {
        amounts[i] = 12;
    }
    updateBasket(i);
}


function addNewMealToBasket(addMeal, addPrice) {
    addClassById('emptyBasket', 'hidden');
    pushMeal(addMeal, addPrice)
    renderBasket();
}


function pushMeal(addMeal, addPrice) {
    meals.push(addMeal);
    prices.push(addPrice);
    amounts.push(1);
    sales.push(addPrice);
}


function deleteMeal(i) {
    spliceMeal(i);
    checkBusket();
    renderBasket();
}


function spliceMeal(i) {
    amounts.splice(i, 1);
    meals.splice(i, 1);
    prices.splice(i, 1);
    sales.splice(i, 1);
}


function updateBasket(i) {
    calcSale(i);
    renderBasket();
}


function checkBusket() {
    if (amounts.length == 0) {
        showEmptyBasket();
    }
}


function getMealIndex(i) {
    let mealIndex = meals.indexOf(getContentById(createIdWithIndex('meal', i)));
    return mealIndex;
}


function renderBasket() {
    setContentById('basket', '');
    for (let i = 0; i < meals.length; i++) {
        let meal = meals[i];
        let amount = amounts[i];
        let sale = sales[i];
        sale = sale.toFixed(2).replace('.', ',');
        document.getElementById('basket').innerHTML += generateBasketHTML(i, meal, amount, sale);
        updateBasketSum();
    }
}


function updateBasketSum() {
    setContentById('subtotal', '');
    let sum = 0;
    for (let i = 0; i < sales.length; i++) {
        sum += sales[i];
        sum = +sum;
    }
    let totalSum = sum + 1;
    setFormatedValueById('subtotal', sum);
    setFormatedValueById('total', totalSum);
    setFormatedValueById('totalBasketButton', totalSum);
}


function generateBasketHTML(i, meal, amount, sale) {
    return `
    <tr class="basketRow">
        <td class="basketText">${amount}x</td>
        <td class="basketText bold">${meal}</td>
        <td>
            <div class="plusMinus">
                <button onclick="amountMinus(${i})"><img src="img/minus.png"></button>
                <button onclick="amountPlus(${i})"><img src="img/plus.png"></button>
            </div>        
        </td>
        <td class="basketText">${sale} €</td>
        <td>
            <div class="deleteMeal">
                <button onclick="deleteMeal(${i})")><img src="img/waste.png"</button>
            </div>    
        </td>
    </tr>
    `;
}

// Lösung mit position: sticky;

// window.onscroll = function () {
    // let shoppingCard = document.getElementById('contentRight');
    // let position;
// 
    // if (window.scrollY > 0) {
        // position = 0
        // shoppingCard.style = `top: ${position}` + 'px';
    // } else {
        // position = 76;
        // shoppingCard.style = `top: ${position}` + 'px';
    // }
// 
// }

