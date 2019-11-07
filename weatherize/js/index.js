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
    $($prev.attr('href')).addClass('hide');
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