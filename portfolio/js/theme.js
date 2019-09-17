$(function(){
  const main_colors = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green','light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey', 'white', 'black'];
  const nuances = ['darken-4', 'darken-3', 'darken-2', 'darken-1', '', 'lighten-1', 'lighten-2', 'lighten-3', 'lighten-4', 'lighten-5', 'accent-1', 'accent-2', 'accent-3', 'accent-4'];
  const background_colors = ['white', 'grey', 'blue-grey', 'black'];

  let initPicker = function(selector, default_main, default_background){
    if(selector === undefined){
      selector = '.theme-picker';
    }
    if(default_main === undefined){
      default_main = 'blue';
    }
    if(default_background === undefined){
      default_background = 'white';
    }
    $(selector).each(function(){
      let $this = $(this);
      let $main_colors = $('<div></div>');
      let $nuances = $('<div></div>');
      let $background_colors = $('<div></div>');

      main_colors.forEach(function(item){
        let parent_class = '';
        if(item === default_main){
          parent_class = ' selected default';
        }
        $main_colors.append('<div class="circle-color' + parent_class + '"><a href="#"><div class="' + item + '"></div></a></div>');
      });

      nuances.forEach(function(item){
        let parent_class = '';
        if(item === ''){
          parent_class = ' selected default';
        }
        $nuances.append('<div class="circle-color' + parent_class + '"><a href="#"><div class="' + default_main + ' ' + item + '"></div></a></div>');
      });

      background_colors.forEach(function(item){
        let parent_class = '';
        if(item === default_background){
          parent_class = ' selected default';
        }
        $background_colors.append('<div class="circle-color' + parent_class + '"><a href="#"><div class="' + item + '"></div></a></div>');
      });

      $this.append('<h4 class="i18n-main-color">Main Color</h4>');
      $this.append($main_colors);
      $this.append('<h4 class="i18n-nuance">Nuance</h4>');
      $this.append($nuances);
      $this.append('<h4 class="i18n-nuance">Background Color</h4>');
      $this.append($background_colors);

    });
  };

  initPicker();

  const theme_apply = function(old_color, new_color, section){
    $('.theme-' + section).removeClass(old_color).addClass(new_color);
  };

  $('div.circle-color').on('click', function(e){
    e.preventDefault();
    let $this = $(this);
    let $old = $this.siblings('.selected');
    let old_color = $old.find('a > div').get(0).classList[0];
    let new_color = $this.find('a > div').get(0).classList[0];
    $old.removeClass('selected');
    $this.addClass('selected');
    theme_apply(old_color, new_color, 'aboutme-main');
  });

});
