import { loadHeaderFooter, alertMessage } from "./utils.mjs";
import Wishlist from "./wishlist.mjs";

loadHeaderFooter();

const apiUrl = "https://www.googleapis.com";
const key = "AIzaSyD0ESRed2KpWg351u_7MGA70O2jZIgvXb4";
const bookDetails = document.querySelector(".bookDetails");
const sameAuthorBtn = document.querySelector(".sameAuthorBtn");

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

    // add the book to the wishlist
    const wishlistBtn = document.getElementById("addToWishlistBtn");
    wishlistBtn.addEventListener("click", function() {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
            const wishlist = new Wishlist(currentUser.email);
            wishlist.add(id);
        } else {
            alertMessage("Please log in to add books to your wishlist.");
        }});
});

function renderBook(data) {
    const book = data.volumeInfo;
    // if one of the properties is not available, display a default value
    const image = book.imageLinks ? book.imageLinks.thumbnail : "../images/no-image.jpg"
    const title = book.title || "No title available";
    const subtitle = book.subtitle || "";
    const authors = book.authors || "No author available";
    let formattedCategories = "";
    const categories = book.categories || "No categories available"; // get the first category only
    if (categories) {
        formattedCategories = "No categories available";
    } else {
        formattedCategories = categories.split("/").join("| "); // replace / with |
    }
        
    const pageCount = book.pageCount || "No page count available";
    const description = book.description || "No description available.";

    let publishedDate = book.publishedDate || "No published date available";
    // get the year and month from the published date
    const date = new Date(publishedDate);
    const getYear = date.getFullYear();
    const getMonth = date.getMonth();
    // if there's no month, display only the year
    if (getMonth === 0) {
        publishedDate = `${getYear}`;
    // otherwise, display the month and year
    } else {
        publishedDate = `${date.toLocaleString('en', { month: 'long' })} ${getYear}`;
    }

    const html = `
            <img class="thumbnail" src="${image}" alt="${title}" width="120" height="179">
            <h2>${title}</h2>
            <p>${subtitle}</p>
            <p class="author">${authors}</p>
            <br>
            <div class="box">
            <p class="categories"><strong>Categories:</strong> ${formattedCategories}</p>
            <p><strong>Page Count:</strong> ${pageCount}</p>
            <p><strong>Published Date:</strong> ${publishedDate}</p>
            </div>
            <br>
            <h3>Description</h3>
            <p>${description}</p>
    `;
    bookDetails.innerHTML = html;

    // get books from the same author
    sameAuthorBtn.addEventListener("click", async function () {
        try {
            const response = await fetch(`${apiUrl}/books/v1/volumes?q=inauthor:${authors}&key=${key}`);
            const data = await response.json();
            renderSameAuthor(data);
        } catch (error) {
            console.error(error);
        }
    });
}

function renderSameAuthor(data) {
    const sameAuthorBooks = document.querySelector(".bookList");

    // check if the API returns any books
    if (data.items && data.items.length > 0) {
        const bookList = data.items.map(books => {
            // if it is the same book, skip it
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get("id");
            if (books.id != id) {
                const book = books.volumeInfo;
                const image = book.imageLinks ? book.imageLinks.thumbnail : "../images/no-image.jpg";
                const subtitle = book.subtitle || "";
                const title = book.title || "No title available";

                return `
                    <div class="book">
                        <a href="../book/index.html?id=${books.id}">
                            <img class="thumbnail" src="${image}" alt="${title}" width="120" height="179">
                        <h2>${title}</h2>
                        </a>
                        <p>${subtitle}</p>
                    </div>
                `;
            }
        }).join("");
        sameAuthorBooks.innerHTML = bookList;
    } else {
        sameAuthorBooks.innerHTML = "<p>No other books by this author found.</p>";
    }
}