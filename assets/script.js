var searchBtnEl = $("#search-btn");
var date = moment().format('L');
console.log(date);
var cityNameEl = $("#city-name")
searchBtnEl.on("click", getApi);
var todayTempEl = $("#today-temp")
var todayWindEl = $("#today-wind")
var todayHumidity = $("#today-humidity")
var todayUVEl = $("#today-uv")
var todayUVBadgeEl = $("#today-uv-badge")


// retrieve information from the api
function getApi(coordsSource) {
    var searchBtnText = $("#text-box");
    var APIKey = "eef440075f231dabd98329edc16d0dae";
    var city = searchBtnText.val();
    console.log(city);
    var coordsSource = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
// fetch the location info
    fetch(coordsSource)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
// grab the coordinates of the city and save them as variables
        var lat = data.coord.lat
        console.log(lat);
        var lon = data.coord.lon
        console.log(lon);
// use those variables to then generate the appropriate api path for the daily/week forecast
        var finalAPI = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon=" + lon + "&appid=" + APIKey
// fetch the locations info again, this time using the coords into the better api
        fetch(finalAPI)
            .then(function (response) {
            return response.json();
            })
            .then(function (data) {
            console.log(data);
// start doing stuff with the info
    // create weather icon var from API info
            var icon = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png"
            console.log(icon);
    // create link to weather icon element in html
            var cityNameIconEl = $("#city-name-icon")
    // update weather icon src to new icon from API info
            cityNameIconEl.attr("src", icon)
    // create desired var for new city title
            var newCityName = city + "  (" + date + ")"
    // push changes of city name to HTML
            cityNameEl.text(newCityName)

            })
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
