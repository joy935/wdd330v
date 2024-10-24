import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const apiUrl = "https://api.nytimes.com/svc/books/v3/lists.json";
const key = "pDrDjUpIh4tcpfr713QffVM0OhPgJFuX";
const books = document.querySelector(".bookList");
const books2 = document.querySelector(".bookList2");
// get the best sellers
fetchAndRenderBooks("hardcover-fiction", books);
fetchAndRenderBooks("hardcover-nonfiction", books2);

async function fetchAndRenderBooks(listType, element) {
    try {
        const response = await fetch(`${apiUrl}?list=${listType}&api-key=${key}`);
        const data = await response.json();
        await renderBooks(data, element);
    } catch (error) {
        console.error("Error fetching ${listType} ", error); // eslint-disable-line no-console
    }
}

// get the book cover
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
        console.error(error); // eslint-disable-line no-console
        return "../images/no-image.jpg";
    }
}

// get the book id to use in the details page
async function getBookDetails(isbn) {
    const apiUrl = "https://www.googleapis.com";
    const key = "AIzaSyD0ESRed2KpWg351u_7MGA70O2jZIgvXb4";
    try {
        const response = await fetch(`${apiUrl}/books/v1/volumes?q=isbn:${isbn}&key=${key}`);
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
    
async function renderBooks(data, element) {
    const limitedResults = data.results.slice(0, 4); // add filter to get only 4 books
    const html = await Promise.all(
        limitedResults.map(async (book) => {

            const bookDetails = book.book_details[0];

            const isbn = book.isbns.length > 0 ? book.isbns[0].isbn13 : null; // get the first isbn13
            const bookImage = isbn ? await getBookCover(isbn) : "../images/no-image.jpg"; // get the book cover
            const bookId = isbn ? await getBookDetails(isbn) : "No id available"; // get the book id

            // if one of the properties is not available, display a default value
            const title = bookDetails.title || "No title available";
            const author = bookDetails.author || "No author available";
            const description = bookDetails.description || "No description available";

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
                    <a href="../book/index.html?id=${bookId}">
                    <img class="thumbnail" src="${bookImage}" alt="${book.title}" width="128" height="179">
                    <h2>${capitalizedTitle}</h2>
                    </a>
                    <p class="author">${author}</p>
                    <p>${description}</p>
                </div>
            `;
        })
    );
    element.innerHTML = html.join("");
}