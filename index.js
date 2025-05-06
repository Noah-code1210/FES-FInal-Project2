const pokemonListEl = document.querySelector(".pokemon__list");

async function main() {
  const pokemon = await fetch("https://api.pokemontcg.io/v2/cards");
  const pokemonData = await pokemon.json();
  console.log(pokemonData);
  pokemonListEl.innerHTML = pokemonData.data.map((pokemon) => userHTML(pokemon)).join("");
}

main();

function userHTML(pokemon) {
  return `<div class="pokemon__slot">
    <div class="pokemon__slot--description">
        <img class="pokemon__img" src=${pokemon.images.small}>
           <h3>${pokemon.name}</h3>
             <p><b>Type:</b> ${pokemon.types}</p>
             <p><b>Sub-type:</b> ${pokemon.subtypes}</p>
             <p><b>Health:</b> ${pokemon.hp}</p>
             <p><b>Prices:</b> ${pokemon.rarity}</p>
        </div>
    </div>`
}
