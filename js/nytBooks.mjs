const nytBooksApiUrl = "https://api.nytimes.com/svc/books/v3/lists.json";
const nytBooksApiKey = "pDrDjUpIh4tcpfr713QffVM0OhPgJFuX";

export async function fetchNytBooks(listType) {
    try {
        const response = await fetch(`${apiUrl}?list=${listType}&api-key=${key}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching ${listType} ", error); // eslint-disable-line no-console
    }
}