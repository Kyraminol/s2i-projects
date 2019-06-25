$(document).ready(function(){
  $('nav').each(function() {
    var $this = $(this);
    var $target = $('#' + $(this).attr('data-target'));
    M.Pushpin.init($this.get(0), {
      top: $target.offset().top,
      bottom: $target.offset().top + $target.outerHeight() - $this.height()
    });
  });
});