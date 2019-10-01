$(function(){
  const i18n = {
    'it': {
      // About Me block
      'about-me': 'Chi Sono',
      'beginning': 'L\'inizio',
      'ideology': 'Ideologia',
      'skills': 'Mie Competenze',
      'theme': 'Tema',
      'language': 'Lingua',
      'languages': 'Lingue',
      'italian': 'Italiano',
      'english': 'Inglese',
      'japanese': 'Giapponese',
      'save': 'Salva',
      'cancel': 'Annulla',
      // My Projects block
      'projects': 'Miei Progetti',
      'projects-more': 'Click per altre info',
      's2i-projects': 'Progetti per Start2impact',
      'cpp-projects': 'Progetti in C/C++',
      'python-projects': 'Progetti in Python',
      // My Future block
      'future': 'Mio Futuro',
      'contact': 'Contattami',
      // Footer
      'thanks': 'Ringraziamenti Speciali',
      'thanks-content-1': 'Un ringraziamento enorme a ',
      'thanks-content-2': ' per questa opportunità di imparare e migliorarmi, al team di ',
      'thanks-content-3': ', e alla mia amata per il costante supporto ♥',
      'links': 'Miei Link',
      'source': 'Codice Sorgente',
    },
    'en': {
      // About Me block
      'about-me': 'About Me',
      'beginning': 'Beginning',
      'ideology': 'Ideology',
      'skills': 'My Skills',
      'theme': 'Theme',
      'language': 'Language',
      'languages': 'Languages',
      'italian': 'Italian',
      'english': 'English',
      'japanese': 'Japanese',
      'save': 'Save',
      'cancel': 'Cancel',
      // My Projects block
      'projects': 'My Projects',
      'projects-more': 'Click for more info',
      's2i-projects': 'Start2impact Projects',
      'cpp-projects': 'C/C++ Projects',
      'python-projects': 'Python Projects',
      // My Future block
      'future': 'My Future',
      'contact': 'Contact me',
      // Footer
      'thanks-content-1': 'Huge thanks to ',
      'thanks-content-2': ' for this opportunity to learn and improve myself, to ',
      'thanks-content-3': ' team, and to my dear love for supporting me ♥',
      'thanks': 'Special Thanks',
      'links': 'My Links',
      'source': 'Source',
    },
  };

  const translate = function(lang){
    let translation = i18n[lang];
    Object.entries(translation).forEach(function(entry){
      document.querySelectorAll('.i18n-' + entry[0]).forEach(function(el){
        el.firstChild.textContent = entry[1].toString();
      });
    });
  };

  (function(){
    let lang = localStorage.getItem('lang');
    if(lang !== null && lang !== 'en' && Object.keys(i18n).includes(lang)){
      translate(lang);
    }
  })();

  $('.translate-btn').on('click', function(e){
    e.preventDefault();
    let lang = $(this).data('lang');
    localStorage.setItem("lang", lang);
    translate(lang);
  })

});
