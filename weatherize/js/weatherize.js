function Weatherize(apiKey){
  // Check if apiKey is passed as an argument and it is a string
  if(apiKey === undefined || typeof apiKey !== 'string'){
    console.error('apiKey must be provided as string.');
  }
  this._apiKey = apiKey;

  // Define getWeather function
  this.getWeather = function(city, callback){

    let round = function round(value, precision) {
      let multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    };

    // Check if city is passed as an argument and it is a string
    if(city === undefined || typeof city !== 'string'){
      return null;
    }
    // Make the ajax call
    $.ajax({
      url: 'https://api.openweathermap.org/data/2.5/forecast',
      data: {
        q: city,
        appid: this._apiKey,
        units: 'metric',
      },
    }).then(r => {
      // Parse the response in a date ordered object
      console.log(r);
      let result = {};
      r.list.forEach(function(weather){
        let datestr = weather['dt_txt'].split(' ');

        if(!Object.keys(result).includes(datestr[0])){
          result[datestr[0]] = [];
        }
        result[datestr[0]].push(weather);
      });

      let resultKeys = Object.keys(result);

      for(let i = 0; i < resultKeys.length; i++){
        let weather = result[resultKeys[i]];
        let date = new Date(resultKeys[i]);
        let $d = $('.weather-d' + (i + 1));
        let n = Math.round(weather.length / 2) - 1;
        $d.filter('.weather-week-day').text(date.toLocaleDateString('it-IT', {weekday: 'short'}));
        $d.filter('.weather-date').text(date.toLocaleDateString('it-IT', {day: '2-digit', month: '2-digit'}));
        $d.filter('.weather-icon').attr('src', 'http://openweathermap.org/img/wn/' + weather[n]['weather'][0]['icon'] + '.png');
        $d.filter('.weather-temp').text(round(weather[n]['main']['temp'], 1) + '°C');
        $d.filter('.weather-temp-max').text(round(weather[n]['main']['temp_max'], 1) + '°C');
        $d.filter('.weather-temp-min').text(round(weather[n]['main']['temp_min'], 1) + '°C');

        $d.filter('.weather-hide').removeClass('hide');
      }



      // Check if callback is passed as a function, then call it
      if(typeof callback === 'function'){
        callback(result);
      }
    }, r => {
      if(typeof callback === 'function'){
        callback(null);
      }
    });
  };

  this.keyTest = function(callback, ...callbackArguments){
    if(callback === undefined || typeof callback !== 'function'){
      return null;
    }
    $.ajax({
      url: 'https://api.openweathermap.org/data/2.5/forecast',
      data: {
        q: 'London',
        appid: this._apiKey,
      },
    }).then(r => {
      callback(r['cod'] === '200', ...callbackArguments);
    }, r => {
      callback(r['cod'] === '200', ...callbackArguments);
    });
  };

}
