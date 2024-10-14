const myElement = document.getElementById("demo");
const myMap = document.getElementById("map").querySelector("iframe");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    myElement.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  myElement.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;

    myMap.src = `https://maps.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}&output=embed`;
}