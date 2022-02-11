let currentDate = new Date();
let newDate = document.querySelector("#date");
let currentTime = document.querySelector("#hour");

let date = currentDate.getDate();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Satruday",
];
let day = days[currentDate.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "Octuber",
  "November",
  "December",
];
let month = months[currentDate.getMonth()];

newDate.innerHTML = `${day}, ${month} ${date}`;
currentTime.innerHTML = `${hours}:${minutes}`;

//display forecast 
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
  forecastHTML = 
  forecastHTML +
    `
    <div class="col-2" >
      <div class="weather-forecast-date">
        ${day} </div>
        <img 
          src ="https://openweathermap.org/img/wn/50d@2x.png"
          alt = ""
          width ="50"
          />
          <div class= "weather-forecast-temperature">
          <span class = "weather-forecast-temperature-max">
          18° </span>
          <span class = "weather-forecast-temperature-min">
          12°
         </span>
        </div>
      </div>
    
  `;
});

 
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

}

// initialization
let apiKey = "52bbbc39482454c0d5175f36ac3f0688";
let units = "metric";

getWeatherInfoByCity("saskatoon");

// events
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let searchingCity = document.querySelector("#searching-city");
  searchingCity.innerHTML = `${searchInput.value}`;
  getWeatherInfoByCity(searchInput.value);
}

let button = document.querySelector("#position-button");
button.addEventListener("click", getCurrentPosition);

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

// function helpers
function getWeatherInfoByCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(setWeatherInfo);
}

// this function update the html elements with weather info
function setWeatherInfo(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}`;

  celsiusTemperature = response.data.main.temp;

  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = `Feels ${Math.round(
    response.data.main.feels_like
  )} °C`;

  let cityLabelElement = document.querySelector("#searching-city");
  cityLabelElement.innerHTML = response.data.name;

  let conditionElement = document.querySelector("#conditions");
  conditionElement.innerHTML = response.data.weather[0].description;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `wind: ${response.data.wind.speed}`;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `humidity: ${response.data.main.humidity}%`;
  

  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  displayForecast();
}

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(setWeatherInfo);
}

function showFarenheitTemperature(event) {
  event.preventDefault();
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", showFarenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

