function displayWeatherCondition(response) {
  let temperatureElement = document.querySelector("#temperature-value-app");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  let cityNameElement = document.querySelector("#city-name-app");
  cityNameElement.innerHTML = response.data.city;

  let weatherDescriptionElement = document.querySelector(
    "#weather-description-app",
  );

  weatherDescriptionElement.innerHTML = `
    ${response.data.condition.description}
    <br />
    Humidity: <strong>${response.data.temperature.humidity}%</strong>
    Wind: <strong>${response.data.wind.speed} km/h</strong>
  `;
}

function searchCity(city) {
  let apiKey = "eob2a41574f3at947904539fe34b012a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSearchSubmit(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
