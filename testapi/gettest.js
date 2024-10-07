const books = document.querySelector(".books");

const apiUrl = "https://goodreads12.p.rapidapi.com/getBookByID";
const headers = {
    "x-rapidapi-host": "goodreads12.p.rapidapi.com",
	"x-rapidapi-key": "3fce1c804fmshed74b100755700cp19b98bjsn4eb22c9804d4"
};

fetch(apiUrl, {
    method: 'GET',
    headers: headers
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Parse the JSON response
    })
    .then(data => {
      console.log(data); // Process and handle the API data here
    })
    .catch(error => {
      console.error('Error during API request:', error);
    });