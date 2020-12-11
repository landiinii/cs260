document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=476402509737649b508ae10ab8f35cbf";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      console.log(json.cod);
      if(json.cod == 200){
        let results = "";
        results += '<h2>Current ' + json.name + " Weather:</h2>";
        document.getElementById("weatherResultsTitle").innerHTML = results;
        results = "";
        for (let i=0; i < json.weather.length; i++) {
  	        results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
        }
        results += '<h4>It is ';
        for (let i=0; i < json.weather.length; i++) {
  	        results += json.weather[i].description
  	        if (i !== json.weather.length - 1)
  	           results += ", "
            if (i===json.weather.length -2){
              results += "and ";
            }
        }
        results += " with a temperature of " + Math.round(json.main.temp) + "&deg;F</h4>"
        document.getElementById("weatherResultsInfo").innerHTML = results;

        let sunrise = json.sys.sunrise;
        var date = new Date(sunrise * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var sunriseTime = hours + ':' + minutes.substr(-2)
        let sunset = json.sys.sunset;
        var date = new Date(sunset * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var sunsetTime = hours + ':' + minutes.substr(-2)

        let sun = "<h4>The Sun will Rise at ";
        sun += sunriseTime;
        sun += "</h4>"
        sun += "<h4>The Sun will set at ";
        sun += sunsetTime;
        sun += "</h4>";
        console.log(sun);
        document.getElementById("sunriseResultsInfo").innerHTML = sun;

        const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=476402509737649b508ae10ab8f35cbf";
        fetch(url2)
          .then(function(response) {
            return response.json();
          }).then(function(json) {
            console.log(json);
            if(json.cod == 200){
              let days = {};
              for (let i=0; i < json.list.length; i++) {
                if(moment(json.list[i].dt_txt).format('MMM Do') in days){
                  days[moment(json.list[i].dt_txt).format('MMM Do')].push(json.list[i]);
                }
                else{
                  days[moment(json.list[i].dt_txt).format('MMM Do')] = [json.list[i]];
                }
              }
              console.log(days);
              let forecast = "<h2>Forecast: </h2> <div class=\"grid\">";
              for (date in days) {
                forecast += "<div class=\"grid-item\">";
                forecast += "<h4>" + moment(days[date][0].dt_txt).format('dddd, MMM Do') + "</h4>";
                for(let j=0; j<days[date].length; j++){
                  forecast += "<div class=\"weather-time\">";
                	forecast += "<p>" + moment(days[date][j].dt_txt).format('h a') + "</p>";
                  forecast += '<img src="http://openweathermap.org/img/w/' + days[date][j].weather[0].icon + '.png"/>';
                	forecast += "<p>" + Math.round(days[date][j].main.temp) + "&deg;F</p>";
                  forecast += "</div>"
                  if(j !== days[date].length-1){
                    forecast += "<hr>";
                  }
                }
                forecast += "</div>"
              }
              forecast += "</div>"
              document.getElementById("forecastResults").innerHTML = forecast;
            }
            else{
              document.getElementById("forecastResults").innerHTML = "Forecast Unavailable for this City";
            }
          });
        }
        else{
          document.getElementById("weatherResultsTitle").innerHTML = json.message;
          document.getElementById("weatherResultsInfo").innerHTML = "";
          document.getElementById("forecastResults").innerHTML = "";
        }
    });
});
