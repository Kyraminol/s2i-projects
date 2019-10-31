function Weatherize(apiKey){
  if(apiKey === undefined || typeof apiKey !== 'string'){
    console.error('apiKey must be provided as string.');
  }
  this._apiKey = apiKey;

  this.getWeather = function(city){
    if(city === undefined || typeof city !== 'string'){
      return null;
    }
    $.ajax({
      url: 'https://api.openweathermap.org/data/2.5/forecast',
      data: {
        q: city,
        appid: apiKey,
      },
    }).then(r => {
      console.log(r);
    });
  }
}
