import { loadHeaderFooter, formatDate,  } from "./utils.mjs";
import { fetchBooksKeyword } from "./googleBooks.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    const getBooks = fetchBooksKeyword(search);
    getBooks.then(data => renderBooks(data));
});

const books = document.querySelector(".bookList");

async function renderBooks(data) {
    const html = await data.map(book => {
        // if one of the properties is not available, display a default value
        const title = book.volumeInfo.title || "No title available";
        const authors = book.volumeInfo.authors || "No author available";
        const image = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "../images/no-image.jpg"
        const publishedDate = formatDate(book.volumeInfo.publishedDate);

        return `
            <div class="book">
                <div class="book1">
                <a href="../book/index.html?id=${book.id}">
                    <img class="thumbnail" src="${image}" alt="${title}" width="128" height="179"></a>
                </div>
                <div class="book2">
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
