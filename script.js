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
