import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// event listener for the login form
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    await login();
});

// convert form data to JSON
function dataToJson(formElement) {
    const formData = new FormData(formElement), convertedJSON = {};
    formData.forEach((value, key) => {
        convertedJSON[key] = value;
    });
    return convertedJSON;
}

// login user
async function login() {
    const form = document.getElementById("loginForm");
    const data = dataToJson(form);

    data.email = data.email.trim();
    data.password = data.password.trim();

    loginUser(data.email, data.password);
}

const loginUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email);
    if (user && user.password === password) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("Login successful");

        // create a wishlist for the user????

        window.location.href = "../index.html"; // redirect to home page
    } else {
        alert("Invalid email or password");
    }
}