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
var h5El = $("h5")


// retrieve information from the api
function getApi(coordsSource) {
    var searchBtnText = $("#text-box");
    var APIKey = "eef440075f231dabd98329edc16d0dae";
    var city = searchBtnText.val();
    console.log(city);
    var coordsSource = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
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
        var finalAPI = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey
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
    // create desired var for todays temp
            var newTodayTemp = Math.floor(data.current.temp)
            console.log(newTodayTemp);
    // push changes of todays temperature to the HTML
            todayTempEl.text("Temp: " + newTodayTemp + " °F")
    // create var for today's wind
            var newTodayWind = data.current.wind_speed
            console.log(newTodayWind);
    // push changes of todays wind to HTML
            todayWindEl.text("Wind: " + newTodayWind + " MPH")
    // create var for today's humidity
            var newTodayHumidity = data.current.humidity
            console.log(newTodayHumidity);
    // push changes of todays wind to HTML
            todayHumidity.text("Humidity: " + newTodayHumidity + "%")
    // create var for today's uv index
            var newTodayUV = data.current.uvi
    // push changes of todays UVI to HTML
            todayUVEl.text("UV Index: " + newTodayUV)
    // for loop that populates all the forecast boxes
            
    for (i=0; i < h5El.length ; i++) {
    // set future day parameter
        var daysToAdd = 1 + i
    // set forcast days
        var newForecastDay = moment().add(daysToAdd, "days").format("L")
    // push forcast days
        $(h5El[i]).text(newForecastDay);

    // set forecast icon element list
        var forecastIconEl = $(".emoji")
        console.log(forecastIconEl);
    // set forecast icon reference
        var forecastIconApi = data.daily[i].weather[0].icon
        console.log(forecastIconApi);
    // set new forecast icon variable
        var newForecastIcon = "http://openweathermap.org/img/wn/" + forecastIconApi + "@2x.png"
        console.log(newForecastIcon);
    // push new icon to each element in the list
        $(forecastIconEl[i]).attr("src", newForecastIcon)

    // set forecast temp variable 
        var forecastTempEl = $(".temp")
        console.log(forecastTempEl)
    // set forecast temp api reference
        var forecastTempApi = data.daily[i].temp.day
        console.log(forecastTempApi);
    // set new forecast temp variable:
        var newForecastTemp = "Temp: " + forecastTempApi + " °F"
        console.log(newForecastTemp);
    // push new temp to each element in the list
        $(forecastTempEl[i]).text(newForecastTemp)

    // set forecast wind variable 
        var forecastWindEl = $(".wind")
        console.log(forecastWindEl)
    // set forecast wind api reference
        var forecastWindApi = data.daily[i].wind_speed
        console.log(forecastWindApi);
    // set new forecast Wind variable:
        var newForecastWind = "Wind: " + forecastWindApi + " MPH"
        console.log(newForecastWind);
    // push new wind to each element in the list
        $(forecastWindEl[i]).text(newForecastWind)

    // set forecast Humidity variable 
      var forecastHumidityEl = $(".humidity")
      console.log(forecastHumidityEl)
    // set forecast humidity api reference
      var forecastHumidityApi = data.daily[i].humidity
      console.log(forecastHumidityApi);
    // set new forecast humidity variable:
      var newForecastHumidity = "Humidity: " + forecastHumidityApi + "%"
      console.log(newForecastHumidity);
    // push new humidity to each element in the list
      $(forecastHumidityEl[i]).text(newForecastHumidity)
    }
})
});   
}

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
