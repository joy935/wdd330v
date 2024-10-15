const search = document.querySelector("#search");
const searchButton = document.querySelector("#searchBtn");

searchButton.addEventListener("click", function(e) {
  e.preventDefault();
  
  let searchValue = search.value;
  if (searchValue.length > 0) {
    searchValue == searchValue.trim().toLowerCase();
    console.log(searchValue);
    // redirect to search page
    window.location.href = `./books/index.html?search=${searchValue}`;
    // show error message
  }

  
});