$(function(){
  const i18n = {
    'it': {
      apikey: 'Chiave API',
      confirm: 'Conferma',
      currentlang: 'it',
      editapikey: 'Modifica chiave API',
      'geo-denied': 'Richiesta per geolocalizzazione rifiutata',
      'geo-timeout': 'The request to get user location timed out',
      'geo-unavailable': 'Informazioni per la localizzazione non disponibili',
      'geo-unknown': 'Errore sconosciuto per la geolocalizzazione',
      'geo-unsupported': 'Geolocalizzazione non supportata da questo browser',
      insertalocation: 'Inserire una località',
      language: 'Lingua',
      location: 'Località',
      locationfound: 'Località trovata',
      locationnotfound: 'Località non trovata',
      search: 'Cerca',
      wrongapikey: 'Chiave API sbagliata!',
    },
    'en': {},
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
    document.querySelectorAll('[class*="i18n-"]').forEach(function(el){
      el.classList.forEach(function(el_class){
        if(el_class.startsWith('i18n-')){
          i18n.en[el_class.substr(5)] = el.firstChild.textContent;
          return false;
        }
      });
    });
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
