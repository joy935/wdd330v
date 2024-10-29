let dynamicNav = document.getElementById("LoginLink");
let isLoggedIn = localStorage.getItem("isLoggedIn");
let isRegistered = localStorage.getItem("isRegistered");
let users = JSON.parse(localStorage.getItem("users"));

if (isLoggedIn) {
    dynamicNav.innerHTML = "My Account"
    dynamicNav.href = "./account/index.html"
} else if (users) {
    dynamicNav.innerHTML = "Log In"
    dynamicNav.href = "./login/index.html"
} else if (isRegistered) {
    dynamicNav.innerHTML = "Log In"
    dynamicNav.href = "./login/index.html"
} else {
    dynamicNav.innerHTML = "Register"
    dynamicNav.href = "./register/index.html"
}