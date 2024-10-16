import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    console.log(search);
    getBooks(search);
    return search;
});

const apiUrl = "https://www.googleapis.com";
const key = "AIzaSyD0ESRed2KpWg351u_7MGA70O2jZIgvXb4";

const books = document.querySelector(".bookList");

async function getBooks(search) {
    try {
        const response = await fetch(`${apiUrl}/books/v1/volumes?q=${search}&key=${key}`);
        const data = await response.json();
        console.log(data); //test
        renderBooks(data.items);
    } catch (error) {
        console.error(error);
    }
}

async function renderBooks(data) {
    const html = await data.map(book => {
        // if one of the properties is not available, display a default value
        const title = book.volumeInfo.title || "No title available";
        const authors = book.volumeInfo.authors || "No author available";
        const image = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "../images/no-image.jpg"
        const publishedDate = book.volumeInfo.publishedDate || "No published date available";
        return `
            <div class="book">
                <h2>${title}</h2>
                <p class="author">${authors}</p>
                <p>Plucation date: ${publishedDate}</p>
                <img class="thumbnail" src="${image}" alt="${title}" width="128" height="179">
                <hr class="break">
            </div>
        `;
    }).join("");
    books.innerHTML = html;
}
