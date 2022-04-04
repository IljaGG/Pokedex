
const pokemonCount = 200;
let pokedex = {}; // {1 : {"name" : "bulbasaur", "img" : url, "type" : ["grass", "poison"], "desc" : "......."}}

window.onload = async function() {
    //getPokemon(1);
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);
    // <div id="1" class="pokemon-name">BULBASAUR</div>
    let pokemon = document.createElement('div');
    pokemon.id = i;
    pokemon.innerText = pokedex[i]['name'].toUpperCase();
    pokemon.classList.add('pokemon-name');
    pokemon.addEventListener('click', updatePokemon);
    document.getElementById('pokemon-list').append(pokemon);    
    }   

    document.getElementById('pokemon-description').innerText = pokedex[1]['desc'];
   
    //console.log(pokedex);

}

async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();
    let res = await fetch(url);
    let pokemon = await res.json();

    let pokemonName = pokemon['name'];
    let pokemonType = pokemon['types'];
    let pokemonImg = pokemon['sprites']['other']['official-artwork']['front_default'];
    let pokemonStat = pokemon['stats'];
    res = await fetch(pokemon['species']['url']);
    let pokemonDesc = await res.json();
    
    //console.log(pokemonDesc);
    pokemonDesc = pokemonDesc['flavor_text_entries'][9]['flavor_text'];

        pokedex[num] = {"name" : pokemonName, "img" : pokemonImg, "type" : pokemonType, "desc" : pokemonDesc, 'stat' : pokemonStat}
    }

//aktuelle ID aus pokedex-array und 'img' : url (siehe oben)

function updatePokemon() {
    document.getElementById('pokemon-img').src = pokedex[this.id]['img']; 

    //entferne vorherige Pokemondetypes
    let typesDiv = document.getElementById('pokemon-types');
    
    // update types
    let types = pokedex[this.id]['type'];
    typesDiv.innerHTML = ``;
    for (let i = 0; i < types.length; i++) {
        typesDiv.innerHTML += `<div id="pokemon-types">
                                    <span class="type-box ${types[i]['type']['name']}">${types[i]['type']['name'].toUpperCase()}</span>
                                </div>`
    }

    // update pokemonname in headline
    document.getElementById('pokemon-headline-name').innerText = pokedex[this.id]['name'].toUpperCase();
    // update description
    document.getElementById('pokemon-description').innerText = pokedex[this.id]['desc'];

   // update stats
    let statsDiv = document.getElementById('pokemon-base-stats');
    
    let stats = pokedex[this.id]['stat'];
    statsDiv.innerHTML = ``;
    for (let j = 0; j < stats.length; j++) {
        statsDiv.innerHTML += templateSingleStat(stats, j);
   }
}

function templateSingleStat(stats, j) {
    return`<div class="base-stats">
    <span class="stat-name">${stats[j]['stat']['name']}</span>
    <span class="stat">${stats[j]['base_stat']}</span>
    <progress value="${stats[j]['base_stat']}" max="200"></progress>
  </div>`;
}
