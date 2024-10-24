import { loadHeaderFooter, alertMessage } from "./utils.mjs";

loadHeaderFooter();

// event listener for the registration form
document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    await register();
});

// convert form data to JSON
function dataToJson(formElement) {
    const formData = new FormData(formElement), convertedJSON = {};
    formData.forEach((value, key) => {
        convertedJSON[key] = value;
    });
    return convertedJSON;
}

// register user
async function register() {
    const form = document.getElementById("registerForm");
    const data = dataToJson(form);

    // validate form data
    let alertList = [];
    if (!data.fname) {
        alertList.push("Please enter your first name");
    }
    if (!data.lname) {
        alertList.push("Please enter your last name");
    }
    if (!data.email) {
        alertList.push("Please enter your email");
    }
    if (data.password.length < 8) {
        alertList.push("Password must be at least 8 characters");
    }
    if (data.password !== data.confirmPassword) {
        alertList.push("Passwords do not match");
        return;
        } else {
            data.password = data.password.trim();
        }
    if (alertList.length > 0) { 
        alertList.forEach((message) => {
            alertMessage(message); // display alert message
        });
        return;
    }

    // trim whitespace from form data
    data.fname = data.fname.trim();
    data.lname = data.lname.trim();
    data.email = data.email.trim();
    data.password = data.password.trim();

    delete data.confirmPassword; // remove confirmPassword from data object

    try {
        const response = registerUser(data.email, data.password);

        if (response.ok) {
            const error = await response.json();
            console.error(error); // eslint-disable-line no-console
            return;
        }
        window.location.href = "../login/index.html";
    } catch (error) {
        console.error(error); // eslint-disable-line no-console
    }
}

// save registration data
const registerUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(user => user.email === email)) {
        return { error: "Email already registered" };
    } else {
        localStorage.setItem("users", JSON.stringify([...users, { email, password }]));
        return { message: "User registered successfully" };
    }
}