const pokemonListEl = document.querySelector(".pokemon__list");

async function getData(filter) {
  // Fetching data from API/converting to HTML
  const pokemon = await fetch("https://api.pokemontcg.io/v2/cards");
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

async function search() {
  let input = document.getElementById('search').value.toLowerCase();
  const response = await fetch("https://api.pokemontcg.io/v2/cards");
  const data = await response.json(); // Convert response to JSON
  const cards = data.data; // Assuming your response has a 'data' field

  // Loop through cards and display or hide them based on input
  for (let i = 0; i < cards.length; ++i) {
      const cardElement = document.getElementById(`name-${i}`); // Move here
      
      if (cardElement) {
          if (!cards[i].name.toLowerCase().includes(input)) {
              cardElement.style.display = "none"; // Hide the card
          } else {
              cardElement.style.display = "list-item"; // Show the card
          }
      } else {
          console.warn(`Element with id name-${i} not found`);
      }
  }
}

// Event listener setup
document.getElementById("searchButton").addEventListener("click", function() {
  search(); // Call the search function
});


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
  getData(event.target.value);
}

setTimeout(() => {
  getData();
})
