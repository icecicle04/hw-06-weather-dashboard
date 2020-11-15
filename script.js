$(document).ready(function () {
  console.log("Hello World");
  // variables for all IDs
  var searchEl = $("#citySearch");
  var searchBtn = $("#searchButton");
  var mainForecastEl = "#mainForecast";
  var subForecastEl = "#fiveDayForecast";
  var searchedCity = [];

  // searchBtn.on("click", function () {
  //     search

  searchBtn.on("click", function () {
    //initialize divs
    $("#mainForecast").empty();
    $("#fiveDayForecast").empty();
    //save to local storage
    searchedCity.push(searchInputEl.val());
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

  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchInputEl.val() +
    "&appid=a9ce3ccc4f587d59001355747672499e";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    //convert kelvin to F
    var kelvinTemp = response.main.temp;
    var farenTemp = Math.round(((kelvinTemp - 273.15) * 9) / 5 + 32);
    var windSpeed = response.wind.speed;
    var humidity = response.main.humidity;
    var todayImage = response.weather[0].icon;
  });
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
