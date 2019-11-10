$(function(){

  const $apiKey = $('#api-key');
  const $search = $('#search');
  const $searchHelper = $('#search-helper');
  const $picker = $('#day-picker');
  const $pickerRow = $('#day-picker-row');
  const $stepApikeyTitle = $('#step-apikey-title');
  const $apiKeyButton = $('#apiKeyButton');
  const $weatherDetails = $('#weather-details');

  const $locationNotFound = $('.i18n-locationnotfound');
  const $locationFound = $('.i18n-locationfound');

  // callback function to do additional stuff
  const callbackSearch = function(data){
    console.log(data);
    $weatherDetails.addClass('hide');
    $picker.find('.selected').removeClass('selected');
    if(data === null){
      $pickerRow.addClass('hide');
      $searchHelper.attr('data-error', $locationNotFound.text());
      $search.addClass('invalid');
      return;
    }
    $search.removeClass('invalid').addClass('valid');
    $searchHelper.attr('data-error', '');
    $searchHelper.attr('data-success', $locationFound.text());
    $search.val(data.city.name + ', ' + data.city.country);
    M.updateTextFields();

    let resultKeys = Object.keys(data.weather);

    let chartOptions = {
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'hour'
          },
          gridLines: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
          ticks: {
            fontColor: 'rgb(255, 255, 255)',
          },
        }],
        yAxes: [{
          gridLines: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
          ticks: {
            fontColor: 'rgb(255, 255, 255)',
          },
        }]
      },
      legend: {display: false},
    };

    for(let i = 0; i < resultKeys.length; i++){
      let chartData = {
        temperature: [],
        pressure: [],
        humidity: [],
        rain: [],
      };
      let weather = data.weather[resultKeys[i]];
      weather.forEach(function(info){
        let time = new Date(info['dt'] * 1000);
        chartData.temperature.push({
          x: time,
          y: info['main']['temp'],
        });
        chartData.pressure.push({
          x: time,
          y: info['main']['pressure'],
        });
        chartData.humidity.push({
          x: time,
          y: info['main']['humidity'],
        });
        let rain = 0;
        if(Object.keys(info).includes('rain')){
          rain = info['rain']['3h'];
        }
        chartData.rain.push({
          x: time,
          y: rain,
        });

      });

      new Chart(document.querySelector('#d' + (i+1) + ' canvas.temp-chart'), {
        type: 'line',
        data: {
          datasets: [{
            label: 'Temperature (°C)',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderColor: 'rgb(255, 255, 255)',
            data: chartData.temperature
          }]
        },
        options: chartOptions
      });
      new Chart(document.querySelector('#d' + (i+1) + ' canvas.rain-chart'), {
        type: 'bar',
        data: {
          datasets: [{
            label: 'Rainfall (mm)',
            backgroundColor: 'rgb(255, 255, 255)',
            borderColor: 'rgb(255, 255, 255)',
            data: chartData.rain
          }]
        },
        options: chartOptions
      });
      new Chart(document.querySelector('#d' + (i+1) + ' canvas.humidity-chart'), {
        type: 'line',
        data: {
          datasets: [{
            label: 'Humidity (%)',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderColor: 'rgb(255, 255, 255)',
            data: chartData.humidity
          }]
        },
        options: chartOptions
      });
      new Chart(document.querySelector('#d' + (i+1) + ' canvas.pressure-chart'), {
        type: 'line',
        data: {
          datasets: [{
            label: 'Pressure (hPa)',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderColor: 'rgb(255, 255, 255)',
            data: chartData.pressure
          }]
        },
        options: chartOptions
      });

    }

    $pickerRow.removeClass('hide');
  };

  const testKeyCallback = function(isValid, destroyFeedback){
    if(isValid){
      destroyFeedback(true);
      $search.val('');
      M.updateTextFields();
      localStorage.setItem('apiKey', $apiKey.val().toString());
      $stepApikeyTitle.attr('data-step-label', '');
    } else {
      destroyFeedback(false);
      stepper.wrongStep();
      $stepApikeyTitle.attr('data-step-label', $('.i18n-wrongapikey').text());
    }
  };

  let stepper = new MStepper(document.querySelector('.stepper'), {
    firstActive: 0,
    autoFormCreation: false,
    stepTitleNavigation: false,
  });

  M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), {hover: false, constrainWidth: false, coverTrigger: false, closeOnClick: false});

  // instantiate Weatherize object
  let weatherize = undefined;

  $('#day-picker > a').on('click', function(e){
    e.preventDefault();
    let $this = $(this);
    if($this.hasClass('selected')){
      return;
    }
    let $prev = $this.siblings('.selected');
    $('#weather-details > div > div:not(.hide)').addClass('hide');
    $prev.removeClass('selected');
    $($this.attr('href')).removeClass('hide');
    $this.addClass('selected');
    $weatherDetails.removeClass('hide');
  });

  window.keyTest = function(destroyFeedback){
    weatherize = new Weatherize($apiKey.val());
    weatherize.keyTest(testKeyCallback, destroyFeedback);
  };

  let timer = null;

  $search.on('keyup', function(){
    if(timer !== null){
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(function(){
      weatherize.getWeather($search.val(), callbackSearch);
    }, 1000);
  });

  $('#geolocation-btn').on('click', function(e){
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){
        weatherize.getWeather([position.coords.latitude, position.coords.longitude], callbackSearch);
      }, function(error){
        switch(error.code) {
          case error.PERMISSION_DENIED:
            $search.addClass('invalid');
            $searchHelper.attr('data-error', $('.i18n-geo-denied').text());
            break;
          case error.POSITION_UNAVAILABLE:
            $search.addClass('invalid');
            $searchHelper.attr('data-error', $('.i18n-geo-unavailable').text());
            break;
          case error.TIMEOUT:
            $search.addClass('invalid');
            $searchHelper.attr('data-error', $('.i18n-geo-timeout').text());
            break;
          default:
            $search.addClass('invalid');
            $searchHelper.attr('data-error', $('.i18n-geo-unknown').text());
            break;
        }
      });
    } else {
      $search.addClass('invalid');
      $searchHelper.attr('data-error', $('.i18n-geo-unsupported').text());
    }
  });

  (function(){
    let apiKey = localStorage.getItem('apiKey');
    if(apiKey !== null && typeof apiKey === 'string'){
      $apiKey.val(apiKey);
      M.updateTextFields();
      $apiKeyButton.trigger('click');
    }
  })();


});