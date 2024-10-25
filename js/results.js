import { loadHeaderFooter, formatDate  } from "./utils.mjs";

loadHeaderFooter();

const maxResults = 12;
let currentPage = 0;
let currentSearch = "";
let totalItems = 0;

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    
    // get the first page of results
    if (search) {
        getBooks(search, 0);
    }
    // if the user sort by relevance or newest, get the first page of results
    const select = document.getElementById("sortSelect");
    select.onchange = function() {
        const value = select.value;
        if (value === "relevance" || value === "newest") {
            getBooks(search, 0, value);
        }
    }

    // if the user clicks the next or previous button, change the page accordingly
    document.getElementById("nextBtn").addEventListener("click", function() { changePage(1) });
    document.getElementById("prevBtn").addEventListener("click", function() { changePage(-1) });
});

const books = document.querySelector(".bookList");

const googleBooksApiUrl = "https://www.googleapis.com";
const googleBooksApiKey = "AIzaSyD0ESRed2KpWg351u_7MGA70O2jZIgvXb4";

async function getBooks(search, startIndex, sort = "relevance") {
    try {
        const response = await fetch(`${googleBooksApiUrl}/books/v1/volumes?q=${search}&startIndex=${startIndex}&maxResults=${maxResults}&orderBy=${sort}&key=${googleBooksApiKey}`);
        const data = await response.json();
        totalItems = data.totalItems;
        currentSearch = search;
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
    })
    books.innerHTML = html.join("");;
    // display the page and total number of pages
    document.getElementById("pageInfo").innerHTML = `Page ${currentPage + 1} of ${Math.ceil(totalItems / maxResults)}`; 
}

// change the page
function changePage(direction) {
    currentPage += direction;
    if (currentPage < 0) {
        currentPage = 0;
        return;
    }
    const startIndex = currentPage * maxResults;
    getBooks(currentSearch, startIndex);
}