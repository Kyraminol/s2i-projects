$(document).ready(function(){
  var initNav = function(){
    $('div.block').each(function(){
      var $this = $(this);
      var height = 30;
      $this.children().each(function(index, el){
        height += $(el).outerHeight();
      });
      $this.outerHeight(height);
    });

    $('nav').each(function(){
      var $this = $(this);
      var $target = $('#' + $(this).attr('data-target'));
      M.Pushpin.init($this.get(0), {
        top: $target.offset().top,
        bottom: $target.offset().top + $target.outerHeight() - $this.height(),
        onPositionChange: onPushpinChange,
      });
    });
  };

  var parallaxes = M.Parallax.init(document.querySelectorAll('.parallax'));
  var dropdowns = M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), {hover: false, constrainWidth: false, coverTrigger: false});
  var carousels = M.Carousel.init(document.querySelectorAll('.carousel'), {fullWidth: true, indicators: true});

  var onPushpinChange = function(){
    var el = $(this.el);
    if(el.hasClass('pin-top') || el.hasClass('pin-bottom')){
      dropdowns.forEach(function(dropdown){
        if(dropdown.id.startsWith('nav-')){
          dropdown.close();
        }
      });
    }
  };

  $(window).resize(function(){
    initNav();
  });
  initNav();

});
