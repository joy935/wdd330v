import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    getBooks(search);
});

const apiUrl = "https://www.googleapis.com";
const key = "AIzaSyD0ESRed2KpWg351u_7MGA70O2jZIgvXb4";

const books = document.querySelector(".bookList");

async function getBooks(search) {
    try {
        const response = await fetch(`${apiUrl}/books/v1/volumes?q=${search}&key=${key}`);
        const data = await response.json();
        console.log(data); // testing
        renderBooks(data.items);
    } catch (error) {
        console.error(error);
    }
}
// <a href="${book.volumeInfo.industryIdentifiers[1].identifier}>
async function renderBooks(data) {
    const html = await data.map(book => {
        // if one of the properties is not available, display a default value
        const title = book.volumeInfo.title || "No title available";
        const authors = book.volumeInfo.authors || "No author available";
        const image = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "../images/no-image.jpg"
        const publishedDate = book.volumeInfo.publishedDate || "No published date available";

        return `
            <div class="book">
                <div class="book1">
                <a href="../book/index.html?id=${book.id}">
                    <img class="thumbnail" src="${image}" alt="${title}" width="128" height="179"></a>
                </div>
                <div clas="book2">
                <a href="../book/index.html?id=${book.id}">
                    <h2>${title}</h2></a>
                <p class="author">${authors}</p>
                <p>Publication date: ${publishedDate}</p>
                </div>
            </div>
        `;
    })
    books.innerHTML = html.join("");;
}
