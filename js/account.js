import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const isLoggedIn = localStorage.getItem("isLoggedIn");
if (isLoggedIn) {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    let fname = document.getElementById("fnameCurrentUser");
    fname.innerHTML = user.fname;
    let email = document.getElementById("emailCurrentUser");
    email.innerHTML = user.email;

    // log out the user
    document.getElementById("logOutBtn").addEventListener("click", () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("currentUser");
        window.location.href = "../index.html";
    });
}