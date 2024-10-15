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
        console.log(data);
        renderBooks(data.items);
    } catch (error) {
        console.error(error);
    }
}

function renderBooks(data) {
    const html = data.map(book => {
        return `
            <div class="book">
                <h2>${book.volumeInfo.title}</h2>
                <p>${book.volumeInfo.authors}</p>
                <img src="${book.volumeInfo.imageLinks.thumbnail}" alt="${book.volumeInfo.title}">
                <p>${book.volumeInfo.publishedDate}</p>
            </div>
        `;
    }).join("");
    books.innerHTML = html;
}
