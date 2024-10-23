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
        // define
    });
}