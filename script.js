$(document).ready(function () {
  console.log("Hello World");
  // variables for all IDs
  var searchEl = $("#citySearch");
  var searchBtn = $("#searchButton");
  var mainForecastEl = "#mainForecast";
  var subForecastEl = "#fiveDayForecast";

  // searchBtn.on("click", function () {
  //     search

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
