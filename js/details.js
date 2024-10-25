import { loadHeaderFooter, formatDate, formatCategories, formatBuyLink, alertMessage } from "./utils.mjs";
import Wishlist from "./wishlist.mjs";

loadHeaderFooter();

const bookDetails = document.querySelector(".bookDetails");
const sameAuthorBtn = document.querySelector(".sameAuthorBtn");

const googleBooksApiUrl = "https://www.googleapis.com";
const googleBooksApiKey = "AIzaSyD0ESRed2KpWg351u_7MGA70O2jZIgvXb4";

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    // fetch the book details through the book id
    async function getBook() {
        try {
            const response = await fetch(`${googleBooksApiUrl}/books/v1/volumes/${id}?key=${googleBooksApiKey}`);
            const data = await response.json();
            renderBook(data);
        } catch (error) {
            console.error(error); // eslint-disable-line no-console
        }
    }
    getBook();

    // add the book to the wishlist
    const wishlistBtn = document.getElementById("addToWishlistBtn");
    wishlistBtn.addEventListener("click", function() {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
            const wishlist = new Wishlist(currentUser.email);
            shakeWishlistIcon();
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
    const categories = formatCategories(book.categories[0]);

    const pageCount = book.pageCount || "No page count available";
    const publishedDate = formatDate(book.publishedDate);

    const description = book.description || "No description available.";

    const buy = data.saleInfo;
    const buyLinkElement = formatBuyLink(buy.buyLink);

    const html = `
            <img class="thumbnail" src="${image}" alt="${title}" width="120" height="179">
            <h2>${title}</h2>
            <p>${subtitle}</p>
            <p class="author">${authors}</p>
            <br>
            <div class="box">
            <p class="categories"><strong>Categories:</strong> ${categories}</p>
            <p><strong>Page Count:</strong> ${pageCount}</p>
            <p><strong>Published Date:</strong> ${publishedDate}</p>
            </div>
            <br>
            <h3>Description</h3>
            <p>${description}</p>
            <br>
            ${buyLinkElement}
    `;
    bookDetails.innerHTML = html;

    // get books from the same author
    sameAuthorBtn.addEventListener("click", async function () {
        try {
            const response = await fetch(`${googleBooksApiUrl}/books/v1/volumes?q=inauthor:${authors}&key=${googleBooksApiKey}`);
            const data = await response.json();
            renderSameAuthor(data);
        } catch (error) {
            console.error(error); // eslint-disable-line no-console
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

function shakeWishlistIcon() {
    const wishlistIcon = document.getElementById('wishlistIcon');
    
    wishlistIcon.classList.add('shake');
    
    setTimeout(() => {
        wishlistIcon.classList.remove('shake');
    }, 500);
}