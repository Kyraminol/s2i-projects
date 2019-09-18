$(function(){
  const main_colors = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green','light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey', 'white', 'black'];
  const nuances = ['darken-4', 'darken-3', 'darken-2', 'darken-1', 'default-nuance', 'lighten-1', 'lighten-2', 'lighten-3', 'lighten-4', 'lighten-5', 'accent-1', 'accent-2', 'accent-3', 'accent-4'];
  const background_colors = ['white', 'grey', 'blue-grey', 'black'];

  const appendCircles = function(element, list){
    list.forEach(function(item){
      element.append('<div class="circle-color" data-theme-class="' + item + '"><a href="#"><div class="' + item + '"></div></a></div>');
    });
  };

  const initPicker = function(selector){
    if(selector === undefined){
      selector = '.theme-picker';
    }

    $(selector).each(function(){
      let $this = $(this);
      let target = $this.data('theme-target');
      let default_main = $this.data('theme-main');
      let default_text = $this.data('theme-text');
      let default_background = $this.data('theme-background');

      let $main_colors = $('<div class="theme-main theme-' + target + '"></div>');
      let $nuances = $('<div class="theme-nuances theme-' + target + '"></div>');
      let $text_colors = $('<div class="theme-text theme-' + target + '"></div>');
      let $background_colors = $('<div class="theme-background theme-' + target + '"></div>');
      appendCircles($main_colors, main_colors);
      appendCircles($nuances, nuances);
      appendCircles($text_colors, main_colors);
      appendCircles($background_colors, background_colors);

      $this.append('<h4 class="i18n-main-color">Main Color</h4>');
      $this.append($main_colors);
      $this.append('<h5 class="i18n-nuance">Nuance</h5>');
      $this.append($nuances);
      $this.append('<h4 class="i18n-text-color">Text Color</h4>');
      $this.append($text_colors);
      $this.append('<h4 class="i18n-background-color">Background Color</h4>');
      $this.append($background_colors);

      $('.theme-main.theme-' + target + ' > div:has(div.' + default_main + ')').addClass('selected');
      $('.theme-text.theme-' + target + ' > div:has(div.' + default_text + ')').addClass('selected');
      $('.theme-background.theme-' + target + ' > div:has(div.' + default_background + ')').addClass('selected');
      $('.theme-nuances.theme-' + target + ' a > div').addClass(default_main);
      $('.theme-nuances.theme-' + target + ' .circle-color').addClass('small');

    });
  };

  initPicker();

  const theme_apply = function(selector ,old_class, new_class){
    $(selector).removeClass(old_class).addClass(new_class);
  };

  $('div.circle-color').on('click', function(e){
    e.preventDefault();
    let $this = $(this);
    let $parent = $this.parent();
    let $old = $this.siblings('.selected');
    let new_class = $this.data('theme-class');
    let old_class = '';
    if($old.length > 0){
      old_class = $old.data('theme-class');
    }
    let target = $this.parents('.theme-picker').first().data('theme-target');
    $old.removeClass('selected');
    $this.addClass('selected');

    if($parent.hasClass('theme-main')){
      theme_apply('.theme-nuances.theme-' + target + ' a > div', old_class, new_class);
      $('nav.theme-' + target).data('fab', new_class);
      $('#fab').removeClass(old_class).addClass(new_class);
      target += '-main';
    } else if ($parent.hasClass('theme-nuances')){
      target += '-main';
    } else if($parent.hasClass('theme-background')){
      target += '-background';
      if(new_class === 'white'){
        theme_apply('.theme-' + target + '-text', 'white-text', 'black-text');
      } else {
        theme_apply( '.theme-' + target + '-text', 'black-text', 'white-text');
      }
    } else if($parent.hasClass('theme-text')){
      old_class += '-text';
      new_class += '-text';
      target += '-text';
    }

    theme_apply( '.theme-' + target, old_class, new_class);
  });

});
