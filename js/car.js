// Get the keys stored in the session storage
const keys = Object.keys(sessionStorage);
console.log(keys.length);
const counterProduct = document.querySelector('.counter-inner')
const arrayIdAndPrice = [];
const h5 = document.createElement('h5');

// Iterate over the keys and retrieve their corresponding values
keys.forEach(key => {
    const value = sessionStorage.getItem(key);
    fetch(`http://localhost:3000/products/${key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            // Process the JSON data
            arrayIdAndPrice.push({ id: data.id, price: data.price })
            createProduct(data);
            counterProduct.appendChild(h5);
            increaseQuantity();
            totalPrice();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    console.log(`Key: ${key}, Value: ${value}`);
    console.log(arrayIdAndPrice)
});
function createProduct(product) {
    let divTotalProducts = document.createElement('div');
    divTotalProducts.classList.add("total-product");
    divTotalProducts.setAttribute('id', product.id);

    let img = document.createElement('img');
    img.setAttribute('src', product.image);
    divTotalProducts.appendChild(img);

    let containerNamePrice = document.createElement('div');
    containerNamePrice.classList.add('divBtnIorD')

    let nameOfProduct = document.createElement('h5');
    nameOfProduct.textContent = product.name;
    containerNamePrice.appendChild(nameOfProduct);

    let priceOfProduct = document.createElement('h5');
    priceOfProduct.appendChild(document.createTextNode(`Price :$${product.price}`));
    containerNamePrice.appendChild(priceOfProduct);

    let divBtns = document.createElement("div");
    divBtns.classList.add("btns_quantity");


    let minsBtn = document.createElement('button')
    minsBtn.classList.add('btn');
    minsBtn.classList.add('mins');
    minsBtn.textContent = "-";
    divBtns.appendChild(minsBtn);

    const itemJSON = sessionStorage.getItem(product.id);
    let item = JSON.parse(itemJSON);
    let qu = item.quantity;
    let inputNumber = document.createElement('input');
    inputNumber.setAttribute("type", "number");
    inputNumber.setAttribute("class", "input");
    inputNumber.setAttribute("value", qu);
    divBtns.appendChild(inputNumber);

    let plusButn = document.createElement('button')
    plusButn.classList.add('btn');
    plusButn.classList.add('plus');
    plusButn.textContent = "+";
    divBtns.appendChild(plusButn);

    containerNamePrice.appendChild(divBtns);
    divTotalProducts.appendChild(containerNamePrice)
    counterProduct.appendChild(divTotalProducts);
}

function increaseQuantity() {

    const totalBtnMins = document.querySelectorAll('.mins');
    const totalBtnPlus = document.querySelectorAll('.plus');
    console.log(totalBtnMins);
    totalBtnMins.forEach(e => {
        e.removeEventListener('click', handleMinusClick);
        e.addEventListener('click', handleMinusClick);
    })
    totalBtnPlus.forEach(e => {
        e.removeEventListener('click', handlePlusClick);
        e.addEventListener('click', handlePlusClick);
    })
}


function handleMinusClick(event) {
    productCount(false, event.target);
}

function handlePlusClick(event) {
    productCount(true, event.target);
}


// function increaseQuantity() {

//     const totalBtnMins = document.querySelectorAll('.mins');
//     const totalBtnPlus = document.querySelectorAll('.plus');
//     console.log(totalBtnMins);
//     totalBtnMins.forEach(e => {
//         e.addEventListener('click', (event) => {
//             debugger;
//             productCount(false, event.target);
//         })
//     })
//     totalBtnPlus.forEach(e => {
//         e.addEventListener('click', (event) => {
//             productCount(true, event.target);
//         })
//     })
// }




function productCount(product, e) {
    const idElement = e.parentElement.parentElement.parentElement.getAttribute("id");
    const itemJSON = sessionStorage.getItem(idElement);
    let item = JSON.parse(itemJSON);
    let qu = item.quantity;

    const inputBtn = e.parentElement.querySelector('.input').value;
    const newInputBtn = parseInt(inputBtn);
    console.log(e.parentElement);
    console.log(e.parentElement.querySelector('.input'));
    console.log(inputBtn);
    let total = newInputBtn;
    if (product == true) {
        qu++;
        item.quantity = qu;
        total = newInputBtn + 1;
        totalPrice();
    }
    if (product == false && newInputBtn > 0) {
        total = newInputBtn - 1;
        qu--;
        item.quantity = qu;
        totalPrice();
    }
    sessionStorage.setItem(idElement, JSON.stringify(item));
    e.parentElement.querySelector('.input').value = total;
}

function totalPrice() {
    let total = 0;
    console.log(arrayIdAndPrice);
    arrayIdAndPrice.forEach(e => {
        let price = e.price;
        console.log(price)
        let id = e.id;
        let quantity = JSON.parse(sessionStorage.getItem(e.id)).quantity;
        console.log(quantity)
        total += (quantity * price);
    })
    h5.textContent = `Total is :$${total}`;
}