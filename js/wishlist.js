import { loadHeaderFooter } from "./utils.mjs";
import Wishlist from "./wishlist.mjs";

loadHeaderFooter();

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (currentUser) {

    const wishlist = new Wishlist(currentUser.email);
    const wishlistItems = wishlist.get();

    if(wishlistItems.length > 0) {
        displayWishlist(wishlistItems);
    } else {
        document.querySelector(".bookList").innerHTML = "No books in the wishlist";
    } 
} else {
    document.querySelector(".bookList").innerHTML = "Please login to view your wishlist";
}

function displayWishlist(wishlistItems) {
    const bookList = document.querySelector(".bookList");

    wishlistItems.forEach(async (book) => {
        const apiUrl = "https://www.googleapis.com";
        const key = "AIzaSyD0ESRed2KpWg351u_7MGA70O2jZIgvXb4";  

        const response = await fetch(`${apiUrl}/books/v1/volumes/${book}?key=${key}`);
        const data = await response.json();

        const image = data.volumeInfo.imageLinks ? data.volumeInfo.imageLinks.thumbnail : "../images/no-image.jpg"
        const title = data.volumeInfo.title || "No title available";
        const authors = data.volumeInfo.authors || "No author available";
        const publisher = data.volumeInfo.publisher || "No publisher available";

        return bookList.innerHTML +=`
            <div class="book">
                <a href="../book/index.html?id=${book}">
                    <img class="thumbnail" src="${image}" alt="${title}" width="128" height="179">
                    <h2>${title}</h2>
                </a>
                <p class="author">${authors}</p>
                <p class="publisher">Publisher: ${publisher}</p>
            </div>
        `;

    })
}