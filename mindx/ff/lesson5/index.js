        // const url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
        // fetch(url)
        //     .then(response => response.json())
        //     .then(data => renderPokemons(data.results))
        //     .catch(error => console.error('Error:', error));
        

        // function renderPokemons(pokemons) {
        //     const pokemonList = document.getElementById('pokemon-list')
        //     pokemons.forEach(pokemon => {
        //         const pokemonItem = document.createElement('li')
        //         pokemonItem.textContent = pokemon.name
        //         pokemonList.appendChild(pokemonItem)
        //     })
        // }        


const apiKey = '9b7c3ede447b14c5e0e9d33a137ddac9';
const city = 'London';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log('Weather Data:', data);
        const weatherDescription = data.weather[0].description;
        console.log(`Current weather in ${city}: ${weatherDescription}`);
    })
    .catch(error => console.error('Error:', error));

function renderWeather(weather) {
    const weatherList = document.getElementById('weather-list')
    weather.forEach(item => {
        const weatherItem = document.createElement('li')
        weatherItem.textContent = item.description
        weatherList.appendChild(weatherItem)
    })
}
