$(document).ready(function(){
    var i18n = {
        'it': {
            // About Me block
            'about-me': 'Me',
            'beginning': 'L\'inizio',
            'ideology': 'Ideologia',
            'skills': 'Mie Competenze',
            'theme': 'Tema',
            'language': 'Lingua',
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
            'links': 'Miei Link',
            'source': 'Sorgente',
        },
        'en': {
            // About Me block
            'about-me': 'About Me',
            'beginning': 'Beginning',
            'ideology': 'Ideology',
            'skills': 'My Skills',
            'theme': 'Theme',
            'language': 'Language',
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
            'thanks': 'Special Thanks',
            'links': 'My Links',
            'source': 'Source',
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
