function Weatherize(apiKey){
  // Check if apiKey is passed as an argument and it is a string
  if(apiKey === undefined || typeof apiKey !== 'string'){
    console.error('apiKey must be provided as string.');
  }
  this._apiKey = apiKey;

  // Define getWeather function
  this.getWeather = function(search, callback){

    let round = function round(value, precision) {
      let multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    };

    // Check if city is passed as an argument and it is a string or an array
    if(search === undefined || (typeof search !== 'string' && !Array.isArray(search))){
      return null;
    }
    let data = {
      appid: this._apiKey,
      units: 'metric'
    };
    if(typeof search === 'string'){
      data['q'] = search;
    } else if(Array.isArray(search)){
      data['lat'] = search[0];
      data['lon'] = search[1];
    }
    // Make the ajax call
    $.ajax({
      url: 'https://api.openweathermap.org/data/2.5/forecast',
      data: data,
    }).then(r => {
      // Parse the response in a date ordered object
      console.log(r);
      let result = {
        city: r.city,
        weather: {},
      };
      r.list.forEach(function(weather){
        let datestr = weather['dt_txt'].split(' ');

        if(!Object.keys(result.weather).includes(datestr[0])){
          result.weather[datestr[0]] = [];
        }
        result.weather[datestr[0]].push(weather);
      });

      let resultKeys = Object.keys(result.weather);

      for(let i = 0; i < resultKeys.length; i++){
        let weather = result.weather[resultKeys[i]];
        let date = new Date(resultKeys[i]);
        let $d = $('.weather-d' + (i + 1));

        let temp_avg = 0;
        let temp_max_avg = -Infinity;
        let temp_min_avg = Infinity;
        let icon_avg_obj = {};
        weather.forEach(function(info){
          let time = new Date(info['dt'] * 1000);

          temp_avg += info['main']['temp'];
          if(info['main']['temp_max'] > temp_max_avg){
            temp_max_avg = info['main']['temp_max'];
          }
          if(info['main']['temp_min'] < temp_min_avg){
            temp_min_avg = info['main']['temp_min']
          }
          if(!Object.keys(icon_avg_obj).includes(info['weather'][0]['icon'])){
            icon_avg_obj[info['weather'][0]['icon']] = 0;
          }
          icon_avg_obj[info['weather'][0]['icon']]++;

          $d.filter('.weather-icon.weather-h' + time.getUTCHours()).attr('src', 'http://openweathermap.org/img/wn/' + info['weather'][0]['icon'] + '.png');
          $d.filter('.weather-temp.weather-h' + time.getUTCHours()).text(round(info['main']['temp'], 1) + '°C');
          $d.filter('.weather-temp-max.weather-h' + time.getUTCHours()).text(round(info['main']['temp_max'], 1) + '°C');
          $d.filter('.weather-temp-min.weather-h' + time.getUTCHours()).text(round(info['main']['temp_min'], 1) + '°C');
        });
        temp_avg /= weather.length;
        temp_avg = round(temp_avg, 1);
        temp_max_avg = round(temp_max_avg, 1);
        temp_min_avg = round(temp_min_avg, 1);
        let icon_avg = "";
        let icon_max = -Infinity, x;
        Object.entries(icon_avg_obj).forEach(function(entry){
          if(entry[1] > icon_max){
            icon_max = entry[1];
            icon_avg = entry[0];
          }
        });

        $d.filter('.weather-icon-avg').attr('src', 'http://openweathermap.org/img/wn/' + icon_avg + '.png');
        $d.filter('.weather-temp-avg').text( temp_avg + '°C');
        $d.filter('.weather-temp-max-avg').text( temp_max_avg + '°C');
        $d.filter('.weather-temp-min-avg').text( temp_min_avg + '°C');
        $d.filter('.weather-week-day').text(date.toLocaleDateString('it-IT', {weekday: 'short'}));
        $d.filter('.weather-date').text(date.toLocaleDateString('it-IT', {day: '2-digit', month: '2-digit'}));
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
