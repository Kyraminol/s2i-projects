$(function(){

  const $apiKey = $('#api-key');
  const $search = $('#search');
  const $searchHelper = $('#search-helper');
  const $pickerRow = $('#day-picker-row');
  const $stepApikeyTitle = $('#step-apikey-title');
  const $apiKeyButton = $('#apiKeyButton');

  // callback function to do additional stuff
  const callbackSearch = function(data){
    console.log(data);
    if(data === null){
      $pickerRow.addClass('hide');
      $searchHelper.attr('data-error', 'City not found');
      $search.addClass('invalid');
      return;
    }
    $search.removeClass('invalid').addClass('valid');
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
      $stepApikeyTitle.attr('data-step-label', 'Wrong API Key!');
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
    $this.siblings('.selected').removeClass('selected');
    $this.addClass('selected');

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
            $searchHelper.attr('data-error', 'User denied the request for Geolocation');
            break;
          case error.POSITION_UNAVAILABLE:
            $search.addClass('invalid');
            $searchHelper.attr('data-error', 'Location information is unavailable');
            break;
          case error.TIMEOUT:
            $search.addClass('invalid');
            $searchHelper.attr('data-error', 'The request to get user location timed out');
            break;
          default:
            $search.addClass('invalid');
            $searchHelper.attr('data-error', 'An unknown error occurred');
            break;
        }
      });
    } else {
      $search.addClass('invalid');
      $searchHelper.attr('data-error', 'Geolocation is not supported by this browser');
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