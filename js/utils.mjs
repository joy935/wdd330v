export function renderWithTemplate(template, element) {
    element.innerHTML = template;
}

export async function loadTemplate(path) {
    const response = await fetch(path);
    const responseText = await response.text();
    return responseText;
}

export async function loadHeaderFooter() {
    const header = await loadTemplate("../public/partials/header.html");
    const footer = await loadTemplate("../public/partials/footer.html");
    const getHeader = document.getElementById("header");
    const getFooter = document.getElementById("footer");
    
    renderWithTemplate(header, getHeader);
    renderWithTemplate(footer, getFooter);
    
    updateLogInLink();
}

export function updateLogInLink() {
  let dynamicNav = document.getElementById("loginLink");
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  let isRegistered = localStorage.getItem("isRegistered");
  let users = JSON.parse(localStorage.getItem("users"));

  if (dynamicNav) {
    if (isLoggedIn) {
        dynamicNav.innerHTML = "My Account"
        dynamicNav.href = "../account/index.html"
    } else if (users) {
        dynamicNav.innerHTML = "Log In"
        dynamicNav.href = "../login/index.html"
    } else if (isRegistered) {
        dynamicNav.innerHTML = "Log In"
        dynamicNav.href = "../login/index.html"
    } else {
        dynamicNav.innerHTML = "Register"
        dynamicNav.href = "../register/index.html"
    }
  } else {
    console.log("No dynamicNav element found");
  }
}

export function formatDate(publishedDate) {
    if (!publishedDate) {
      return "No published date available";
    } else {
        const date = new Date(publishedDate);
        const getYear = date.getFullYear();
        const getMonth = date.getMonth();
        if (getMonth === 0) {
            return getYear;
        } else {
            return `${date.toLocaleString("en", { month: "long" })} ${getYear}`;
        }
    }
}

export function formatCategories(categories) {
    if (!categories || categories.length === 0) {
      return "No categories available";
    } else {
        return categories
          .split("/")
          .map((category) => `<a id=${category} class="genres" href="../genres/index.html">${category}</a>`)
          .join(" ");
    }
}

export function formatBuyLink(buyLink) {
    if (buyLink === "undefined" || !buyLink) {
        return `<p>No buy link available</p>`;
    } else {
        return `<p><a href="${buyLink}" target="_blank">Buy this book</a></p>`;
    }
}

export function alertMessage(message, scroll=true, type="default") {
    const alert = document.createElement("div");

    alert.classList.add("alert");
    alert.classList.add(type === "success" ? "alertSuccess" : "alertDefault");

    // set the contents of the alert
    alert.innerHTML = `<p>${message}</p>
    <button class="close-alert">❌</button>`;
    alert.style.display = "block";
  
    // add the alert to the page
    const main = document.querySelector("main");
    if (main) {
      main.prepend(alert);
    } else {
      document.body.prepend(alert);
    }
  
    // add an event listener to the close button
    alert.querySelector(".close-alert").addEventListener("click", () => {
      alert.remove();
    });
  
    // scroll to the top of the page
    if (scroll) {
      window.scrollTo(0, 0);
    }
  }