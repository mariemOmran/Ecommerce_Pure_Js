//handel car count
let NumberOfcar = document.querySelector('.car span');
let countCar = 0;
if (sessionStorage.getItem("totalQuantity")) {
    countCar = JSON.parse(sessionStorage.getItem("totalQuantity"));
    NumberOfcar.innerHTML = countCar;
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
// slider
let list = document.querySelector('.sliderImages .img');
let items = document.querySelectorAll('.sliderImages .img img');
let dots = document.querySelectorAll('.sliderImages .dots li');
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let active = 0;
let lengthItems = items.length - 1;
next.onclick = () => {
    if (active + 1 > lengthItems) {
        active = 0;
    } else {
        active += 1;
    }
    reloadSlider();
}
prev.onclick = () => {
    if (active - 1 < 0) {
        active = lengthItems;
    } else {
        active -= 1;
    }
    reloadSlider();
}
let refershSlider = setInterval(() => {
    next.click()
}, 5000)
function reloadSlider() {
    let checkleft = items[active].offsetLeft;
    list.style.left = -checkleft + "px";
    let lastActiveDot = document.querySelector('.sliderImages .dots li.active');
    lastActiveDot.classList.remove('active');
    dots[active].classList.add('active');
    clearInterval(refershSlider);
    refershSlider = setInterval(() => {
        next.click()
    }, 5000)
}
dots.forEach((li, key) => {
    li.addEventListener('click', () => {
        active = key;
        reloadSlider();
    })
});


//fetch products
const productsContainer = document.querySelector('.pic-category');
function createProductDiv(product) {
    const div = document.createElement('div');
    div.classList.add('img');
    div.setAttribute("data-category", `${product.category}`)
    div.setAttribute("data-subcategory", `${product.subcategory}`)
    div.setAttribute("id", `${product.id}`)

    const anchorImage = document.createElement('a');
    // anchorImage.setAttribute("href","productDetails.html");
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    anchorImage.appendChild(img);
    div.appendChild(anchorImage);

    const divDetails = document.createElement('div');
    divDetails.classList.add('info-product');

    const nameOfProduct = document.createElement('h3');
    nameOfProduct.textContent = product.name;
    nameOfProduct.classList.add('name_product');
    divDetails.appendChild(nameOfProduct);

    const price = document.createElement('p');
    price.classList.add('price');
    const span = document.createElement('span');
    span.textContent = `$${product.price}`;
    const priceKeyword = document.createTextNode('Price:');
    price.appendChild(priceKeyword);
    price.appendChild(span);
    divDetails.appendChild(price);

    // const iconCar = document.createElement('i');
    // iconCar.classList.add('increase', 'bx', 'bxs-cart-alt');
    const iconCar = document.createElement('button');
    iconCar.classList.add('increase');
    iconCar.innerText = 'add to cart';
    divDetails.appendChild(iconCar);
    div.appendChild(divDetails);
    return div;
}

// Function to render products
function renderProducts(data) {
    // Iterate over products
    data.forEach(e => {
        const productDiv = createProductDiv(e);
        productsContainer.appendChild(productDiv);
    })
}
fetch('https://phones-laptops.vercel.app/products')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Process the JSON data
        renderProducts(data);
        showProductDetails();
        filterProducts();
        addToCar();
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });



// filter products
function filterProducts() {
    const btns = document.querySelectorAll(".name-category p");
    const images = document.querySelectorAll(".pic-category .img");
    for (let i = 1; i < btns.length; i++) {
        btns[i].addEventListener('click', filterImg);
    }
    btns[0].addEventListener('click', e => {
        setActiveBtn(e);
        images.forEach(img => {
            img.classList.remove('img-shrink');
            img.classList.add('img-expand');
        })
    });
    function setActiveBtn(e) {
        btns.forEach(btn => {
            btn.classList.remove('btn-clicked');
        })
        e.target.classList.add('btn-clicked');
    }
    function filterImg(e) {
        setActiveBtn(e);
        images.forEach(img => {
            img.classList.remove('img-shrink');
            img.classList.add('img-expand');
            const imgType = img.dataset.category;
            const btnType = e.target.dataset.category;
            if (imgType !== btnType) {
                img.classList.remove('img-expand');
                img.classList.add('img-shrink');
            }
        });
    }
};



//cart
let totalQuantity = 0;
function addToCar() {
    let addcart = document.querySelectorAll(".info-product .increase");
    let productsInCar = [];
    addcart.forEach(e => {
        e.addEventListener('click', (a) => {
            a.stopPropagation();
            const idElement = e.parentElement.parentElement.getAttribute('id');
            if (!sessionStorage.getItem(idElement)) {
                // Create an object with id and quantity
                let item = { quantity: 1 };

                // Convert the object to a JSON string
                let itemJSON = JSON.stringify(item);
                // Save the JSON string in the session storage
                sessionStorage.setItem(idElement, itemJSON);
            } else {
                const itemJSON = sessionStorage.getItem(idElement);
                let item = JSON.parse(itemJSON);
                let qu = item.quantity;
                qu++;
                item.quantity = qu;
                sessionStorage.setItem(idElement, JSON.stringify(item));
            } countCar += 1;
            sessionStorage.setItem('totalQuantity', JSON.stringify(countCar))
            NumberOfcar.innerHTML = countCar;
            productsInCar.push(parseInt(a.target.parentElement.dataset.product))
        });
    });
}




// show proudct in details
function showProductDetails() {
    const list = document.querySelectorAll('.pic-category .img');
    list.forEach(e => {
        e.addEventListener('click', () => {
            window.location.href = `productDetails.html?id=${e.getAttribute('id')}`;
        });

    })
}

// button scroll top
let span = document.querySelector(".up");

window.onscroll = function () {
    this.scrollY >= this.innerHeight ? span.classList.add("show") : span.classList.remove("show");
};

span.onclick = function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};