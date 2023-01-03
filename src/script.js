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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function currentCity() {
  function retrievePosition(position) {
    let apiKey = "3efd1e97a559110d8a41f701f85fefbb";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function displayForecast(response) {
  console.log(response);
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Wed", "Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
        <div class="forecast-day">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/04n@2x.png"
          alt="description-icon"
        />
        <div class="forecast-temps">18° 12°</div>
      </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayFarenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  let farenheitTemp = (celciusTemp * 9) / 5 + 32;
  currentTemp.innerHTML = Math.round(farenheitTemp);
}

function displayCelcius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(celciusTemp);
}

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelcius);

let celciusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let button = document.querySelector("button");
button.addEventListener("click", currentCity);

currentDayTime();
defaultWeather("New York");
