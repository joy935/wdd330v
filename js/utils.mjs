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
}

export function alertMessage(message, scroll=true) {
    const alert = document.createElement("div");
    alert.classList.add("alert");
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