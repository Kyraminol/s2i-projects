$(document).ready(function(){
    var i18n = {
        'it': {
            'projects': 'Progetti',
            'skills': 'Competenze',
            'theme': 'Tema',
            'language': 'Lingua',
        },
        'en': {
            'projects': 'My Projects',
            'skills': 'My Skills',
            'theme': 'Theme',
            'language': 'Language',
        },
    };

    var translate = function(lang){
        var translation = i18n[lang];
        Object.entries(translation).forEach(function(entry){
            $('.i18n-' + entry[0]).text(entry[1]);
        });
    };

    $('.translate-btn').on('click', function(e){
        e.preventDefault();
        translate($(this).data('lang'));
    })

});
