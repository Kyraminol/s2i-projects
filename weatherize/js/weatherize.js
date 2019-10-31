function Weatherize(apiKey){
  // Check if apiKey is passed as an argument and it is a string
  if(apiKey === undefined || typeof apiKey !== 'string'){
    console.error('apiKey must be provided as string.');
  }
  this._apiKey = apiKey;

  // Define getWeather function
  this.getWeather = function(city){
    // Check if city is passed as an argument and it is a string
    if(city === undefined || typeof city !== 'string'){
      return null;
    }
    // Make the ajax call
    $.ajax({
      url: 'https://api.openweathermap.org/data/2.5/forecast',
      data: {
        q: city,
        appid: apiKey,
      },
    }).then(r => {
      // Parse the response
      console.log(r);
    });
  }
}
