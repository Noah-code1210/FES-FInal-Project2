const pokemonListEl = document.querySelector(".pokemon__list");
const searchInputEl = document.getElementById('search'); // Get the search input element
const searchButtonEl = document.getElementById('searchButton'); // Get the search button


async function getData(filter , query = "") {

  const apiUrl = query
    ? `https://api.pokemontcg.io/v2/cards?q=name:${query}` // Construct API URL with search query
    : `https://api.pokemontcg.io/v2/cards`;
  // Fetching data from API/converting to HTML
  const pokemon = await fetch(apiUrl);
  const pokemonData = await pokemon.json();

  // Making sort filter responsive
  if (filter === "LOW_TO_HIGH") {
    pokemonData.data.sort((a, b) => a.hp - b.hp);
    console.log(filterCards);
  } else if (filter === "HIGH_TO_LOW") {
    pokemonData.data.sort((a, b) => b.hp - a.hp);
    console.log(filterCards);
  } else if (filter === "TYPE") {
    pokemonData.data.sort((a, b) => {
      if (a.types[0] < b.types[0]) return -1;
      if (a.types[0] > b.types[0]) return 1;
      return 0;
    });
  } else if (filter === "SUB-TYPE") {
    pokemonData.data.sort((a, b) => {
      if (a.subtypes[0] < b.subtypes[0]) return -1;
      if (a.subtypes[0] > b.subtypes[0]) return 1;
      return 0;
    });
  }
  
  
  console.log(pokemonData);
  pokemonListEl.innerHTML = pokemonData.data
  .map((pokemon) => userHTML(pokemon))
  .join("");
}



// Making HTML responsive with API
function userHTML(pokemon) {
  return `<div class="pokemon__slot">
    <div class="pokemon__slot--description">
        <img class="pokemon__img" src=${pokemon.images.small}>
             <h3 id="name-0">${pokemon.name}</h3>
               <p><b>Type:</b> ${pokemon.types}</p>
               <p><b>Sub-type:</b> ${pokemon.subtypes}</p>
               <p><b>Health:</b> ${pokemon.hp}</p>
               <p><b>Rarity:</b> ${pokemon.rarity}</p>
        </div>
    </div>`;
}

function filterCards(event) {
  getData(event.target.value, searchInputEl.value); // Pass the search input value
}

function handleSearch() {
  const searchTerm = searchInputEl.value; // Get the value from the input
  getData(document.getElementById('price__filter').value, searchTerm); // Pass the search term to getData
}

// Event listener for the search button
searchButtonEl.addEventListener('click', handleSearch);

// Initial load of all cards
getData();