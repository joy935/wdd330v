import { loadHeaderFooter } from "./utils.mjs";

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
    console.log("Form data", data);

    data.fname = data.fname.trim();
    data.lname = data.lname.trim();
    data.email = data.email.trim();
    data.password = data.password.trim();

    if (data.password !== data.confirmPassword) {
        alert("Passwords do not match"); // change this later
        return;
        } else {
            data.password = data.password.trim();
        }
    
    delete data.confirmPassword; // remove confirmPassword from data object

    try {
        const response = registerUser(data.email, data.password);
        console.log("API response", response);

        if (response.ok) {
            const error = await response.json();
            alert(error.message);
            return;
        }
        console.log("User registered successfully");
        window.location.href = "../login/index.html";
    } catch (error) {
        console.error(error);
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