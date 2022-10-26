let currentTime = new Date();

let dateElement = document.querySelector("#d-date");
let timeElement = document.querySelector("#time");



function formatDate(date) {
    
let month = currentTime.getMonth();
let months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

let year = currentTime.getFullYear();

let dDay = currentTime.getDay();
let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

return `${days[dDay]}, ${months[month]} ${year}`;

}

dateElement.innerHTML = formatDate(currentTime);


function formatTime(time) {
    let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = currentTime.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  
  return `${hours}:${minutes}`;
}

timeElement.innerHTML = formatTime(currentTime);

// function to change api dt to days
function formatDt(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}


// function for forecast
function displayForecast(response) {
  console.log(response.data.daily);

  let forecastView = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row" style="width: 360px; margin-left: 65px;">`;
  
  forecastView.forEach(function (forecastDay, index) {
    if (index < 6) {
    forecastHTML = forecastHTML + `
  
              <div class="col-2">
                <div class="weather-forecast-date">
                  ${formatDt(forecastDay.dt)}

                </div>
                
              <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" id="icon1" alt="">
                <div class="weather-forecast-description">${forecastDay.weather[0].description}</div>
            
                <div class="weather-forecast-degree">${Math.round(forecastDay.temp.max)}&#176;/${Math.round(forecastDay.temp.min)}&#176;</div> </img>
              </div>
   
    `;}
  });
  

    forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
  
}


function getForecast(coordinates) {
  let apiKey = "63214c4281922e3bb72fdf12dada7734";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// function from axios and searchCity
function displayWeatherCondition(response) {
 
  document.querySelector("#yLocation").innerHTML = response.data.name;

  celsiusTemp = response.data.main.temp;

  document.querySelector("#D").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#hi").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector("#lo").innerHTML = Math.round(response.data.main.temp_min);
  // document.querySelector("#icon").setAttribute("src" `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.getElementById("icon").src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  document.getElementById("icon").alt = `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`;


  getForecast(response.data.coord);
}

// for and action submit for form input linkd to searchCity
function handleSubmit(event) {
  // debugger;
    event.preventDefault();

    let cityInput = document.querySelector("#search-text-input");
    let city = cityInput.value;
    searchCity(city);
    // let city = document.querySelector("#search-text-input").value;

}

let searchbox = document.querySelector("#searchbox");
searchbox.addEventListener("submit", handleSubmit);

// for searchCity to get to api and link to displayWeatherCondition
function searchCity(city) {
  let apiKey = "8a582b67c117653fdcad72d407d325fe";
   
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
   
  axios.get(apiUrl).then(displayWeatherCondition);
}

// default city to b displayd and linkd to handleSubmit
searchCity("New York");

// displayForecast();

function searchLocation(position) {
  let apiKey = "8a582b67c117653fdcad72d407d325fe";
   
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(displayWeatherCondition);
}


function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#currentButton");
currentLocationButton.addEventListener("click", getCurrentLocation);



// fahrenheit link
function displayFahrenheit(event) {
    event.preventDefault();
    // remove active class from celsius link
    celsiusLink.classList.remove("active");
    // add active class
    fahrenheitLink.classList.add("active");

    let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
    let Temp = document.querySelector("#D");
    Temp.innerHTML = Math.round(fahrenheitTemp);
  }
  
  let fahrenheitLink = document.querySelector("#F");
  fahrenheitLink.addEventListener("click", displayFahrenheit);
  
  // celsius

  let celsiusTemp = null;

  
  function displayCelsius(event) {
    event.preventDefault();

     // remove active class from fahr link
     fahrenheitLink.classList.remove("active");
     // add active class
     celsiusLink.classList.add("active");

    let Temp = document.querySelector("#D");
    Temp.innerHTML = Math.round(celsiusTemp);
  }
  
  let celsiusLink = document.querySelector("#C");
  celsiusLink.addEventListener("click", displayCelsius);



