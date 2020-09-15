//FORM variable
var userFormEl = document.querySelector("#city-form");
//user's city input variable
var cityInputEl = document.querySelector("#city-input");
//date variable
var today = new Date();
//array for city searches to be stored in
var cities = [];

//function to save city searches
var saveCity = function (cityName) {
    //array for old searches
    cities.push(cityName);
    console.log(cities);
    localStorage.setItem("cities", JSON.stringify(cities));

}

//function to load tasks from local storage on page refresh
var loadCities = function () {
    cities = JSON.parse(localStorage.getItem("cities"));
    if (cities === null) {
        cities = [];
    };
    for (var i = 0; i < cities.length; i++) {
        var cityButton = document.createElement("button");
        cityButton.textContent = cities[i];
        var cityListItem = document.createElement("li");
        cityListItem.appendChild(cityButton);
        var citiesList = document.querySelector("#city-searches");
        citiesList.appendChild(cityListItem);
        var cityContainer = document.querySelector("#city-searches-container");
        cityContainer.appendChild(citiesList);
        //load previous searches' weather and forecast ON CLICK
        cityButton.addEventListener("click", function (event) {
            getCityWeather(event.target.textContent);
            getCityForecast(event.target.textContent);
        });
    }
};

//function to append saved cities
var appendCity = function (cityName) {
    if (cities.indexOf(cityName) === -1) {
        //add to local storage so old city searches stay
        saveCity(cityName);

        // Append a new button for that city
        var cityButton = document.createElement("button");
        cityButton.textContent = cityName;
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
}


//function to capture form input
var formSubmitHandler = function (event) {
    //prevent browser from sending form's input data to a URL
    event.preventDefault();
    //get value from input element
    var cityName = cityInputEl.value.trim();
    //send username to get weather function
    if (cityName) {
        //run to weather and forecast functions to display on right side of page
        getCityWeather(cityName);
        getCityForecast(cityName);
        //clear the form
        cityInputEl.value = "";
        appendCity(cityName);
    }
    else {
        alert("Please enter a valid city.");
    }
}

var getCityWeather = function (cityName) {
    $("#weather-container").show();
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&APPID=d3238aef2cf51182a7c4ab1025818a0b";
    //make a request to the url
    fetch(apiUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);
            if (data.cod === "404") {
                alert("NO CITY FOUND");
                return;
            }
            var cityTitle = document.querySelector("#city-title")
            cityTitle.textContent = data.name + " (" + today.toLocaleDateString() + ") ";
            var todayIcon = document.createElement("img");
            todayIcon.setAttribute("src", `https://openweathermap.org/img/w/${data.weather[0].icon}.png`)
            cityTitle.appendChild(todayIcon);
            var temp = document.querySelector("#temperature")
            temp.textContent = "Temperature: " + data.main.temp + " °F";
            var humidity = document.querySelector("#humidity")
            humidity.textContent = "Humidity: " + data.main.humidity + "%";
            var wind = document.querySelector("#windspeed")
            wind.textContent = "Wind Speed: " + data.wind.speed + " MPH";
            var lat = data.coord.lat;
            var lon = data.coord.lon;

            var uvApiUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&APPID=d3238aef2cf51182a7c4ab1025818a0b";
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
            var forecastTitle = document.querySelector("#forecastTitle")
            forecastTitle.textContent = "5-Day Forecast:"
            document.querySelector("#card-deck-container").innerHTML = ""
            for (var i = 0; i < 40; i = i + 8) {
                //dynamically create cards
                var forecastCard = document.createElement("div");
                forecastCard.classList.add("card", "bg-primary", "text-white");
                var forecastDate = document.createElement("h5")
                forecastDate.classList.add("card-title")
                forecastDate.textContent = new Date(data.list[i].dt_txt).toLocaleDateString();
                var forecastIcon = document.createElement("img");
                forecastIcon.classList.add("forecastImg")
                forecastIcon.setAttribute("src", `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`)
                var forecastTemp = document.createElement("p");
                forecastTemp.textContent = "Temperature: " + data.list[i].main.temp + " °F";
                var forecastHumidity = document.createElement("p");
                forecastHumidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";
                forecastCard.appendChild(forecastDate);
                forecastCard.appendChild(forecastIcon);
                forecastCard.appendChild(forecastTemp);
                forecastCard.appendChild(forecastHumidity);
                //append to card group container
                var forecastContainer = document.querySelector("#card-deck-container");
                forecastContainer.appendChild(forecastCard);
            }
        })
};

// //load previous searches' weather and forecast ON CLICK
// $(cityButton).click(function () {
//     getCityWeather(cityName);
//     getCityForecast(cityName);
// });

//calls form submit handler 
userFormEl.addEventListener("submit", formSubmitHandler);
loadCities();
$("#weather-container").hide();