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
  if (now.getHours() > 12) {
    toggleAmPm.innerHTML = "pm";
  }
}

function defaultWeather(city) {
  let apiKey = "3efd1e97a559110d8a41f701f85fefbb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = temperature;
  let description = response.data.weather[0].description;
  let currentDescription = document.querySelector("#current-description");
  currentDescription.innerHTML = description;
  let humidity = Math.round(response.data.main.humidity);
  let displayHumidity = document.querySelector("#humidity");
  displayHumidity.innerHTML = humidity;
  let windSpeed = Math.round(response.data.wind.speed);
  let displayWindspeed = document.querySelector("#wind");
  displayWindspeed.innerHTML = windSpeed;
}

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let searchCity = document.querySelector("#city");
  searchCity.innerHTML = cityInput.value;
  let city = cityInput.value;
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);

let button = document.querySelector("button");
button.addEventListener("click", currentCity);

currentDayTime();
defaultWeather("New York");
