//q={city name}&appid={API key} 
const weatherApi = {
    key: 'c1dcb33312de3397225d5e3d3cab77cc',
    baseUrl : 'https://api.openweathermap.org/data/2.5/weather'
}


//event listener function on keypress
const searchInputBox = document.getElementById('input-box_');
searchInputBox.addEventListener('keyup', (event)=>{
    if(event.key == "Enter"){
      console.log(searchInputBox.value);
      getweatherreport(searchInputBox.value);
    }
});

//get weather report
function getweatherreport(city){
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}`)
    .then(weather=>{
        return weather.json();
    }).then(showWeatherreport);
}

//show weather report
function showWeatherreport(weather){
    console.log(weather);

    let city = document.getElementById('city_');
    city.innerText= `${weather.name}, ${weather.sys.country}`;

    let temp= document.getElementById('temp_');
    let temp_value = `${Math.round(weather.main.temp)}`-273;
    temp.innerHTML = `${temp_value}&deg;C`;

    let maxminTemp= document.getElementById('max-min_');
    min_temp_value=`${Math.floor(weather.main.temp_min)}`-273;
    max_temp_value =`${Math.ceil(weather.main.temp_max)}`-273;
    maxminTemp.innerHTML = `${min_temp_value}&deg;C (Min) / ${max_temp_value}&deg;C (Max)`;

    let weatherType = document.getElementById('weather_');
    weatherType.innerHTML = `${weather.weather[0].main}`;

    let date = document.getElementById('date_');
    let todaydate = new Date();
    date.innerText = dateManager(todaydate);

    if(weatherType.textContent== "Clear"){
        document.body.style.backgroundImage= "url('clear-cloud.jpg')";
    }
    else if(weatherType.textContent == "Haze"){
        document.body.style.backgroundImage= "url('sunnycloud.png')";
    }
    else if(weatherType.textContent == "Clouds"){
        document.body.style.backgroundImage= "url('cloudy.jpg')";
    }
    else if(weatherType.textContent == "Rain"){
        document.body.style.backgroundImage= "url('rain.cms')";
    }
    else if(weatherType.textContent == "Snow"){
        document.body.style.backgroundImage= "url('snowfall.jpg')";
    }
    else if(weatherType.textContent == "Thunderstorm"){
        document.body.style.backgroundImage= "url('thunderstrom.jpg')";
    }
}
//data manage

function dateManager(todaydate){
    let day = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"];

    let months=["January", "February", "March", "April", "May","June", "July","August","September", "October", "Novmber", "December"]

    let year= todaydate.getFullYear();
    let month = months[todaydate.getMonth()];
    let date= todaydate.getDate();
    let day_ = day[todaydate.getDay()];

    return `${date} ${month} (${day_}), ${year}`

}