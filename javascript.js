


$(document).ready(function(){


 /********************** Variables **********************/
  var api, city, kTemp, cTemp, fTemp, conditions, windSpeedMetric, windSpeedImperial, code, weatherIcon;

  /********************** Functions **********************/
  function getLocation() {
   city = document.getElementById('cityField').value;
  }
  function toCelsius(kelvin){
   return Math.floor(kelvin - 273.15);
  }
  function toFahrenheit(kelvin){
   return Math.floor(kelvin * (9/5) - 459.67);
  }

  /********************** Get Weather **********************/

  //Hide imperial unit
  $("#windSpeedImperial").hide();
  $("#temperatureF").hide();

  $("#getWeather").on( "click", function(){
   getLocation();
   api = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=de86160eafed7aba26e4fcee4d49b870";
   //Retrieve weather data from Open Weather Map .getJSON()
   $.getJSON(api, function(data){
     //Store data to variables
     kTemp = data.main.temp;
     cTemp = toCelsius(kTemp);
     fTemp = toFahrenheit(kTemp);
     conditions = data.weather[0].description;
     windSpeedMetric = data.wind.speed;
     windSpeedImperial = Math.floor(windSpeedMetric * 2.23694);
     code = data.weather[0].icon;
     weatherIcon = '<img src="https://openweathermap.org/img/w/' + code +
   '.png" alt="Weather Icon" class="icon">';
     //Use jQuery to output to html
     $('#conditions').html("<p>" + conditions + " </p>");
     $('#windSpeedMetric').html("<p>" + windSpeedMetric + " m/s" + "</p>");
     $('#windSpeedImperial').html("<p>" + windSpeedImperial + " MPH" + "</p>");
     $('#temperatureC').html("<p>" + cTemp + " C" + "</p>");
     $('#temperatureF').html("<p>" + fTemp + " F" + "</p>");
     $('#weatherIcon').html("<p>" + weatherIcon + "</p>");

   });
  });


  /********************** Change Units **********************/
  //Create event handler for button to change temperature units
  $("#changeUnits").on( "click", function() {
   //Using jQuery methods to show and hide different units
   $("#windSpeedImperial").toggle();
   $("#windSpeedMetric").toggle();
   $("#temperatureF").toggle();
   $("#temperatureC").toggle();
  });

});
