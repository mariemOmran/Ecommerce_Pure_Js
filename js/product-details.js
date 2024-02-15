// header or nav bar 
//handel car count
let NumberOfcar = document.querySelector('.car span');
let countCar = 0;
if (sessionStorage.getItem("totalQuantity")) {
  countCar = JSON.parse(sessionStorage.getItem("totalQuantity"));
  NumberOfcar.innerHTML = countCar;
}
//handel number of product 
let numberOfProduct = document.querySelector('.add label');
if (sessionStorage.getItem(window.location.href.slice(window.location.href.indexOf("=") + 1))) {
  numberOfProduct.innerHTML = JSON.parse(sessionStorage.getItem(window.location.href.slice(window.location.href.indexOf("=") + 1))).quantity;
}
//menue in navbar
let minueIcone = document.getElementById("icon-menue");
let closeIcone = document.getElementById("close-icon");
let navbar = document.querySelector(".navbar");
let links = document.querySelectorAll('.navbar a');
minueIcone.addEventListener('click', (e) => {
  e.target.style.display = "none";
  closeIcone.style.display = "block";
  navbar.classList.add('clickNavbar');
  links.forEach((a) => {
    a.style.transitionDelay = `calc(.10s * ${a.dataset.num})`;
    a.classList.add('clickLink');
  })
});
closeIcone.addEventListener('click', (e) => {
  navbar.classList.remove('clickNavbar');
  e.target.style.display = "none";
  minueIcone.style.display = "block";
  links.forEach((a) => {
    a.style.transitionDelay = ``;
    a.classList.remove('clickLink');
  })
});

// header or nav bar 


const mainImage = document.querySelector('img.slide');
const leftSideOptionImage = document.querySelector('div.option');
const nameOfProduct = document.querySelector(".right >h3");
const rightDiv = document.querySelector(".right");
const priceOfProduct = document.querySelector(".right> h4");
const productDetails = document.querySelector(".right >p");
const quantatiyLabel = document.querySelector(".add > label");
const buttonAddToCart = document.querySelector("button");
function getIdProduct() {
  let id = parseInt(window.location.href.slice(window.location.href.indexOf("=") + 1));

  fetch(`https://phones-laptops.vercel.app/products/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Process the JSON data
      console.log(data);
      createHtmDetailsProducts(data)
      funtionSmallImage()
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}
getIdProduct();

function createHtmDetailsProducts(product) {
  mainImage.setAttribute('src', product.image);
  product.list_images.forEach(element => {
    let optionImage = document.createElement('img');

    optionImage.setAttribute('src', element);
    leftSideOptionImage.appendChild(optionImage);

  });
  nameOfProduct.innerHTML = product.name;
  priceOfProduct.appendChild(document.createTextNode(product.price));
  productDetails.innerHTML = product.description;
  rightDiv.setAttribute('id', product.id)

  let addSpan = document.querySelector('.plus');
  let removeSpan = document.querySelector('.minus');
  let qu = 0;
  addSpan.addEventListener('click', () => {
    const idElement = addSpan.parentElement.parentElement.getAttribute('id');
    if (!sessionStorage.getItem(idElement)) {
      // Create an object with id and quantity
      let item = { quantity: 1 };

      // Convert the object to a JSON string
      let itemJSON = JSON.stringify(item);
      // Save the JSON string in the session storage
      sessionStorage.setItem(idElement, itemJSON);
      qu = 1;
    } else {
      const itemJSON = sessionStorage.getItem(idElement);
      let item = JSON.parse(itemJSON);
      qu = item.quantity;
      qu += 1;
      item.quantity = qu;
      sessionStorage.setItem(idElement, JSON.stringify(item));
    }
    quantatiyLabel.innerHTML = qu;
    countCar += 1;
    sessionStorage.setItem('totalQuantity', JSON.stringify(countCar))
    NumberOfcar.innerHTML = countCar;
  });

  removeSpan.addEventListener('click', () => {
    const idElement = removeSpan.parentElement.parentElement.getAttribute('id');
    if (sessionStorage.getItem(idElement) && JSON.parse(sessionStorage.getItem(idElement)).quantity > 0) {
      console.log('yes');
      const itemJSON = sessionStorage.getItem(idElement);
      let item = JSON.parse(itemJSON);
      qu = item.quantity;
      qu -= 1;
      item.quantity = qu;
      sessionStorage.setItem(idElement, JSON.stringify(item));
      countCar -= 1;
      sessionStorage.setItem('totalQuantity', JSON.stringify(countCar));
    }
    quantatiyLabel.innerHTML = qu;
    NumberOfcar.innerHTML = countCar;
  });
}
function funtionSmallImage() {
  let smallImage = document.querySelectorAll('div.option img');
  smallImage.forEach(e => {
    console.log(e);
    e.onclick = () => {
      img(e.getAttribute('src'));
    }
  })
}
function img(anything) {
  document.querySelector('.slide').src = anything;
}

function change(change) {
  const line = document.querySelector('.home');
  line.style.background = change;
}