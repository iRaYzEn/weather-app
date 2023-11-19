const APIKey = "e8ed24d372c6ca792a5a0b3c67438218";
const APIUrl = `https://api.openweathermap.org/data/2.5/weather?&appid=${APIKey}&units=metric`;
const weatherInfo = document.querySelector(".weather")
const btn = document.querySelector(".btn");
const form = document.querySelector(".search");
const searchInput = document.querySelector(".search__input");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const weatherIcon = document.querySelector(".weather-icon")
const errorElement = document.querySelector(".error")

async function weatherData(country) {
    const res = await fetch(APIUrl + `&q=${country}`)
    // error poor handleing
    if (res.status == 404) {
        errorElement.style.display = "block"
        weatherInfo.style.display = "none";
        throw new Error("invalid country name")
    } 
    const data = await res.json()

    // chaning the UI
    city.textContent = data.name
    temp.textContent = Math.round(data.main.temp) + "°c"
    humidity.textContent = data.main.humidity + "%"
    wind.textContent = data.wind.speed + " km/h"

    // changeing the weather icon based on the the main value
    let weatherCondition = data.weather[0].main;
    weatherIcon.src = `./images/${weatherCondition}.png`

    // making the error message goes away and display the weather inforamtions
    errorElement.style.display = "none"

    weatherInfo.style.display = "block";
}

form.addEventListener("submit", e => {
    e.preventDefault();
    weatherData(searchInput.value);
});
