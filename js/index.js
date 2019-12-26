$(document).ready(updateWeather(37.8267, -122.4233))

$("#long_lat").on("click", function(){
    var longitude = document.getElementById("longitude")
    var latitude = document.getElementById("latitude")
    updateWeather(latitude.value, longitude.value)
})

function updateWeather(latitude, longitude){
    console.log(longitude);
    var url ='https://api.darksky.net/forecast/80b94ea6aa50d2d6c650d46fe3c23af6/'+ latitude + ',' + longitude; //Place your DarkSky API Call Here
    $.ajax({url:url, dataType:"jsonp"}).then(function(data) {
        console.log(data);//Review all of the data returned
        console.log("Current Temp: " + data.currently.apparentTemperature);//View Today's Temp
        console.log("Tomorrow's High: " + data.daily.data[1].apparentTemperatureHigh);//View Tomorrow's High

/*
  Read the current weather information from the data point values [https://darksky.net/dev/docs#data-point] to
  update the webpage for today's weather:
  1. image_today : This should display an image for today's weather.
           This will use the icon data point and pair it with an appropriate .png file (located in the img directory.)
  2. icon_today : This will be set to display the current icon value.
  3. temp_today : This will be updated to match the current temperature.
  4. thermometer_inner : Modify the height of the thermometer to match the current temperature. This means if the
               current temperature is 32 F, then the thermometer will have a height of 32%.  Please note,
               this thermometer has a lower boundary of 0 and upper boundary of 100.
  5. precip_today : This will be updated to match the current probability for precipitation.(make sure this is
            listed as a percentage %)
  6. humidity_today : This will be updated to match the current humidity percentage (make sure this is listed as a
            percentage %)
  7. wind_today : This will be updated to match the current wind speed.
  8. summary_today: This will be updated to match the current summary for the day's weather.
*/
//1
        document.getElementById('image_today').src = 'img/' + data.currently.icon + '.png';
//2
        document.getElementById('icon_today').innerHTML = data.currently.icon;
//3
        var temperature = data.currently.temperature;
        document.getElementById('temp_today').innerHTML = temperature + ' F';
//4
        document.getElementById('thermometer_inner').style.height = temperature + '%';
//bonus - editing color:
        var color;
        if(temperature <= 10)
          color = "#6495ED"
        else if(temperature <= 20)
          color = "#7FFFD4"
        else if(temperature <= 30)
          color = "#0000FF"
        else if(temperature <= 40)
          color = "#008B8B"
        else if(temperature <= 50)
          color = "#00BFFF"
        else if(temperature <= 60)
          color = "#F08080"
        else if(temperature <= 70)
          color = "#CD5C5C"
        else if(temperature <= 80)
          color = "#8B0000"
        else if(temperature <= 90)
          color = "#B22222"
        else
          color = "#FF0000"
        document.getElementById('thermometer_inner').style.background = color;
//5
        document.getElementById('precip_today').innerHTML = data.currently.precipProbability + '%';
//6
        document.getElementById('humidity_today').innerHTML = data.currently.humidity + '%';
//7
        document.getElementById('wind_today').innerHTML = data.currently.windSpeed;
//8
        document.getElementById('summary_today').innerHTML = data.currently.summary;

/* Process the daily forecast for the next 6 days */
/*
  For the next 6 days you'll need to add a new card listing:
    1. The image icon for the day's weather
    2. The temperature high
    3. The temperature low

  Each card should use the following format:
  <div class="col-2">
    <div class="card">
      <img class="card-img-top" src="<!-- List Icon for the Day's Weather -->" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title"><!-- List Day of the Week Here --></h5>
        <p class="card-text">High:<!--List Temperature High --> <br>
          Low: <!-- List Temperature Low --></p>
      </div>
    </div>
  </div>

  <Hint/Note> - Make sure to use string concatenation to add the html code for the daily weather cards.  This should
  be set to the innerHTML for the 6_day_forecast.
*/
        var week_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; //This is a helper array to help convert the day of the week [0-7] to a named value [Sunday - Saturday]
        document.getElementById('6_day_forecast').innerHTML = "";
        for(var i = 1; i <= 6; i++){
            var image = 'img/' + data.daily.data[i].icon + '.png';
            var unix_time = data.daily.data[i].time;//Retrieve the current timestamp
            var javascript_time = new Date(unix_time * 1000);//Convert the unix time stamp to javascript
            var day = javascript_time.getDay();
            document.getElementById('6_day_forecast').innerHTML +=
                "<div class='col-2'>"+
                    "<div class='card'>"+
                        "<img class='card-img-top' src= " + image + " alt='Card image cap'>"+
                        "<div class='card-body'>"+
                            "<h5 class='card-title'>"+ week_names[day] + "</h5>"+
                            "<p class='card-text'>High: " + data.daily.data[i].apparentTemperatureHigh + " <br>"+
                                "Low: " + data.daily.data[i].apparentTemperatureLow + "</p>"+
                        "</div>"+
                    "</div>"+
                "</div>";
            }
        })
    }
