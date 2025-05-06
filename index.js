const pokemonListEl = document.querySelector(".pokemon__list");

async function getData(filter) {

  if (filter === 'LOW_TO_HIGH') {
    console.log(filter);
    pokemon.sort((a, b) => a.hp - b.hp)
    console.log(filterCards)
  }
  
  const pokemon = await fetch("https://api.pokemontcg.io/v2/cards");
  const pokemonData = await pokemon.json();

  console.log(pokemonData);
  pokemonListEl.innerHTML = pokemonData.data.map((pokemon) => userHTML(pokemon)).join("");
}

function userHTML(pokemon) {
  return `<div class="pokemon__slot">
    <div class="pokemon__slot--description">
        <img class="pokemon__img" src=${pokemon.images.small}>
             <h3>${pokemon.name}</h3>
               <p><b>Type:</b> ${pokemon.types}</p>
               <p><b>Sub-type:</b> ${pokemon.subtypes}</p>
               <p><b>Health:</b> ${pokemon.hp}</p>
               <p><b>Rarity:</b> ${pokemon.rarity}</p>
        </div>
    </div>`;
}

function filterCards(event) {
    getData(event.target.value)
  }

setTimeout(() => {
  getData();
})

