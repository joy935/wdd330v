import { alertMessage } from "./utils.mjs";

 export default class Wishlist {
    constructor(userEmail) {
        this.email = userEmail;
        this.wishlist = this.loadWishlist() || [];
    }

    // load the wishlist from local storage
    loadWishlist() {
        const savedWishlists = JSON.parse(localStorage.getItem("wishlists")) || {};
        return savedWishlists[this.email] || [];
    }

    // save the wishlist to local storage
    saveWishlist() {
        const savedWishlists = JSON.parse(localStorage.getItem("wishlists")) || {};
        savedWishlists[this.email] = this.wishlist;
        localStorage.setItem("wishlists", JSON.stringify(savedWishlists));    
    }

    // add a book to the wishlist
    add(id) {
        if (!this.isInWishlist(id)) {
            this.wishlist.push(id);
            this.saveWishlist();
            alertMessage("Book added to the wishlist", true, "success");
        } else {
            alertMessage("Book is already in the wishlist");
        }
    }

    // remove a book from the wishlist
    remove(id) {
        this.wishlist = this.wishlist.filter((bookId) => bookId !== id);
        this.saveWishlist();
    }

    // get the wishlist
    get() {
        return this.wishlist;
    }

    // check if the book is already in the wishlist
    isInWishlist(id) {
        return this.wishlist.includes(id);
    }
}