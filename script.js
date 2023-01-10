var APIkey = "278c2aedac9a74a82351d9fea704085d";
var searchButton = $("#search");
var currentWeatherContainer = $("#current-weather");

function createCard() {
  var cardEl = document.createElement("div");
  $(cardEl).addClass("card");
  var cardBodyEl = document.createElement("div");
  cardEl.classList.add("card-body");
  var cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
}

// look for all the searched cities in local storage
searchButton.on("click", function () {
  // get the name of the city that the user entered
  // if cityName is blank do not do anything
  var inputEl = $("#city");
  var cityName = $(inputEl).val();
  if (cityName === "") {
    return;
  }

  // url to get current weather data for the city
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
      // store long and lat from this call
      var long = data.coord.lon;
      var lat = data.coord.lat;

      var cardEl = document.createElement("div");
      //   cardEl.classList.add("card");
      $(cardEl).addClass("card");
      var cardBodyEl = document.createElement("div");
      cardEl.classList.add("card-body");
      var cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");

      // card title
      cardTitle.textContent = data.name;
      cardBodyEl.appendChild(cardTitle);

      // create paragraph elements
      var tempEl = document.createElement("p");
      tempEl.textContent = "Temp: " + data.main.temp;

      var humidityEl = document.createElement("p");
      humidityEl.textContent = "Humidity: " + data.main.humidity;

      var windEl = document.createElement("p");
      windEl.textContent = "Wind: " + data.wind.speed;

      cardBodyEl.append(tempEl);
      cardBodyEl.append(humidityEl);
      cardBodyEl.append(windEl);

      cardEl.appendChild(cardBodyEl);

      currentWeatherContainer.append(cardEl);
    });

  // get the today's weather data for the location
  // get the 5 day forecast for the location
  // save the search text to localStorage
});
