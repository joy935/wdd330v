const googleBooksApiUrl = "https://www.googleapis.com";
const googleBooksApiKey = "AIzaSyD0ESRed2KpWg351u_7MGA70O2jZIgvXb4";

// get the book cover
export async function fetchBookCover(isbn) {
    try {
        const response = await fetch(`${googleBooksApiUrl}/books/v1/volumes?q=isbn:${isbn}&key=${googleBooksApiKey}`);
        const data = await response.json();

        if (data.totalItems === 0 || !data.items[0].volumeInfo.imageLinks) {
            return "../images/no-image.jpg";
        } else {
            return data.items[0].volumeInfo.imageLinks.thumbnail;
        }
    } catch (error) {
        console.error(error); // eslint-disable-line no-console
        return "../images/no-image.jpg";
    }
}

// get the book id to use in the details page
export async function fetchBookDetails(isbn) {
    try {
        const response = await fetch(`${googleBooksApiUrl}/books/v1/volumes?q=isbn:${isbn}&key=${googleBooksApiKey}`);
        const data = await response.json();

        if (data.totalItems > 0 && data.items[0].id) {
            return data.items[0].id;
        } else {
            return "No id available";
        }
    } catch (error) {
        console.error(error); // eslint-disable-line no-console
        return "No id available";
    }
}