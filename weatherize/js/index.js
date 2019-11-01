$(function(){

  // callback function to do additional stuff
  let callback = function(data){
    console.log(data);
  };

  // instantiate Weatherize object
  let weatherize = new Weatherize('API-KEY-HERE');

  // call main function
  weatherize.getWeather('London', callback);


});