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
    console.log("Form data", data);

    data.email = data.email.trim();
    data.password = data.password.trim();

    try {
        const response = await fetch("https://lucent-valkyrie-d70933.netlify.app/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            console.log("API response", result);
            window.location.href = "/index.html"; // redirect to home page
        } else {
            alert(result.message);
        }
    } catch (error) {
            console.error("Error logging: ", error);
        }
}