$(function(){

  // callback function to do additional stuff
  let callback = function(data){
    $('#day-picker-row').removeClass('hide');
    console.log(data);
  };

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

  $('#api-key-accept').on('click', function(e){
    e.preventDefault();
    weatherize = new Weatherize($('#api-key').val());
  });

});