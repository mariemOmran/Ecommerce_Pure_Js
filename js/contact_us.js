// header or navabar
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
// header or navabar

const form = document.querySelector('form');
const userName = document.getElementById("user_name");
const email = document.getElementById("email");
const passward = document.getElementById("password");
const confirmPassward = document.getElementById("confrim_passward");

form.addEventListener('click', (e) => {
    e.preventDefault()
    validateInputs();
})
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = message;
    inputControl.classList.add('error')
    inputControl.classList.remove('sucess')
}
const setSucess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = '';
    inputControl.classList.remove('error')
    inputControl.classList.add('sucess')
}

const invalidEmail = (email) => {
    //regular expression 
    var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
}

const validateInputs = () => {
    const userNameValue = userName.value.trim("");
    const emailValue = email.value.trim("");
    const passwardValue = passward.value.trim("");
    const confirmPasswardValue = confirmPassward.value.trim("");

    if (userNameValue == "") {
        setError(userName, "user name is required");
    } else {
        setSucess(userName);
    }

    if (emailValue == '') {
        setError(email, "email is required");
    } else if (!invalidEmail(emailValue)) {
        setError(email, "plese provide valid email address");
    } else {
        setSucess(email);
    }

    if (passwardValue == "") {
        setError(passward, "passward is required");
    } else if (passwardValue.length < 8) {
        setError(passward, "passward at least 8 charachters");
    } else {
        setSucess(passward)
    }

    if (confirmPasswardValue == "") {
        setError(confirmPassward, "passward is required");
    } else if (confirmPasswardValue !== passwardValue) {
        setError(confirmPassward, "passward isnot matching ");
    } else {
        setSucess(confirmPassward)
    }
}