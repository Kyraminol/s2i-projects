$(function(){
  const main_colors = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green','light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey', 'white', 'black'];
  const nuances = ['darken-4', 'darken-3', 'darken-2', 'darken-1', 'default-nuance', 'lighten-1', 'lighten-2', 'lighten-3', 'lighten-4', 'lighten-5', 'accent-1', 'accent-2', 'accent-3', 'accent-4'];
  const background_colors = ['white', 'grey', 'blue-grey', 'black'];

  const appendCircles = function(element, list){
    list.forEach(function(item){
      element.append('<div class="circle-color" data-theme-class="' + item + '"><a href="#"><div class="' + item + '"></div></a></div>');
    });
  };

  const refreshCircles = function(theme){
    $('.theme-picker').each(function(){
      let $this = $(this);
      let target = $this.data('theme-target');
      $this.find('.circle-color.selected').removeClass('selected');
      $('.theme-main.theme-picker-' + target + ' > div:has(div.' + theme[target].main + ')').addClass('selected');
      $('.theme-nuances.theme-picker-' + target + ' > div:has(div.' + theme[target].nuance + ')').addClass('selected');
      $('.theme-text.theme-picker-' + target + ' > div:has(div.' + theme[target].text.replace(/-text/, '') + ')').addClass('selected');
      $('.theme-background.theme-picker-' + target + ' > div:has(div.' + theme[target].background + ')').addClass('selected');
      $('.theme-nuances.theme-picker-' + target + ' a > div').removeClass(main_colors.join(' ')).addClass(theme[target].main);
    });
  };

  const initPicker = function(theme){
    if(typeof theme !== 'object'){
      theme = copyTheme(default_theme);
    }

    $('.theme-picker').each(function(){
      let $this = $(this);
      let target = $this.data('theme-target');

      let $main_colors = $('<div class="theme-main theme-picker-' + target + '" data-section="main"></div>');
      let $nuances = $('<div class="theme-nuances theme-picker-' + target + '" data-section="nuance"></div>');
      let $text_colors = $('<div class="theme-text theme-picker-' + target + '" data-section="text"></div>');
      let $background_colors = $('<div class="theme-background theme-picker-' + target + '" data-section="background"></div>');
      appendCircles($main_colors, main_colors);
      appendCircles($nuances, nuances);
      appendCircles($text_colors, main_colors);
      appendCircles($background_colors, background_colors);

      $this.append('<h4 class="i18n-main-color theme-picker-' + target + '-background-text">Main Color</h4>');
      $this.append($main_colors);
      $this.append('<h5 class="i18n-nuance theme-picker-' + target + '-background-text">Nuance</h5>');
      $this.append($nuances);
      $this.append('<h5 class="i18n-text-color theme-picker-' + target + '-background-text">Text Color</h5>');
      $this.append($text_colors);
      $this.append('<h4 class="i18n-background-color theme-picker-' + target + '-background-text">Background Color</h4>');
      $this.append($background_colors);

      $('.theme-nuances.theme-picker-' + target + ' .circle-color').addClass('small');
      $('.theme-text.theme-picker-' + target + ' .circle-color').addClass('small');

    });
    refreshCircles(theme);
  };

  const applyTheme = function(theme, base_target){
    if(typeof base_target !== 'string'){
      base_target = '.theme-';
    }
    Object.keys(theme).forEach(function(target){
      Object.keys(theme[target]).forEach(function(key){
        let selector = base_target + target;
        let new_class = theme[target][key];
        let $el = $('');
        if(key === 'main') {
          $('nav' + selector).data('fab', new_class);
          $el = $(selector + '-main');
          $el.removeClass(main_colors.join(' '));
        } else if(key === 'nuance'){
          $el = $(selector + '-main');
          $el.removeClass(nuances.join(' '));
        } else if(key === 'text'){
          $('nav' + selector).data('fab-text', new_class);
          $el = $(selector + '-text');
          $el.removeClass(main_colors.join('-text ') + '-text');
        } else if(key === 'background'){
          $el = $(selector + '-background');
          $el.removeClass(main_colors.join(' '));
        } else if(key === 'background_text'){
          $el = $(selector + '-background-text');
          $el.removeClass(main_colors.join('-text ') + '-text');
        }
        $el.addClass(new_class);
      });
    });

    let $nav = $('nav.pinned');
    $('#fab').attr('class', 'btn-floating btn-large ' + $nav.data('fab') + ' ' + $nav.data('fab-text'));
  };

  let copyTheme = function(source){
    return {
      aboutme: Object.assign({}, source.aboutme),
      projects: Object.assign({}, source.projects),
      future: Object.assign({}, source.future),
    };
  };

  let default_theme = {
    aboutme: {main: 'blue', nuance: 'default-nuance', text: 'white-text', background: 'white', background_text: 'black-text'},
    projects: {main: 'red', nuance: 'default-nuance', text: 'white-text', background: 'white', background_text: 'black-text'},
    future: {main: 'green', nuance: 'default-nuance', text: 'white-text', background: 'white', background_text: 'black-text'},
  };

  let theme = {};
  (function(){
    let storage = localStorage.getItem('theme');
    if(typeof storage !== "string"){
      theme = copyTheme(default_theme);
    } else {
      try{
        theme = JSON.parse(storage);
      } catch (e){
        theme = copyTheme(default_theme);
      }
    }
  })();

  let temp_theme = {};
  temp_theme = copyTheme(theme);

  initPicker(theme);
  applyTheme(theme);
  applyTheme(theme, '.theme-picker-');


  const theme_apply = function(selector ,old_class, new_class){
    $(selector).removeClass(old_class).addClass(new_class);
  };

  $('div.circle-color').on('click', function(e){
    e.preventDefault();
    let $this = $(this);
    let $parent = $this.parent();
    let $old = $this.siblings('.selected');
    let new_class = $this.data('theme-class');
    let target = $this.parents('.theme-picker').first().data('theme-target');
    $old.removeClass('selected');
    $this.addClass('selected');
    let section = $parent.data('section');
    if(section === 'main') {
      $('.theme-nuances.theme-picker-' + target + ' a > div').removeClass(main_colors.join(' ')).addClass(new_class);
    } else if(section === 'text'){
      new_class += '-text';
    } else if(section === 'background'){
      if(new_class === 'white'){
        temp_theme[target]['background_text'] = 'black-text';
      } else {
        temp_theme[target]['background_text'] = 'white-text';
      }
    }
    temp_theme[target][section] = new_class;
    applyTheme(temp_theme, '.theme-picker-')
  });

  $('#theme-modal-save').on('click', function(e){
    e.preventDefault();
    theme = copyTheme(temp_theme);
    localStorage.setItem('theme', JSON.stringify(theme));
    applyTheme(theme);
  });

  $('#theme-modal-reset').on('click', function(e){
    e.preventDefault();
    temp_theme = copyTheme(default_theme);
    applyTheme(temp_theme, '.theme-picker-');
    refreshCircles(temp_theme);
  });

  $('#theme-modal-cancel').on('click', function(e){
    e.preventDefault();
    temp_theme = copyTheme(theme);
    applyTheme(temp_theme, '.theme-picker-');
    refreshCircles(temp_theme);
  });

});
