//FORM variable
var userFormEl = document.querySelector("#city-form");
//user's city input variable
var cityInputEl = document.querySelector("#city-input");
//date variable
var today = new Date();
//array for city searches to be stored in
var cities = [];

//function to save city searches
var saveCity = function () {
    //array for old searches
    var cityName = cityInputEl.value.trim();
    cities.push(cityName);
    localStorage.setItem("cities", JSON.stringify(cities));
}

//function to load tasks from local storage on page refresh
var loadCities = function () {
    for (var i = 0; i < cities.length; i++) {
        JSON.parse(localStorage.getItem(cities[i]));
        var cityButton = document.createElement("button");
        cityButton.textContent = cities[i];
        var cityListItem = document.createElement("li");
        cityListItem.appendChild(cityButton);
        var citiesList = document.querySelector("#city-searches");
        citiesList.appendChild(cityListItem);
        var cityContainer = document.querySelector("#city-searches-container");
        cityContainer.appendChild(citiesList);
    }
    //load previous searches' weather and forecast ON CLICK
    $(cityButton).click(function () {
        getCityWeather(cityName);
        getCityForecast(cityName);
    });
};

//function to capture form input
var formSubmitHandler = function (event) {
    //prevent browser from sending form's input data to a URL
    event.preventDefault();
    //get value from input element
    var cityName = cityInputEl.value.trim();

    //send username to get weather function
    if (cityName) {
        //append city name search item to previous searches list
        var cityButton = document.createElement("button");
        cityButton.textContent = cityName;
        var cityListItem = document.createElement("li");
        cityListItem.appendChild(cityButton);
        var citiesList = document.querySelector("#city-searches");
        citiesList.appendChild(cityListItem);
        var cityContainer = document.querySelector("#city-searches-container");
        cityContainer.appendChild(citiesList);

        //add to local storage so old city searches stay after a refresh
        saveCity();

        //run to weather and forecast functions to display on right side of page
        getCityWeather(cityName);
        getCityForecast(cityName);
        //clear the form
        cityInputEl.value = "";

        //load previous searches' weather and forecast ON CLICK
        $(cityButton).click(function () {
            getCityWeather(cityName);
            getCityForecast(cityName);
        });
    }
    else {
        alert("Please enter a valid city.");
    }
}

var getCityWeather = function (cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&APPID=d3238aef2cf51182a7c4ab1025818a0b";
    //make a request to the url
    fetch(apiUrl)
        .then(function (response) {
            if (response !== undefined) {
                return response.json()
            }
            else if (response === undefined) {
                alert("This is not a valid city. Please try again.")
            }
        })
        .then(function (data) {
            var cityTitle = document.querySelector("#city-title")
            cityTitle.textContent = data.name + " (" + today.toLocaleDateString() + ") " + "icon";
            var temp = document.querySelector("#temperature")
            temp.textContent = "Temperature: " + data.main.temp + " °F";
            var humidity = document.querySelector("#humidity")
            humidity.textContent = "Humidity: " + data.main.humidity + "%";
            var wind = document.querySelector("#windspeed")
            wind.textContent = "Wind Speed: " + data.wind.speed + " MPH";
            var lat = data.coord.lat;
            var lon = data.coord.lon;

            var uvApiUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&APPID=d3238aef2cf51182a7c4ab1025818a0b";
            fetch(uvApiUrl)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    var uv = document.querySelector("#uv");
                    uv.textContent = "UV Index: ";
                    var uvcolor = document.querySelector("#uv-data");
                    uvcolor.textContent = data.value;
                    //color code uv
                    if (data.value >= 8) {
                        uvcolor.classList.add("severe")
                    } else if (data.value <= 2) {
                        uvcolor.classList.remove("severe")
                        uvcolor.classList.remove("moderate")
                        uvcolor.classList.add("favorable")
                    } else {
                        uvcolor.classList.remove("severe")
                        uvcolor.classList.remove("favorable")
                        uvcolor.classList.add("moderate")
                    }
                });
        });
};


var getCityForecast = function (cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&APPID=d3238aef2cf51182a7c4ab1025818a0b";
    fetch(apiUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            //loop through first 5 items of array (i 0 through 4)
            for (var i = 0; i < 4; i++) {
                //display date ( newDate()+(i+1) ), icon (data.weather.main will give description of what icon should be), 
                //temp (data.main.temp), and humidity(data.main.humidity) for each
            }
        });
}

// //load previous searches' weather and forecast ON CLICK
// $(cityButton).click(function () {
//     getCityWeather(cityName);
//     getCityForecast(cityName);
// });

//calls form submit handler 
userFormEl.addEventListener("submit", formSubmitHandler);
loadCities();