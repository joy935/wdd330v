import { loadHeaderFooter, formatDate } from "./utils.mjs";

loadHeaderFooter();

const books = document.querySelector(".bookList");

const maxResults = 12;
let currentPage = 0;
let currentGenre = "";
let totalItems = 0;
// select all elements with the class genre
const genres = document.querySelectorAll(".genre");

genres.forEach(genre => {
    genre.addEventListener("click", (event) => {
        // get the ID of the clicked genre
        currentGenre = event.target.id;
        event.target.classList.add("selected");
        // get the books by genre
        getBooksByGenre(currentGenre, 0);

    });
});


// if the user clicks the next or previous button, change the page accordingly
document.getElementById("nextBtn").addEventListener("click", function() { changePage(1) });
document.getElementById("prevBtn").addEventListener("click", function() { changePage(-1) });

// function to get the books by genre

const googleBooksApiUrl = "https://www.googleapis.com";
const googleBooksApiKey = "AIzaSyD0ESRed2KpWg351u_7MGA70O2jZIgvXb4";

async function getBooksByGenre(genreId, startIndex) {
    try {
        const response = await fetch(`${googleBooksApiUrl}/books/v1/volumes?q=subject:${genreId}&startIndex=${startIndex}&maxResults=${maxResults}&key=${googleBooksApiKey}`);
        const data = await response.json();
        totalItems = data.totalItems;
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
                    <img src="${image}" alt="${title}">
                </a>
                </div>
                <div class="book2">
                    <h2>${title}</h2>
                    <p>By ${authors}</p>
                    <p>Published: ${publishedDate}</p>
                </div>
            </div>
        `;
    });
    books.innerHTML = html.join("");
    // display the page and total number of pages
    document.getElementById("pageInfo").innerHTML = `Page ${currentPage + 1} of ${Math.ceil(totalItems / maxResults)}`; 
}

// change the page
function changePage(direction) {
    const newPage = currentPage + direction;
    const startIndex = newPage * maxResults;

    // check if the new page is valid
    if (startIndex >= 0 && startIndex < totalItems) {
        currentPage = newPage;
        getBooksByGenre(currentGenre, startIndex);
    }
}