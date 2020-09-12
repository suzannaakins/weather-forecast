var getCityWeather = function (city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=d3238aef2cf51182a7c4ab1025818a0b"
    //make a request to the url
    var response = fetch(apiUrl);
    console.log(response);
};


// var weatherContainerEl = document.querySelector("#weather-container");
// var forecastContainerEl = document.querySelector("#forecast-container")
// var citySearchTerm = document.querySelector("#city-search-term");
// var userFormEl = document.querySelector("#city-form");
// var cityInputEl = document.querySelector("#city-input");
// var cityButtonsEl = document.querySelector("#city-searches")

// //function to capture form input
// var formSubmitHandler = function (event) {
//     //prevent browser from sending form's input data to a URL
//     event.preventDefault();
//     //get value from input element
//     var cityName = cityInputEl.value.trim();
//     //send username to get repos function
//     if (cityName) {
//         getCityWeather(cityName);
//         //clear the form
//         cityInputEl.value = "";
//     }
//     else {
//         alert("This city in unavailable. OUR APOLOGIES.");
//     }
// }

// //function that retrieves the repos of the username entered
// var getCityWeather = function (city) {
//     //format the weather api url
//     //api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
//     var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=d3238aef2cf51182a7c4ab1025818a0b"
//     //make a request to the url
//     fetch(apiUrl)
//         .then(function (response) {
//             if (response.ok) {
//                 response.json().then(function (data) {
//                     displayWeather(data, city);
//                 });
//             } else {
//                 alert("Error: " + response.statusText);
//             }
//         })
//         .catch(function (error) {
//             alert("Unable to retrieve weather sorryyyyyy");
//         });
// };

// var getCityForecast = function () {
//     //format the forecast api url
//     var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=d3238aef2cf51182a7c4ab1025818a0b"
//     //make a request to the url
//     fetch(apiUrl)
//         .then(function (response) {
//             if (response.ok) {
//                 response.json().then(function (data) {
//                     displayForecast(data, city);
//                 });
//             } else {
//                 alert("Error: " + response.statusText);
//             }
//         })
//         .catch(function (error) {
//             alert("Unable to retrieve weather sorryyyyyy");
//         });
// }

// //function to display the repos
// var displayWeather = function (data, city) {
//     //check if API returned any repos
//     if (weather.length === 0) {
//         weatherContainerEl.textContent = "No weather found for this city.";
//         return;
//     }
//     //clear old content
//     weatherContainerEl.textContent = "";
// }

// var displayForecast = function() {



//     //loop over city for days of forecast
//     for (var i = 0; i < weather.length; i++) {
//         // format city name
//         var repoName = repos[i].owner.login + "/" + repos[i].name;
//         //create a container for each repo
//         var repoEl = document.createElement("a");
//         repoEl.classList = "list-item flex-row justify-space-between align-center";
//         repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);
//         //create a span element to hold repository name
//         var titleEl = document.createElement("span");
//         titleEl.textContent = repoName;
//         //append to container
//         repoEl.appendChild(titleEl);

//         //create a STATUS element
//         var statusEl = document.createElement("span");
//         statusEl.classList = "flex-row align-center"
//         //check if current repo has issues or not
//         if (repos[i].open_issues_count > 0) {
//             statusEl.innerHTML =
//                 "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + "issue(s)";
//         } else {
//             statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
//         }
//         //append to container
//         repoEl.appendChild(statusEl);
//         //append container to DOM
//         repoContainerEl.appendChild(repoEl);
//     }
// }


// }

// //function to react to previous searches button clicks
// var buttonClickHandler = function (event) {
//     var previousCity = event.target.getAttribute("city-searches");
//     if (city) {
//         getCityWeather(city);
//         //clear old content
//         weatherContainerEl.textContent = "";
//     }
// }

// userFormEl.addEventListener("submit", formSubmitHandler);
// cityButtonsEl.addEventListener("click", buttonClickHandler);