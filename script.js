//data = await fetch('https://pokeapi.co/api/v2/pokemon');

/**
 * <article class="wrapper">
                <div class="pokemon">
                    <img
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png"
                        alt="Bulbasaur"
                        width="96"
                        height="96"
                    />
                    <p>Bulbasaur</p>
                </div>
            </article>
 */
function generatePokemon(pokeNum, pokeName) {
    const container = document.createElement('article');
    container.className = 'wrapper';

    const pokemon = document.createElement('div');
    pokemon.className = 'pokemon';
    container.appendChild(pokemon);

    const image = document.createElement('img');
    image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokeNum}.png`;
    image.alt = pokeName;
    image.width = '96';
    image.height = '96';
    pokemon.appendChild(image);

    const paragraf = document.createElement('p');
    paragraf.innerText = pokeName;
    pokemon.appendChild(paragraf);

    const section = document.querySelector('.pokemonsContainer');
    section.appendChild(container);
}

async function getData(url) {
    //const data = await fetch(url);
    //const response = await data.json();
    const response = await axios.get(url);
    return response.data;
}

function getPokeNum(url) {
    const niz = url.split('/');
    return niz[niz.length - 2];
}

function clearAllChildren() {
    const container = document.querySelector('.pokemonsContainer');
    container.innerHTML = '';
}
async function initPokemons(url) {
    clearAllChildren();
    const pokemons = await getData(url);

    pokemons.results.forEach((element) => {
        const pokeNum = getPokeNum(element.url);
        generatePokemon(pokeNum, element.name);
    });

    const nextButton = document.getElementById('next');
    if (pokemons.next !== null) {
        nextButton.onclick = () => initPokemons(pokemons.next);
        nextButton.disabled = false;
    } else {
        nextButton.onclick = () => null;
        nextButton.disabled = true;
    }

    const prevButton = document.getElementById('prev');
    if (pokemons.previous !== null) {
        prevButton.onclick = () => initPokemons(pokemons.previous);
        prevButton.disabled = false;
    } else {
        prevButton.onclick = () => null;
        prevButton.disabled = true;
    }
}

initPokemons('https://pokeapi.co/api/v2/pokemon');
