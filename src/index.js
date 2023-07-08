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

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let currentCity = document.querySelector("#currentCity");

  currentCity.innerHTML = `${searchInput.value}`;
  let apiKey = "54734t1680o470cbbe3f700fdd2fa18e";
  let city = document.querySelector("#search-text-input").value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showTemperature(response) {
  let cityHeading = document.querySelector("#search-text-input");
  cityHeading.innerHTML = response.data.city;
  let temperature = Math.round(response.data.temperature.current);
  let currentTemperature = document.querySelector("#currentTemperature");
  currentTemperature.innerHTML = `currently ${temperature}ºC`;
  let wind = Math.round(response.data.wind.speed);
  currentWind.innerHTML = `Windspeed ${wind} km/h`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}
