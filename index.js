function getWeatherIcon(description) {
  let condition = description.toLowerCase();

  if (condition.includes("thunder")) {
    return "wi-thunderstorm";
  } else if (
    condition.includes("rain") ||
    condition.includes("drizzle")
  ) {
    return "wi-rain";
  } else if (condition.includes("snow")) {
    return "wi-snow";
  } else if (
    condition.includes("fog") ||
    condition.includes("mist")
  ) {
    return "wi-fog";
  } else if (condition.includes("clear")) {
    return "wi-day-sunny";
  } else if (condition.includes("few clouds") ||
             condition.includes("broken clouds")) {
    return "wi-day-cloudy";
  } else if (condition.includes("cloud")) {
    return "wi-cloudy";
  }

  return "wi-cloud";
}

function displayWeatherCondition(response) {
  let temperatureElement = document.querySelector("#temperature-value-app");
  let cityNameElement = document.querySelector("#city-name-app");
  let dateTimeElement = document.querySelector("#current-date-time");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let temperature = response.data.temperature.current;
  console.log("Current weather icon:", response.data.condition.icon_url);
  let weatherIconElement = document.querySelector("#weather-icon-app");

  cityNameElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  dateTimeElement.innerHTML = formatDate(response.data.time);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} mph`;

  weatherIconElement.innerHTML = `<i class="wi ${getWeatherIcon(response.data.condition.description)} weather-icon-app"></i>`;

  getForecast(response.data.city);
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

  axios.get(apiUrl)
  .then(displayWeatherCondition)
  .catch(function (error) {
    console.error("Current weather error:", error);
    document.querySelector("#weather-description").innerHTML =
      "Unable to load weather data.";
  });
}

function handleSearchSubmit(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "eob2a41574f3at947904539fe34b012a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl)
  .then(displayForecast)
  .catch(function (error) {
    console.error("Forecast error:", error);
  });
}
function displayForecast(response) {
  if (!response.data.daily) {
    console.error("Forecast data is missing.");
    return;
  }

  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `
        <div class="forecast-day">
          <div class="forecast-day-date">${formatDay(day.time)}</div>
          <div class="forecast-day-icon">
            <i class="wi ${getWeatherIcon(day.condition.description)} weather-icon-app"></i>
          </div>
          <div class="forecast-day-temperature">
            <div class="forecast-day-temperatures">
              <strong>${Math.round(day.temperature.maximum)}°</strong>
              <span>${Math.round(day.temperature.minimum)}°</span>
            </div>
          </div>
        </div>
      `;
    }
  });

  forecastElement.innerHTML = forecastHtml;
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Vientiane");
