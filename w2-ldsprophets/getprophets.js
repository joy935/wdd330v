const url = "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";
const template = document.querySelector("#prophet-card");
let data = [];


const getData = async () => {
    try {
        const response = await fetch(url)
        data = await response.json();
        //console.log(data);
        displayData(data.prophets);
    } catch (error) {
        console.error("Error fetching data: ", error)
    }
};

const displayData = (prophets) => {
    prophets.forEach((prophet) => {
        const clone = template.content.cloneNode(true);

        clone.querySelector(".full-name").textContent = `${prophet.name} ${prophet.lastname}`;
        clone.querySelector(".birthdate").textContent = `Date of Birth: ${prophet.birthdate}`;
        clone.querySelector(".birthplace").textContent = `Place of Birth: ${prophet.birthplace}`;
        const imgElement = clone.querySelector(".profile");
        imgElement.src = prophet.imageurl;
        imgElement.alt = `Portrait of ${prophet.name} ${prophet.lastname}`;

        document.body.appendChild(clone);
    });
};

getData();