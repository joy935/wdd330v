import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// event listener for the registration form
document.getElementById("registerBtn").addEventListener("click", async (e) => {
    e.preventDefault();

    await register();
});


function dataToJson(formElement) {
    const formData = new FormData(formElement), convertedJSON = {};
    formData.forEach((value, key) => {
        convertedJSON[key] = value;
    });
    return convertedJSON;
}

async function register() {
    const form = document.getElementById("registerForm");
    const data = dataToJson(form);
    console.log(data);
    
    data.fname = data.fname.trim();
    data.lname = data.lname.trim();
    data.password = data.password.trim();
    data.password = data.password.trim();

    try {
        const response = await saveRegister(data);
        console.log("API response", response);
    } catch (error) {
        console.error(error);
    }
}

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