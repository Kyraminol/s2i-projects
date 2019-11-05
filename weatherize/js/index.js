$(function(){

  const $apiKeyAccept = $('#api-key-accept');
  const $apiKey = $('#api-key');
  const $searchAutocomplete = $('#autocomplete-search');

  // callback function to do additional stuff
  const callback = function(data){
    $('#day-picker-row').removeClass('hide');
    console.log(data);
  };

  const validateKeyCallback = function(isValid){
    if(isValid){
      $searchAutocomplete.prop('disabled', false);
      $apiKey.prop('disabled', true);
      $apiKeyAccept.find('span').text('Edit key');
      $apiKeyAccept.find('i').text('edit');
    } else {

    }
  };

  let stepper = document.querySelector('.stepper');
  let stepperInstace = new MStepper(stepper, {
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

  $apiKeyAccept.on('click', function(e){
    e.preventDefault();
    if($apiKey.prop('disabled')){
      $searchAutocomplete.prop('disabled', true);
      $apiKey.prop('disabled', false);
      $apiKeyAccept.find('span').text('accept key');
      $apiKeyAccept.find('i').text('done');
    } else {
      weatherize = new Weatherize($apiKey.val());
      weatherize.testKey(validateKeyCallback);
    }
  });

  $searchAutocomplete.on('keyup', function(){
    console.log($searchAutocomplete.val());
  })
});