$(document).ready(function () {
  console.log("Hello World");
  // variables for all IDs
  var citySearchEl = $("#citySearch");
  var searchBtn = $("#searchButton");
  var mainForecastEl = "#mainForecast";
  var subForecastEl = "#fiveDayForecast";
  var searchedCity = [];

  // searchBtn.on("click", function () {
  //     search

  searchBtn.on("click", function () {
    //initialize divs
    console.log("i've been clicked!");
    $("#mainForecast").empty();
    $("#fiveDayForecast").empty();
    //save to local storage
    searchedCity.push(citySearchEl.val());
    localStorage.setItem("city", JSON.stringify(searchedCity));
    $("city-list").empty();

    //get local storage information
    var loadedCity = JSON.parse(localStorage.getItem("city"));
    for (var i = 0; i < loadedCity.length; i++) {
      var searchCityBtn = $("<button>");
      searchCityBtn.text(loadedCity[i]);
      $("city-list").prepend(searchCityBtn);
    }
  });

  // ajax call

  // api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

  var queryURL =
    "api.openweathermap.org/data/2.5/weather?q=" +
    citySearchEl.val() +
    "&appid=2f4b6e6efa53ced733b1323a36800f4d";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    //convert kelvin to F
    var kelvinTemp = response.main.temp;
    var farenTemp = Math.round(((kelvinTemp - 273.15) * 9) / 5 + 32);
    var windSpeed = response.wind.speed;
    var humidity = response.main.humidity;
    var todayImage = response.weather[0].icon;

    var currentMoment = moment().format("DD/MM/YYY");
    //main forecast
    var mainWeatherDiv = $("<div>");
    mainForecastEl.append(mainWeatherDiv);
    var todayCity = $("<h3>");
    todayCity.text(searchEl.val() + " " + currentMoment);
    todayCity.addClass("city-style");
    mainWeatherDiv.append(todayCity);
    var todayImageIcon = $("<img>").attr(
      "src",
      "http://openweathermap.org/img/wn/" + todayImage + "@3x.png"
    );
    mainWeatherDiv.append(todayImageIcon);
  });

  for (var i = 0; i < 10; i++) {
    var emptyEl = $("<div>");
    emptyEl.addClass("test");
    subForecastEl.append(emptyEl);

    var titleTemp = $("<h5>");
    titleTemp.text("placeholder");
    emptyEl.append(titleTemp);

    var titleCity = $("<p>");
    titleCity.text("city");
    emptyEl.append(titleCity);
  }
});
