$(function(){
  const initNav = function(){
    $('div.block').each(function(){
      let $this = $(this);
      let height = 30;
      $this.children().each(function(index, el){
        height += $(el).outerHeight();
      });
      $this.outerHeight(height);
    });

    $('nav').each(function(){
      let $this = $(this);
      let $target = $('#' + $(this).attr('data-target'));
      M.Pushpin.init($this.get(0), {
        top: $target.offset().top,
        bottom: $target.offset().top + $target.outerHeight() - $this.height(),
        onPositionChange: onPushpinChange,
      });
    });
  };

  const modalsOpenEnd = function(){
    tabs.forEach(function(tab){
      tab.updateTabIndicator();
    });
  };

  const collapsiblesOpenStart = function(li){
    $(li).find('i.material-icons').text('keyboard_arrow_up');
  };

  const collapsiblesCloseStart = function(li){
    $(li).find('i.material-icons').text('keyboard_arrow_down');
  };

  let parallaxes = M.Parallax.init(document.querySelectorAll('.parallax'));
  let dropdowns = M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), {hover: false, constrainWidth: false, coverTrigger: false});
  let carousels = M.Carousel.init(document.querySelectorAll('.carousel'), {fullWidth: true, indicators: true});
  let modals = M.Modal.init(document.querySelectorAll('.modal'), {onOpenEnd: modalsOpenEnd});
  let tabs = M.Tabs.init(document.querySelectorAll('.tabs'));
  let collapsibles = M.Collapsible.init(document.querySelectorAll('.collapsible'), {onOpenStart: collapsiblesOpenStart, onOpenEnd: initNav, onCloseStart: collapsiblesCloseStart, onCloseEnd: initNav});


  const onPushpinChange = function(){
    let $el = $(this.el);
    if($el.hasClass('pin-top') || $el.hasClass('pin-bottom')){
      dropdowns.forEach(function(dropdown){
        if(dropdown.id.startsWith('nav-')){
          dropdown.close();
        }
      });
    } else if($el.hasClass('pinned')){
      $('#fab').attr('class', 'btn-floating btn-large ' + $el.data('fab') + ' ' + $el.data('fab-nuance') + ' ' + $el.data('fab-text'));
    }
  };

  $(window).on('resize', function(){
    initNav();
  });
  initNav();

});
