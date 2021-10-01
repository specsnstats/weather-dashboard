// create a variable that pulls a specific city based on clicking a city button or clicking search in the search bar
// create a button listener for each button
// create a variable for the button element and the search button and the text value of the search button
var btnEL = $("button");
// in the button listener, have the function run that saves the value of the button pressed (or the value of the text for the search button) in a variable
btnEL.on("click", getApi)

// retrieve information from the api
function getApi(weatherSource) {
  var btnEL = $("button");
  var searchBtnEl = $("#search-btn");
  var searchBtnText = $("#text-box").val();
  var APIKey = "eef440075f231dabd98329edc16d0dae";
  var city = "boston";
  var weatherSource = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  fetch(weatherSource)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
// create a then that retrieves the individual information for day 1

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
