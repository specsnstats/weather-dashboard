var searchBtnEl = $("#search-btn");
var searchHistoryBtnEl = $("search-history-btn")
var date = moment().format('L');
var cityNameEl = $("#city-name")
var todayTempEl = $("#today-temp")
var todayWindEl = $("#today-wind")
var todayHumidity = $("#today-humidity")
var todayUVEl = $("#today-uv")
var todayUVBadgeEl = $("#today-uv-badge")
var h5El = $("h5")
var searchHistoryList = $("#search-history-list")
var searchBtnText = $("#text-box");
searchBtnEl.on("click", searchBtnRun);
$("search-history-list").on("click", ".search-history-btn", historyBtnRun)


// retrieve information from the api
function searchBtnRun(coordsSource) {
    var city = searchBtnText.val();
    var APIKey = "eef440075f231dabd98329edc16d0dae";

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
    
    // create button of past search
        searchHistoryList.append(`<button type="button" class="btn btn-secondary search-history-btn my-2" id="`+ searchBtnText.val() + `">`+ searchBtnText.val() + `</button>`)    

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
    // erase the value in the search box
    searchBtnText.val("")
})
});   
    
}