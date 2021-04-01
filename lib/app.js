// TODO: Write your JS code in here
import mapboxgl from 'mapbox-gl';

const button = document.getElementById('submit');
const address = document.getElementById('address');
const place = document.getElementById('place');
const coordinates = document.getElementById('coordinates');
const stats = document.getElementById('key-stats');
const langs = document.getElementById('languages');

const writeHTML = (placename, lat, long) => {
  place.innerHTML = `Here are some facts about ${placename}:`;
  coordinates.innerHTML = `Longitude:${long} <br> Latitude:${lat}`;
};

const fetchMap = (lat, long) => {
  mapboxgl.accessToken = 'YOUR_API_KEY';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [long, lat],
    zoom: 5
  });
};

const displayStats = (region, capital, population, flag) => {
  stats.innerHTML = "";
  stats.insertAdjacentHTML("afterBegin", `<img src="${flag}" style="height: 50px; width: 100px"></img><p>Region: ${region}</p><p>Capital: ${capital}</p><p>Population: ${population}</p>`);
};

const displayLanguages = (languages) => {
  langs.innerHTML = "Languages: ";
  languages.forEach((language) => {
    langs.insertAdjacentHTML("beforeEnd", `${language.name} `);
    console.log(language.name);
  });
};

button.addEventListener("click", (event) => {
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address.value}.json?access_token=YOUR_API_KEY`)
    .then(response => response.json())
    .then((data) => {
      const long = data.features[0].geometry.coordinates[0];
      const lat = data.features[0].geometry.coordinates[1];
      writeHTML(address.value, lat, long);
      fetchMap(lat, long);
    });
  fetch(`https://restcountries.eu/rest/v2/name/${address.value}`)
    .then(response => response.json())
    .then((data) => {
      const region = data[0].region;
      const capital = data[0].capital;
      const population = data[0].population;
      const flag = data[0].flag;
      const languages = data[0].languages;
      displayStats(region, capital, population, flag);
      displayLanguages(languages);
    });
});
