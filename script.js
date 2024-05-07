//here is the object of weatherapi
const weatherApi = {
    key:"4eb3703790b356562054106543b748b2",
    baseUrl:"https://api.openweathermap.org/data/2.5/weather"
}

//get input box
let searchInputBox = document.getElementById('input-box');
searchInputBox.addEventListener('keypress',(event)=>{
    if(event.keyCode === 13){
        getWeatherReport(searchInputBox.value);
    }
});

// getWeatherReport("Delhi");

//get weather report
function getWeatherReport(city){
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather =>{
        console.log(weather);
        return weather.json();
    })
    .then(showWeatherReport);

}

//show weather report

function showWeatherReport(weather){

    let city_code = weather.cod;
    if(city_code === '400'){
        alert("Please enter valid city name");
    }else if(city_code === '404'){
        alert("entered city didn't matched");
    }else {
        let weather_body = document.getElementById('weather-body');
        weather_body.style.display = "block";
        let todayDate = new Date();
        let parent = document.getElementById('parent');
        weather_body.innerHTML = `
        
        <div class='location-details'>
           <div class='city'> ${weather.name}, ${weather.sys.country}</div>

           <div class='date'> ${dateManage(todayDate)}</div>
        </div>
        <div class='weather-status'>
            <div class='temp' id='temp'>${Math.round(weather.main.temp)}&deg;C</div>
            <div class='weather' id='weather'> ${weather.weather[0].main} <i class="${getIconClass(weather.weather[0].main)}"></i> </div>
            <div class='min-max' id='min-max'> ${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.floor(weather.main.temp_max)}&deg;C (max) </div>
            <div id = 'updated_on'> Updated as of ${getTime(todayDate)} </div>
        </div>
        <hr>
        <div class='day-details'>
           <div class='basic'>Feels like ${weather.main.feels_like}&deg;C | Humidity ${weather.main.humidity}% <br> Pressure ${weather.main.pressure} mb | Wind ${weather.wind.speed} KMPH </div>
        </div>

        `;
        parent.append(weather_body);
        reset()
    }
}

// get time
function getTime(todayDate){
    let hour = addZero(todayDate.getHours());
    let minute = addZero(todayDate.getMinutes());
    return `${hour}:${minute}`;
}

function addZero(i){
    if(i<10){
        i = '0'+i;
    }
    return i;
}

function reset(){
    let input = document.getElementById('input-box');
    input.value = '';
}

//icon class function
function getIconClass(weather){
    if(weather === 'Clear'){
        return 'fas fa-sun';
    }else if(weather === 'Clouds'){
        return 'fas fa-cloud';
    }else if(weather === 'Rain'){
        return 'fas fa-cloud-showers-heavy';
    }else if(weather === 'Snow'){
        return 'fas fa-snowflake';
    }else if(weather === 'Thunderstorm'){
        return 'fas fa-bolt';
    }else{
        return 'fas fa-cloud';
    }
}

//date manage
function dateManage(dateArg){
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    let day = days[dateArg.getDay()];
    let date = dateArg.getDate();
    let month = months[dateArg.getMonth()];
    let year = dateArg.getFullYear();

    return `${date} ${month} (${day}), ${year}`;
}