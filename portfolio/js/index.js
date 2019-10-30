$(function(){
  const initNav = function(){
    $('div.block').each(function(){
      let $this = $(this);
      let height = 100;
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

  const futureTabsShow = function(){
    setTimeout(initNav, 25);
  };

  let parallaxes = M.Parallax.init(document.querySelectorAll('.parallax'));
  let dropdowns = M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), {hover: false, constrainWidth: false, coverTrigger: false});
  let carousels = M.Carousel.init(document.querySelectorAll('.carousel'), {fullWidth: true, indicators: true});
  let modals = M.Modal.init(document.querySelectorAll('.modal'), {onOpenEnd: modalsOpenEnd});
  let tabs = M.Tabs.init(document.querySelectorAll('.tabs:not(#future-tabs)'));
  let future_tabs = M.Tabs.init(document.querySelectorAll('#future-tabs'), {onShow: futureTabsShow});
  let collapsibles = M.Collapsible.init(document.querySelectorAll('.collapsible'), {onOpenEnd: initNav, onCloseEnd: initNav});
  let scrollspies = M.ScrollSpy.init(document.querySelectorAll('.scrollspy'), {scrollOffset: -5});


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
  setTimeout(initNav, 300);


  $('#fab').on('click', function(e){
    e.preventDefault();
    let $el = $(this).parent();
    $el.hasClass('active') ? $el.removeClass('active') : $el.addClass('active');
  });

});
