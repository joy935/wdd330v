import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const apiUrl = "https://www.googleapis.com";
const key = "AIzaSyD0ESRed2KpWg351u_7MGA70O2jZIgvXb4";

const bookDetails = document.querySelector(".book");

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    async function getBook() {
        try {
            const response = await fetch(`${apiUrl}/books/v1/volumes/${id}?key=${key}`);
            const data = await response.json();
            renderBook(data);
        } catch (error) {
            console.error(error);
        }
    }
    getBook();
});

function renderBook(data) {
    const book = data.volumeInfo;
    // if one of the properties is not available, display a default value
    const image = book.imageLinks ? book.imageLinks.thumbnail : "../images/no-image.jpg"
    const title = book.title || "No title available";
    const subtitle = book.subtitle || "";
    const authors = book.authors || "No author available";
    const categories = book.categories || "No categories available";
    const pageCount = book.pageCount || "No page count available";
    const description = book.description || "No description available.";

    const html = `
        <div class="bookDetails">
            <img class="thumbnail" src="${image}" alt="${title}" width="128" height="179">
            <h2>${title}</h2>
            <p>${subtitle}</p>
            <p class="author">${authors}</p>
            <p>Categories: ${categories}</p>
            <p>Page count: ${pageCount}</p>
            <p>${description}</p>
        </div>
    `;
    bookDetails.innerHTML = html;
}
