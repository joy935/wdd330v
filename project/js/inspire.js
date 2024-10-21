import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const apiUrl = "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json";
const key = "pDrDjUpIh4tcpfr713QffVM0OhPgJFuX";
const books = document.querySelector(".bookList");
getInspirtation();

async function getInspirtation() {
    try {
        const response = await fetch(`${apiUrl}?api-key=${key}`);
        const data = await response.json();
        const filteredData = data.results.slice(0, 6); // add filter to get only 6 books
        await renderInspiration(filteredData);
    } catch (error) {
        console.error(error);
    }
}

async function getBookCover(isbn) {
    const apiUrl = "https://www.googleapis.com";
    const key = "AIzaSyD0ESRed2KpWg351u_7MGA70O2jZIgvXb4";
    try {
        const response = await fetch(`${apiUrl}/books/v1/volumes?q=isbn:${isbn}&key=${key}`);
        const data = await response.json();

        if (data.totalItems === 0 || !data.items[0].volumeInfo.imageLinks) {
            return "../images/no-image.jpg";
        } else {
            return data.items[0].volumeInfo.imageLinks.thumbnail;
        }
    } catch (error) {
        console.error(error);
        return "../images/no-image.jpg";
    }
}

async function renderInspiration(data) {
    const html = await Promise.all(
        data.map(async (book) => {
            const isbn = book.isbns.length > 0 ? book.isbns[0].isbn13 : null; // get the first isbn13
            const bookImage = isbn ? await getBookCover(isbn) : "../images/no-image.jpg"; // get the book cover

            // if one of the properties is not available, display a default value
            const title = book.title || "No title available";
            const author = book.author || "No author available";

            // change to lowercase
            const lowerCaseTitle = title.toLowerCase().trim();

            // capitalize the title
            const capitalizedTitle = lowerCaseTitle.split(" ").map(word => {
                // if the word starts with a special character, like #, capitalize the second letter
                if (/^[^a-zA-Z0-9]/.test(word)) {
                    const specialChar = word.charAt(0);
                    return specialChar + word.charAt(1).toUpperCase() + word.slice(2);
                }
                // if the word is "i", capitalize it
                if (word === "i") {
                    return "I";
                }
                return word.charAt(0).toUpperCase() + word.slice(1);
            }).join(" ");

            return `
                <div class="book">
                    <img class="thumbnail" src="${bookImage}" alt="${book.title}" width="128" height="179">
                    <h2>${capitalizedTitle}</h2>
                    <p>${author}</p>
                </div>
            `;
        })
    );
    books.innerHTML = html.join("");
}