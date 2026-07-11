function displayWeatherCondition(response) {
  console.log(response.data);

  let temperatureElement = document.querySelector("#temperature-value-app");

  if (temperatureElement) {
    temperatureElement.innerHTML = Math.round(
      response.data.temperature.current,
    );
  } else {
    console.log("Temperature element not found");
  }
}

function searchCity(city) {
  let apiKey = "eob2a41574f3at947904539fe34b012a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  axios
    .get(apiUrl)
    .then(displayWeatherCondition)
    .catch(function (error) {
      console.log("API error:", error);
    });
}

function handleSearchSubmit(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-form-input");
  let cityNameElement = document.querySelector("#city-name-app");

  cityNameElement.innerHTML = searchInput.value;

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");

searchFormElement.addEventListener("submit", handleSearchSubmit);
