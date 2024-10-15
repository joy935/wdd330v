export function renderWithTemplate(template, element) {
    element.innerHTML = template;
}

export async function loadTemplate(path) {
    const response = await fetch(path);
    const responseText = await response.text();
    return responseText;
}

export async function loadHeaderFooter() {
    const header = await loadTemplate("./public/partials/header.html");
    const footer = await loadTemplate("./public/partials/footer.html");
    const getHeader = document.getElementById("header");
    const getFooter = document.getElementById("footer");

    renderWithTemplate(header, getHeader);
    renderWithTemplate(footer, getFooter);
}