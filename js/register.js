import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// event listener for the registration form
document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const form = new FormData(this);
    const response = await saveRegister(Object.fromEntries(form));
    const data = await response.json();
    if (response.ok) {
        alert(data.message);
        window.location.href = "login.html";
    } else {
        alert(data.message);
    }
});


async function saveRegister(form) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
    };
    return await fetch("http://localhost:3000/register", options);
}