//FORM variable
var userFormEl = document.querySelector("#city-form");
//user's city input variable
var cityInputEl = document.querySelector("#city-input");
//date variable
var today = new Date();

//function to capture form input
var formSubmitHandler = function (event) {
    //prevent browser from sending form's input data to a URL
    event.preventDefault();
    //get value from input element
    var cityName = cityInputEl.value.trim();
    //send username to get weather function
    if (cityName) {
        getCityWeather(cityName);
        //clear the form
        cityInputEl.value = "";
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
            return response.json()
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
                        uvcolor.classList.add("favorable")
                    } else {
                        uvcolor.classList.add("moderate")
                    }
                });
        });
};

//calls form submit handler 
userFormEl.addEventListener("submit", formSubmitHandler);