const url = "https://pokeapi.co/api/v2/pokemon";
let result = null;
async function getPokemon(url) {
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        doStuff(data);
    }
}

function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function doStuff(data) {
    const pokemonSelect = document.getElementById('pokemonSelect');
    data.results.forEach((pokemon) => {
        const option = document.createElement("option");
        option.value = pokemon.name;
        option.textContent = capitalize(pokemon.name);
        pokemonSelect.appendChild(option);
    });
}

getPokemon(url);