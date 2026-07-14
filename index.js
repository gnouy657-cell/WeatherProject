function displayWeatherCondition(response) {
  let temperatureElement = document.querySelector("#temperature-value-app");
  let cityNameElement = document.querySelector("#city-name-app");
  let dateTimeElement = document.querySelector("#current-date-time");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let temperature = response.data.temperature.current;

  let weatherIconElement = document.querySelector("#weather-icon-app");

  cityNameElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  dateTimeElement.innerHTML = formatDate(response.data.time);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} mph`;

  weatherIconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon-app">`;
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
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

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="forecast-day">
        <div class="forecast-day-date">${day}</div>
        <div class="forecast-day-icon">☀️</div>
        <div class="forecast-day-temperature">
          <div class="forecast-day-temperatures">
            <strong>20°</strong>
          </div>
          <div class="forecast-day-temperature">10°</div>
        </div>
      </div>
      `;
  });

  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Vientiane");
displayForecast();
