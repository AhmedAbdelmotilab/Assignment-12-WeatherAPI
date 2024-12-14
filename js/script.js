'use strict';
searchCity();
getLocation();
/* ------------------------------------------------ Get User Location ----------------------------------------------- */
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}
function showPosition(position) {
  let myLocation = 'Latitude: ' + position.coords.latitude + 'Longitude: ' + position.coords.longitude;
  getWeather(`${position.coords.latitude}, ${position.coords.longitude}`);
  console.log(myLocation);
}
/* ------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------ User Search Input ----------------------------------------------- */
/* ----------------------- I Didn't Use The Search Button Because This Api Is RealTime Search ----------------------- */
/* ------------------------------------- But Here Is The Code For Search Button ------------------------------------- */
// function searchCity() {
//   let searchInput = document.getElementById('searchInput');
//   let searchBtn = document.getElementById('searchBtn');
//   searchBtn.addEventListener('click', function () {
//     let term = searchInput.value;
//     getWeather(term);
//   });
// }
/* ------------------------------------------------------------------------------------------------------------------ */
function searchCity() {
  let searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', function () {
    let term = searchInput.value;
    getWeather(term);
  });
}
/* ------------------------------------------------------------------------------------------------------------------ */
async function getWeather(query) {
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=4c1ad7d960dd4d678f6162449241212&q=${query}&days=3`;
  try {
    let response = await fetch(apiUrl);
    if (response.ok) {
      let myData = await response.json();
      displayWeather(myData);
    }
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
  }
}
/* ------------------------------------------------------------------------------------------------------------------ */
/* --------------------------------------------- Display Weather In HTML -------------------------------------------- */
function displayWeather(weather) {
  const dateString = weather.location.localtime;
  const date = new Date(dateString);
  const dayName = date.toLocaleString('en-US', { weekday: 'long' });
  const monthName = date.toLocaleString('en-US', { month: 'long' });
  const dayOfMonth = date.getDate();
  let myWeatherElement = '';
  myWeatherElement += `
          <div class="col-lg-4 col-md-6">
            <div class="card">
              <div class="card-one">
                <div class="card-header d-flex justify-content-between">
                  <h5>${dayName}</h5>
                  <h5> ${dayOfMonth} ${monthName}</h5>
                </div>
                <div class="card-body">
                  <h5 class="card-title">${weather.location.name}</h5>
                  <span class="toDayTemp">${weather.current.temp_c} &deg;C</span>
                  <img src="${weather.current.condition.icon}" class="tempStatusImage d-block" alt="WeatherImage" />
                  <span class="tempStatus">${weather.current.condition.text}</span>
                  <div class="icons d-flex justify-content-around pt-4">
                    <span><i class="fa-solid fa-umbrella pe-2"></i> ${weather.current.humidity}%</span>
                    <span><i class="fa-solid fa-wind pe-2"></i> ${weather.current.wind_kph}kph</span>
                    <span><i class="fa-solid fa-compass pe-2"></i>${weather.current.wind_dir}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
  /* ------------------------------------------------------------------------------------------------------------------ */
  let weatherNextDays = weather.forecast.forecastday;
  for (let i = 1; i < weatherNextDays.length; i++) {
    const dateString = weatherNextDays[i].date;
    const date = new Date(dateString);
    const dayName = date.toLocaleString('en-US', { weekday: 'long' });
    myWeatherElement += `
    <div class="col-lg-4 col-md-6">
            <div class="card">
              <div class="card-two">
                <div class="card-header text-center">
                  <h5>${dayName}</h5>
                </div>
                <div class="card-body">
                  <div class="img d-flex justify-content-center align-items-center">
                    <img src="${weatherNextDays[i].day.condition.icon}" class="tempStatusImage pt-5" alt="" />
                  </div>
                  <div class="temp">
                    <span class="tomorrowTempOne d-block text-center pt-3">${weatherNextDays[i].day.maxtemp_c}&deg;C</span>
                    <span class="tomorrowTempTwo d-block text-center pt-2">${weatherNextDays[i].day.mintemp_c}&deg;</span>
                  </div>
                  <span class="tempStatus d-block text-center pt-5">${weatherNextDays[i].day.condition.text}</span>
                </div>
              </div>
            </div>
          </div>`;
  }
  document.getElementById('rowData').innerHTML = myWeatherElement;
}
/* ------------------------------------------------------------------------------------------------------------------ */
