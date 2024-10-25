import { loadHeaderFooter, formatDate } from "./utils.mjs";

loadHeaderFooter();

const books = document.querySelector(".bookList");
const pagination = document.getElementById("pagination");

const maxResults = 12;
let currentPage = 0;
let currentGenre = "";
let totalItems = 0;

// when the page is loaded, check if the user has selected a genre
// from the details page
document.addEventListener("DOMContentLoaded", () => {
    const genreFromLS = localStorage.getItem("selectedCategory");
    if (genreFromLS) {
        currentGenre = genreFromLS;
        getBooksByGenre(currentGenre, 0);
        localStorage.removeItem("selectedCategory"); // remove the genre from local storage
        pagination.style.display = "block";
    } 
});

// select all elements with the class genre
const genres = document.querySelectorAll(".genre");
genres.forEach(genre => {
    genre.addEventListener("click", (event) => {
        // get the ID of the clicked genre
        currentGenre = event.target.id;
        event.target.classList.add("selected");

        // get the books by genre
        getBooksByGenre(currentGenre, 0);
        pagination.style.display = "block";
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
                    <img class="thumbnail" src="${image}" alt="${title}" width="128" height="179" loading="lazy"></a>
                </div>
                <div class="book2">
                <a href="../book/index.html?id=${book.id}">
                    <h2>${title}</h2></a>
                <p class="author">${authors}</p>
                <p>Publication date: ${publishedDate}</p>
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
        const pagination = document.getElementById("pagination");
        pagination.style.display = "block";
    }
}