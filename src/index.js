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


// function from axios and searchCity
function displayWeatherCondition(response) {
  // console.log(response.data);
  document.querySelector("#yLocation").innerHTML = response.data.name;
  document.querySelector("#D").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#hi").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector("#lo").innerHTML = Math.round(response.data.main.temp_min);
  
}

// cod for and action submit for form input linkd to searchCity
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

// cod for searchCity to get to api and link to displayWeatherCondition
function searchCity(city) {
  let apiKey = "8a582b67c117653fdcad72d407d325fe";
   
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
   // console.log(axios);
  axios.get(apiUrl).then(displayWeatherCondition);
}

// default city to b displayd and linkd to handleSubmit
searchCity("New York");

function searchLocation(position) {
  let apiKey = "8a582b67c117653fdcad72d407d325fe";
   
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  //  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherCondition);
}


function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#currentButton");
currentLocationButton.addEventListener("click", getCurrentLocation);



// fahrenheit link
function F(event) {
    event.preventDefault();
    let Temp = document.querySelector("#D");
    Temp.innerHTML = "85";
  }
  
  let fahrenheitLink = document.querySelector("#F");
  fahrenheitLink.addEventListener("click", F);
  
  // celsius
  
  function C(event) {
    event.preventDefault();
    let Temp = document.querySelector("#D");
    Temp.innerHTML = "29";
  }
  
  let celsiusLink = document.querySelector("#C");
  celsiusLink.addEventListener("click", C);



