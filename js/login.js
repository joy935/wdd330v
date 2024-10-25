import { loadHeaderFooter, alertMessage } from "./utils.mjs";

loadHeaderFooter();

// when the page is loaded, check if the user is already logged in
document.addEventListener("DOMContentLoaded", () => {
    const isRegistered = localStorage.getItem("isRegistered");
        
        if (isRegistered) {
            const successMsg = document.getElementById("messageBox");
            // successMsg.textContent = "Registration successful. Please login to continue.";
            successMsg.style.display = "block";
            localStorage.removeItem("isRegistered");
            localStorage.setItem("isLoggedIn", true);
        }
});



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
        
        window.location.href = "../index.html"; // redirect to home page
        
    } else {
        alertMessage("Invalid email or password");
    }
}