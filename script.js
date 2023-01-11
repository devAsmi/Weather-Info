var APIkey = "278c2aedac9a74a82351d9fea704085d";
var searchButton = $("#search");
var currentWeatherContainer = $("#current-weather");
var savedCitiesEl = $("#saved-cities");
var date = dayjs().format("MM/DD/YYYY");

function createCard(title, temp, wind, humidity) {
  // create div with class card
  // <div class="card">
  var cardEl = document.createElement("div");
  $(cardEl).addClass("card");

  // create a div with class card-body
  // <div class="card-body">
  var cardBodyEl = document.createElement("div");
  $(cardBodyEl).addClass("card-body");

  // create a div for card title
  // <h5 class="card-title">
  var cardTitle = document.createElement("h5");
  $(cardTitle).addClass("card-title");
  cardTitle.textContent = title;

  // add title inside the card body
  cardBodyEl.appendChild(cardTitle);

  var tempEl = document.createElement("p");
  tempEl.textContent = "Temp: " + temp + " °F";

  var windEl = document.createElement("p");
  windEl.textContent = "Wind: " + wind + " MPH";

  var humidityEl = document.createElement("p");
  humidityEl.textContent = "Humidity: " + humidity + " %";

  cardBodyEl.append(tempEl);
  cardBodyEl.append(humidityEl);
  cardBodyEl.append(windEl);

  cardEl.appendChild(cardBodyEl);
  return cardEl;
}

// look for all the searched cities in local storage
searchButton.on("click", function (event) {
  // get the name of the city that the user entered
  // if cityName is blank do not do anything
  event.preventDefault();
  var inputEl = $("#city");
  var cityName = $(inputEl).val();
  if (cityName === "") {
    return;
  }

  $(inputEl).val("");
  saveSearchedCity(cityName);
  getTodaysForecast(cityName);
  get5DayForecast(cityName);
  getSavedCities();
});

function get5DayForecast(cityName) {
  const url =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&units=imperial&appid=" +
    APIkey;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

function getTodaysForecast(cityName) {
  var currentDataUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial&appid=" +
    APIkey;

  // fetch call to get the url
  fetch(currentDataUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      $(currentWeatherContainer).empty();
      var cardTitle = data.name + "( " + date + " )";
      var currentWeatherCardEl = createCard(
        cardTitle,
        data.main.temp,
        data.wind.speed,
        data.main.humidity
      );
      currentWeatherContainer.append(currentWeatherCardEl);
    });
}

function saveSearchedCity(cityName) {
  var savedCities = JSON.parse(localStorage.getItem("weather-info-cities"));
  if (!savedCities) {
    savedCities = [];
  }
  savedCities.push(cityName);
  localStorage.setItem("weather-info-cities", JSON.stringify(savedCities));
}

function displaySavedCities(cities) {
  // write code to display all the cities
  for (var i = 0; i < cities.length; i++) {
    var liEl = document.createElement("li");
    $(liEl).addClass("list-group-item list-group-item-primary list-item-city");
    liEl.innerText = cities[i];
    savedCitiesEl.append(liEl);
  }
}

function getSavedCities() {
  var savedCities = localStorage.getItem("weather-info-cities");
  if (savedCities) {
    displaySavedCities(JSON.parse(savedCities));
  }
}

getSavedCities();
