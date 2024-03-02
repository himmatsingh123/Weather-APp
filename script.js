// declare all the required  variables
const timeE1  = document.getElementById('time');
const dateE1  = document.getElementById('date');
const currentWeatherItemsE1 = document.getElementById('current_weather_items');
const timezone = document.getElementById('time_zone');
const countryE1= document.getElementById('country');
const weatherForecastE1 = document.getElementById('weather_forecast');
const currentTempE1 = document.getElementById('current_temp');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// API key from Open Weather Map 
const apiKey =  '49cc8c821cd2aff9af04c9f98c36eb74';


// Get the current date and time from inbult date method
setInterval(()=>{
   const time = new Date();
   const month = time.getMonth();
   const date = time.getDate();
   const day = time.getDay();
   const hour = time.getHours();
   const format = hour >= 13 ? hour %12 : + hour;
   const minutes = time.getMinutes();
   const ampm = hour >=12 ?  'PM' : 'AM';

   timeE1.innerHTML = format + ':' + (minutes < 10? '0'+minutes: minutes) + ' '+ `<span id="am_pm"> ${ampm}</span>`;
   dateE1.innerHTML = days[day] + ',' + ' ' + date +  ' ' + months[month];

},1000);

// function to fetch data from open weather Map Api...
getTimeZone();
function getTimeZone() {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${apiKey}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    })
     }
  // show fetched data in HTML format
     function showWeatherData(data){
        let {temp,humidity,pressure,wind_speed} = data.current;
        currentWeatherItemsE1.innerHTML = 
 
        `<div class="weather-item">
        <div>Temprature</div>
        <div>${temp}&#176;C </div>
      </div>
      <div class="weather-item">
         <div>Humidity</div>
        <div>${humidity}%</div>
        </div>
        <div class="weather-item">
          <div>Pressure</div>
          <div>${pressure}</div>
        </div>
        <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed} Km/h</div>
      </div>
        
        `;

        let otherDayForcast = ''
        data.daily.forEach((day, idx) => {
            if(idx == 0){
                currentTempE1.innerHTML = `
                <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
                <div class="other">
                    <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                    <div class="temp">Night - ${day.temp.night}&#176;C</div>
                    <div class="temp">Day - ${day.temp.day}&#176;C</div>
                </div>
                
                `
            }else{
                otherDayForcast += `
                <div class="weather_forecast_item">
                    <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                    <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                    <div class="temp">Night - ${day.temp.night}&#176;C</div>
                    <div class="temp">Day - ${day.temp.day}&#176;C</div>
                </div>
                
                `
            }
        })
    
    
        weatherForecastE1.innerHTML = otherDayForcast;
    }
    var geocoder  = new google.maps.Geocoder();             // create a geocoder object
    var location  = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);    // turn coordinates into an object          
    geocoder.geocode({'latLng': location}, function (results, status){
        if(status == google.maps.GeocoderStatus.OK) {           // if geocode success
            var add=results[0].formatted_address;         // if address found, pass to processing function
            document.write(add);
            }
    });
    
