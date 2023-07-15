let now = new Date();
let currentTime = document.querySelector("#currentTime");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

currentTime.innerHTML = `${day} ${date} ${month} ${year} , ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
      <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
        forecastDay.condition.icon
      }.png" />
      <div class="weather-forecast-temperature">
        <span class="weather-forecast-temperature-max">${Math.round(
          forecastDay.temperature.maximum
        )}ºC / </span>
        <span class="weather-forecast-temperature-min">${Math.round(
          forecastDay.temperature.minimum
        )}ºC</span>
      </div>
    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "54734t1680o470cbbe3f700fdd2fa18e";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  let cityHeading = document.querySelector("#search-text-input");
  let currentTemperature = document.querySelector("#currentTemperature");
  let description = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  let currentCity = document.querySelector("#currentCity");
  let searchInput = document.querySelector("#search-text-input");

  let wind = Math.round(response.data.wind.speed);

  celsiusTemperature = response.data.temperature.current;
  let temperature = Math.round(`${celsiusTemperature}`);

  currentCity.innerHTML = `${searchInput.value}`;
  cityHeading.innerHTML = response.data.city;
  currentTemperature.innerHTML = `${temperature}`;
  currentWind.innerHTML = `Windspeed ${wind} km/h`;
  description.innerHTML = response.data.condition.description;
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "54734t1680o470cbbe3f700fdd2fa18e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input");
  search(city.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");
