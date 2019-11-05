$(function(){

  const $apiKey = $('#api-key');
  const $search = $('#search');
  const $pickerRow = $('#day-picker-row');
  const $stepApikeyTitle = $('#step-apikey-title');
  const $apiKeyButton = $('#apiKeyButton');

  // callback function to do additional stuff
  const callbackSearch = function(data){
    if(data === null){
      $pickerRow.addClass('hide');
      $search.addClass('invalid');
      return;
    }
    $search.removeClass('invalid').addClass('valid');
    $pickerRow.removeClass('hide');
    console.log(data);
  };

  const testKeyCallback = function(isValid, destroyFeedback){
    if(isValid){
      destroyFeedback(true);
      $search.val('');
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

  (function(){
    let apiKey = localStorage.getItem('apiKey');
    if(apiKey !== null && typeof apiKey === 'string'){
      $apiKey.val(apiKey);
      $apiKeyButton.trigger('click');
    }
  })();


});