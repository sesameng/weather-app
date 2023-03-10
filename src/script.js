function currentDayTime() {
  let now = new Date();
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

  let hour = now.getHours();
  if (hour > 12) {
    hour = hour % 12;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let time = `${hour}:${minutes}`;
  let dateTime = document.querySelector("#date-time");
  dateTime.innerHTML = `${day} ${time}`;

  let toggleAmPm = document.querySelector("#am-pm");
  if (now.getHours() >= 12) {
    toggleAmPm.innerHTML = "pm";
  }
}

function defaultWeather(city) {
  let apiKey = "3efd1e97a559110d8a41f701f85fefbb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function currentCity() {
  function retrievePosition(position) {
    let apiKey = "3efd1e97a559110d8a41f701f85fefbb";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    axios.get(url).then(showWeather);
  }
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let searchCity = document.querySelector("#city");
  searchCity.innerHTML = cityInput.value;
  let city = cityInput.value;
  let apiKey = "3efd1e97a559110d8a41f701f85fefbb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  let currentTemp = document.querySelector("#current-temp");
  let currentDescription = document.querySelector("#current-description");
  let displayHumidity = document.querySelector("#humidity");
  let displayWindspeed = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celciusTemp = response.data.main.temp;
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  currentDescription.innerHTML = response.data.weather[0].description;
  displayHumidity.innerHTML = Math.round(response.data.main.humidity);
  displayWindspeed.innerHTML = Math.round(response.data.wind.speed);

  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "a240bf37178036abd7300o5fdt59caea";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5)
      forecastHTML =
        forecastHTML +
        `<div class="col">
        <div class="forecast-day">${formatDay(forecastDay.time)}</div>
        <img
          src="${forecastDay.condition.icon_url}";
        />
        <div class= "forecast-desc">${forecastDay.condition.description}</div>
        <div class="forecast-temps">
        <span class="forecast-max" id="forecast-max">
        ${Math.round(forecastDay.temperature.maximum)}</span>?? 
        <span class="forecast-min"><span id="forecast-min">
        ${Math.round(forecastDay.temperature.minimum)}</span>??</span></div>
      </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let button = document.querySelector("button");
button.addEventListener("click", currentCity);

currentDayTime();
defaultWeather("New York");
