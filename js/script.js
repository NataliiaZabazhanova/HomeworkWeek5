//showing current date
let now = new Date();
let h2 = document.querySelector("#date__now");

let hours = now.getHours();
let minutes = now.getMinutes();
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
h2.innerHTML = `${day}  ${hours} : ${minutes}`;

//In your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.
function showWeather(response) {
  //отримала дані про погоду у місті, що введено у пошуку
  console.log(response);
  let searchCityTemp = Math.round(response.data.main.temp);
  let newTemp = document.querySelector("#value__tempC");
  newTemp.innerHTML = `${searchCityTemp} °`;
  //вологість
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity} %`;
  //вітер
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  //відобразим назву міста
  let newCityDisplay = document.querySelector("div.currentCity__city");
  newCityDisplay.innerHTML = response.data.name;
}

function searchCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#search__text");
  //для відображення погоди
  // особистий ключ
  let apiKey = "0ea82a607a1deae6e8685bedc59bc1f1";
  //посилання на сайт з api weather
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&units=metric`;
  //викликаю функцію для відображення погоди у бажаному мсті
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}
let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

//додаємо відображення погода за геолокацією
function currentWeatherGeo(response) {
  let currentTempGeo = Math.round(response.data.main.temp);
  let tempGeo = document.querySelector("#value__tempC");
  tempGeo.innerHTML = `${currentTempGeo} °`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity} %`;
  //вітер
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  let cityGeo = document.querySelector("div.currentCity__city");
  cityGeo.innerHTML = response.data.name;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
  let apiKey = "0ea82a607a1deae6e8685bedc59bc1f1";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(currentWeatherGeo);
}
function searchGeo() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#geolocation");
button.addEventListener("click", searchGeo);
