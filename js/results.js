import { loadHeaderFooter, formatDate  } from "./utils.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    
    getBooks(search);
});

const books = document.querySelector(".bookList");

const googleBooksApiUrl = "https://www.googleapis.com";
const googleBooksApiKey = "AIzaSyD0ESRed2KpWg351u_7MGA70O2jZIgvXb4";
async function getBooks(search) {
    try {
        const response = await fetch(`${googleBooksApiUrl}/books/v1/volumes?q=${search}&key=${googleBooksApiKey}`);
        const data = await response.json();
        renderBooks(data.items);
    } catch (error) {
        console.error(error); // eslint-disable-line no-console
    }
}

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
