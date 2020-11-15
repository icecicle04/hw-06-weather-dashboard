$(document).ready(function () {
  console.log("Hello world");

  // variables from the html page elements
  var citySearchEl = $("#citySearch");
  var searchBtn = $("#searchButton");
  var mainForecastEl = $("#mainForecast");
  var subForecastEl = $("#fiveDayForecast");
  var singleTruth = [];

  // on click, we want to dynamically populate the main forecast and five day forecast
  searchBtn.on("click", function () {
    // console.log("i've been clicked");
    // clear out the weather divs before populating the next city
    $("#main-forecast").empty();
    $("#five-day-forecast").empty();
    // save user input to localStorage and populate new button of previous searches
    singleTruth.push(citySearchEl.val());
    localStorage.setItem("city", JSON.stringify(singleTruth));
    $("#city-list").empty();
    // retrieve local storage city input and dynamically generate buttons below the search button
    var populatedCity = JSON.parse(localStorage.getItem("city"));
    for (var i = 0; i < populatedCity.length; i++) {
      // console.log(populatedCity);
      var searchCityBtn = $("<button>");
      searchCityBtn.text(populatedCity[i]);
      $("#city-list").prepend(searchCityBtn);
    }

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
      console.log(response.main.temperature);
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

      //today
      var todayTemp = $("<h5>");
      todayTemp.text("Temperature: " + farenTemp + "F");
      mainWeatherDiv.append(todayTemp);
      var todayWindSpeed = $("<h5>");
      todayWindSpeed.text("Wind Speed: " + windSpeed + "MPH");
      mainWeatherDiv.append(todayWindSpeed);
      var todayHumidity = $("<h5>");
      todayHumidity.text("Temperature: " + humidity + "%");
      mainWeatherDiv.append(todayHumidity);
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
});
