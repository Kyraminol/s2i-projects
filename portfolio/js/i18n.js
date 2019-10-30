$(function(){
  const i18n = {
    'it': {
      // About Me block
      'about-me': 'Chi Sono',
      'theme': 'Tema',
      'language': 'Lingua',
      'me-content': 'Nato nel 1997, iniziai ad interessarmi ai computer guardando mio padre lavorarci. Scrissi il mio primo programma intorno all\'età di 11 anni, fu un semplice gestore di password in grado di memorizzarne diverse e mostrarle tutte digitando solo quella principale, un po\' come Keepass o Lastpass che ovviamente non conoscevo. Da allora ho imparato da autodidatta e sono diventato abile in molti linguaggi, in gran parte con il metodo "learn by doing" (imparare facendo), quindi ad oggi ho diversi progetti da poter mostrare.',
      'open-mindedness': 'Mentalità aperta',
      'open-mindedness-content': 'La vita è in costante movimento e cambiamento. Nel momento esatto in cui qualcuno chiude la propria mente a nuove idee e opinioni, smette di imparare e si ferma mentre tutto continua a muoversi. Mantenere una mentalità aperta è la chiave per migliorare ogni giorno. Neanche chi è esperto in qualcosa sa tutto riguardo quell\'argomento, tuttavia anche nell\'ipotesi in cui dovesse sapere tutto, la sua conoscenza potrebbe diventare obsoleta in qualsiasi momento. Imparare sempre, tenendo sempre la mente aperta.',
      'details': 'I dettagli contano',
      'details-content': 'I dettagli, secondo la mia opinione, sono ciò che fa veramente brillare qualcosa in mezzo ad altre cose simili. Spesso un alto livello di dettagli può essere ottenuto soltanto pensando fuori dagli schemi e vedendo le cose da una prospettiva differente. È possibile trovare cura e minuzia in tutto quello che faccio, grazie a ricerche e rifiniture approfondite.',
      'skills': 'Competenze',
      'coding': 'Programmazione',
      'python-content': 'Python è il linguaggio che padroneggio meglio. Adoro il suo "coding-style" molto ben definito nel documento PEP8 che rende il codice molto leggibile e con un alto grado di mantenibilità.',
      'javascript-content': 'Quando iniziai ad usare Javascript per il mio progetto principale, fui un po\' preoccupato per la sua inconsistenza tra i vari browsers. Fortunatamente jQuery e ECMAScript 6 hanno riempito molte lacune e migliorato notevolmente il linguaggio, permettendomi di apprenderlo senza intoppi. Adesso è uno di quelli che preferisco.',
      'cpp-content': 'Studiai C nel triennio del liceo scientifico indirizzo informatico, ma non fu molto approfondito, così dovetti studiarlo da solo quando decisi di lavorare ad alcuni progetti. Successivamente mi interessai alla programmazione orientata ad oggetti e così iniziai a fare pratica con C++. Direi di avere una buona conoscenza intermedia di questi linguaggi.',
      'sql-content': 'Come per quanto riguarda C, studiai la teoria dei database nel triennio del liceo scientifico indirizzo informatico, con la differenza di avere già esperienza nell\'uso di SQL in diversi dei miei progetti in Python, in particolare SQLite e l\'ORM SQLAlchemy. Ho imparato anche altri dialetti e DBMS come MySQL/MariaDB e PostgreSQL; ho anche provato superficialmente database di tipo NoSQL come Redis e MongoDB, per curiosità.',
      'htmlcss-content': 'All\'età di 12 anni circa, insieme ad alcuni amici, gestivo un piccolo forum ed io ero l\'incaricato della gestione delle parti in HTML e CSS. In quel periodo mi limitavo a copiare ed incollare pezzi di codice presi in giro per internet capendone poco, ma con il passare del tempo ho imparato e ora sono in grado di scrivere in entrambi i linguaggi molto abilmente.',
      'kotlin-content': 'Kotlin è il linguaggio che sto studiando al momento. Sto sviluppando un\'applicazione Android e iOS per il progetto Arduino, quale migliore occasione di imparare facendo!',
      'programming-other-content': 'Mi piace molto il controllo di versione e so usare Git al meglio, conosco bene le pratiche di "Git-flow" e "GitHub-flow", sono in grado di produrre messaggi di commit descrittivi e usare strumenti come submodules, rebase e cherrypick. Ho imparato molte cose leggendo il libro "Learn Git in a Month of Lunches" di Rick Umali. Nella sezione Miei Progetti puoi trovare tutti i miei lavori pubblicati su GitHub e GitLab!',
      'languages': 'Lingue',
      'italian': 'Italiano',
      'italian-content': 'Nato e cresciuto in Sicilia, l\'italiano è la mia lingua madre. Ho sempre avuto voti ottimi a scuola, in particolare nei temi, distinguendomi per l\'ottima conoscenza di vocaboli. È principalmente grazie al fatto che sono stato e sono tutt\'ora un gran lettore di libri.',
      'english': 'Inglese',
      'english-content': 'Dall\'inizio della scuola media fino alla fine della scuola superiore ho avuto 5 differenti insegnanti di inglese e tutti sono sempre rimasti molto sorpresi dalla mia vasta conoscenza della lingua, che va ben oltre quello che insegna il programma didattico. Difatti cominciai ad imparare l\'inglese da autodidatta all\'età di circa 10 anni, poiché sentivo la necessità di conoscere le storie dei videogiochi non tradotti in italiano. Da allora non ho mai smesso, interessandomi anche alla lettura di libri in inglese. Adesso sono in grado di scrivere, leggere e ascoltare l\'inglese come se fosse la mia lingua madre, anche se pecco un po\' in capacità di dialogo verbale.',
      'japanese': 'Giapponese',
      'japanese-content': 'Inizialmente lessi informazioni riguardo la lingua giapponese per pura curiosità, ma finii per volerla studiare come mia terza lingua. Per il momento la studio come hobby, ma quando sentirò di avere una buona conoscenza della lingua mi piacerebbe fare una vacanza-studio in Giappone per rafforzare ciò che ho appreso e avere un\'esperienza "sul campo". Attualmente conosco i due sillabari base, alcuni Kanji e le principali particelle che compongono la struttura della frase. È un po\' difficile venendo da una lingua romanza, ma mi impegnerò duramente e farò del mio meglio per imparare.',
      // My Projects block
      'projects': 'Miei Progetti',
      'projects-header': 'Progetti a cui sto lavorando',
      'projects-more': 'Click per altre info',
      'museigennanime-content': 'Il mio progetto più grande fin\'ora, ci lavoro dalla fine dal 2017. È un\'applicazione web personalizzabile per guardare anime, scritta in maniera modulare, espandibile grazie a dei semplici moduli capaci di caricare video da varie fonti. Ho già inserito 2 moduli con fonti italiane, ma ho intenzione di aggiungere la prima fonte inglese a breve. Il back end è scritto in Python usando Flask come server web locale, usa le librerie Requests e BeautifulSoup4 per elaborare il contenuto dalle fonti dei moduli. Il front end usa per la maggior parte materializecss e jQuery, come questo portfolio. Facoltativamente è possibile usare l\'integrazione già presente con youtube-dl per scaricare ogni video visibile dal programma.',
      's2i-projects': 'Progetti per Start2impact',
      's2i-projects-content': 'Tutti i progetti che ho fatto per start2impact possono essere trovati in questa repository, incluso questo stesso portfolio. Qui di seguito una lista con collegamenti e linguaggi principali per ogni progetto:',
      'cpp-projects': 'Progetti in C/C++',
      'cpp-projects-content': 'Mentre imparavo e mi esercitavo con C e C++ ho fatto alcuni piccoli progetti, la maggior parte sono homebrew (software non ufficiale) per Nintendo 3DS. Ultimamente sto lavorando a una libreria client C++ per un server Subsonic, di cui ho intenzione di farne un componente aggiuntivo per il riproduttore musicale Foobar2000. Più di recente ho anche iniziato un progetto Arduino per la scheda Heltec ESP32.',
      'python-projects': 'Progetti in Python',
      'python-projects-content': 'Mentre imparavo e mi esercitavo con Python ho fatto alcuni piccoli progetti, uno di essi è stato un bot di amministrazione di gruppi per Telegram, incentrato maggiormente sul recapitare notifiche agli utenti (in un tempo in cui le notifiche di Telegram nei gruppi non erano gestite bene) e con comandi e scorciatoie per vari fini amministrativi. Un altro progetto è stato un precursore del mio più grande progetto MuseigennAnime, ovvero una classe API non ufficiale per un sito di anime.',
      'projects-other': 'Progetti hobby',
      'projects-other-content': 'Alcuni miei progetti fatti per hobby, che sono in qualche modo pertinenti, riguardano la modellazione parametrica e la stampa 3D. Possiedo una stampante 3D quasi del tutto costruita autonomamente, grazie alla quale ho imparato le basi di Blender, Autodesk Fusion360 e molte cose relative alla stampa 3D. I miei modelli pubblicati possono essere trovati nel mio profilo Thingiverse riportato qui sotto.',
      // My Future block
      'future': 'Mio Futuro',
      'future-other': 'Ho già menzionato la mia cura per i dettagli? I colori delle schede qui sotto sono basati sui colori dei temi scelti per ogni sezione! L\'implementazione della tematizzazione di questo portfolio è scritta interamente da me. Se non hai già provato, nella barra di navigazione in alto della sezione Chi Sono puoi trovare il bottone Tema. Forse non ti va di salire fino a lassù, quindi potresti anche provare i collegamenti nel bottone fluttuante qui in basso a destra...',
      'future-myself': 'Me stesso',
      'future-myself-title': 'Crescita Personale',
      'future-myself-content': 'La crescita personale è una parte fondamentale della mia vita di ogni giorno. Mi piace immaginarla come la costruzione di un grattacielo senza fine: anche posizionando un singolo mattone ogni giorno, quello potrebbe sembrare un minuscolo avanzamento, viene alla fine sommato in un grande risultato. Costanza, determinazione e diligenza sono ciò che fa la differenza.',
      'future-projects': 'Progetti',
      'future-projects-title': 'Progetti Futuri',
      'future-projects-content-p1': 'La pratica nella programmazione è importante tanto quanto lo studio, quindi i progetti ne sono una parte fondamentale. Per questo è importante avere un chiaro prospetto del tempo da dedicare a ciascun progetto.',
      'future-projects-content-p2': 'Come priorità ho intenzione di continuare i progetti per start2impact giornalmente. Inoltre i miei progetti che voglio portare avanti con maggiore dedizione sono la libreria client C++ per Subsonic e MuseigennAnime, di cui sto già preparando un enorme aggiornamento.',
      'future-projects-content-p3': 'Successivamente voglio continuare il progetto Arduino per la scheda Heltec ESP32 che è un ottimo strumento di apprendimento sia software che hardware, insieme con la relativa applicazione Android e iOS in Kotlin.',
      'future-projects-content-p4': 'Più in là nel tempo quando la libreria per Subsonic raggiungerà uno stadio sufficiente di compatibilità, il relativo plugin per Foobar2000 inizierà il processo di sviluppo.',
      'future-objectives': 'Obiettivi',
      'future-objectives-title': 'Obiettivi Futuri',
      'future-objectives-content-p1': 'Il futuro è sempre incerto, ma avere degli obiettivi ben solidi aiuta a focalizzarsi su ciò che è meglio fare.',
      'future-objectives-content-p2': 'Il mio obiettivo a lungo termine è cominciare a lavorare in un team di una startup. Il lavoro di squadra è incentivante, motivamente e sono sicuro che, avendo qualcuno con cui confrontare le mie idee, imparerò nuove cose e migliorerò ogni giorno!',
      'future-objectives-content-p3': 'Per raggiungere il mio traguardo principale, start2impact mi sta dando un\'opportunità fantastica di fare esperienza e dimostrare di cosa sono capace, quindi il primo passo verso la meta è completare Corso da Full Stack con il mio massimo impegno.',
      // Footer
      'thanks': 'Ringraziamenti Speciali',
      'thanks-content-1': 'Un ringraziamento enorme a ',
      'thanks-content-2': ' per questa opportunità di imparare e migliorarmi, al team di ',
      'thanks-content-3': ', ma soprattutto alla mia amata per il costante supporto ♥',
      'links': 'Miei Links',
      'source': 'Codice Sorgente',
      // Theme modal
      'main-color': 'Colore principale',
      'nuance': 'Sfumatura',
      'text-color': 'Colore del testo',
      'background-color': 'Colore dello sfondo',
      'theme-reset': 'Reimposta',
      'theme-undo': 'Annulla',
      'theme-apply': 'Applica',
      'theme-close': 'Chiudi',
      'theme-toast-apply': 'Tema salvato e applicato',
      'theme-toast-undo': 'Modifiche al tema annullate',
      'theme-toast-reset': 'Tema reimpostato all\'originale',
    },
    'en': {
      // About Me block
      'about-me': 'About Me',
      'theme': 'Theme',
      'language': 'Language',
      'me-content': 'Born in 1997, I began gaining interest in computers by watching my father working on it. I wrote my first program when I was around 11 years old, it was a simple password manager that was able to store many passwords and print them using a master one, like Keepass or Lastpass which obviously I didn\'t know of. From there I learned and got proficient in many languages by myself, mostly learning by doing, so today I have many projects to show.',
      'open-mindedness': 'Open-mindedness',
      'open-mindedness-content': 'Life is always moving and changing. The very moment someone closes his mind to new ideas and new opinions, he stops learning and he gets stuck while everything is still moving. Keeping and open-mindedness is the key to improve everyday. Not even experts about something know everything about that matter, but even in the assumption in which they do happen to know everything, their knowledge may become outdated in any moment. Always keep learning, always keep an open mind.',
      'details': 'Details do matter',
      'details-content': 'Details, in my opinion, are what make something really shine amongs other similar things. Often an high level of details can be achieved only by thinking out of the box and by seeing things with a different perspective. It is possible to find care and meticulousness in everything I do, thanks to thorough researches and refinements.',
      'skills': 'My Skills',
      'coding': 'Coding',
      'python-content': 'Python is the language I\'m most proficient with. I love its "coding-style", well defined in the PEP8 document, giving a very high readability and maintainability grade to code.',
      'javascript-content': 'When I began using Javascript in my main project, I was a little concerned by its inconsistency between browsers. Luckily jQuery and ECMAScript 6 have filled many gaps and improved considerably the language, allowing me to learn it smoothly. Now it\'s one of my favorites.',
      'cpp-content': 'I studied C in the last three years of high school, but it wasn\'t much in depth so I had to learn by myself later on when I decided to work on some projects. Then I got interest in objective oriented programming so I started practicing C++. I\'d say I have a good mid-level understanding of it.',
      'sql-content': 'As for C, I studied database theory in the last three years of computer science high school, with the difference that I already had experience with SQL thanks to some of my Python projects, precisely SQLite and SQLAlchemy ORM. I learned other dialects and DBMS like MySQL/MariaDB and PostgreSQL; I scratched the surface of NoSQL databases like MongoDB and Redis as well, out of curiosity.',
      'htmlcss-content': 'When I was around 12 years old I did, along with some friends, administrate a small forum and I was the one in charge to manage the HTML and CSS parts. Back then for the most I did copy and paste code blocks from around the internet because I didn\'t understand much, but as time passed I began to learn and now I can fully write my own code in both languages.',
      'kotlin-content': 'Kotlin is what I\'m learning right now, I\'m doing an Android and iOS app for my Arduino project, so it\'s the best way to learn by doing!',
      'programming-other-content': 'I love versioning and I can make the most out of Git, I can work on "Git-flow" or "Github-flow", make descriptive commit messages and use tools like submodules, rebase and cherrypick. I learned much by reading the book "Learn Git in a Month of Lunches" by Rick Umali. Check out my published works in My Projects section!',
      'languages': 'Languages',
      'italian': 'Italian',
      'italian-content': 'Born and raised in Sicily, Italian is my native language. I always had high grades in school, particularly in essays, distinguishing myself for my great knowledge of words. It is thanks to the fact that I have been and am even today a great book reader.',
      'english': 'English',
      'english-content': 'Starting from middle school to the end of high school I had 5 different English teachers and every each of them was always astonished by my knowledge of the language that was beyond what school teaches, giving me always high grades. In fact, I started learning by myself English when I was around 10, because I needed to know the stories of my favorite videogames. Since then I never stopped, now by reading a lot of english books. Currently I can write, read and listen english as it was my native language, I only lack a bit of speaking.',
      'japanese': 'Japanese',
      'japanese-content': 'At first I read about Japanese language out of curiosity, but ended up wanting to learn it as my third language. I\'m currently studying it as an hobby, but once I get some mastery I plan to do a trip to Japan to reinforce my skill and get a "on field" experience. At the moment, I know the two basic syllabaries, some Kanjis and basic phrase structures and particles. It is a bit hard coming from a romance language, but I\'m going to work hard on it and do my best to learn it.',
      // My Projects block
      'projects': 'My Projects',
      'projects-header': 'Projects I\'m working on',
      'projects-more': 'Click for more info',
      'museigennanime-content': 'My biggest project to date, I\'ve been working on this since the end of 2017. It\'s a customizable web application for watching anime, it is written in a modular manner, expandable by writing simple modules that loads videos from various sources. I already wrote two modules for italian sources, but I\'m planning to add an english source soon. Its back end is written in Python with Flask as web server, it uses Requests and BeautifulSoup4 libraries to parse content from the modules\' sources. Its front end mostly uses materializecss and jQuery, like this portfolio. Optionally, the already implemented integration with youtube-dl can be used to download each and every video you can see on the program.',
      's2i-projects': 'Start2impact Projects',
      's2i-projects-content': 'All projects I\'ve made for start2impact are found within this repository, including this portfolio. Here is a list with links and main languages for each project:',
      'cpp-projects': 'C/C++ Projects',
      'cpp-projects-content': 'While learning and excercising C and C++ I\'ve done some little projects, mostly homebrew (unofficial software) for the Nintendo 3DS. Lately I\'ve been working on a C++ client library for a Subsonic server. I plan making a Foobar2000 plugin with that library. More recently I began working on an Arduino project for the Heltec ESP32 board.',
      'python-projects': 'Python Projects',
      'python-projects-content': 'While learning and excercising Python I\'ve done some projects, one of them was a group administration bot for Telegram, mostly focused on getting notification to users (in a time where Telegram group notification weren\'t well managed) and with shortcuts and commands for various administration purposes. Another project was a precursor of my bigger MuseigennAnime project, an unofficial API class for an anime website.',
      'projects-other': 'Hobby projects',
      'projects-other-content': 'Some hobby projects of mine, that are in a way related, are about 3D modelling and printing. I own an almost entirely self-built 3D printer, thanks to which I\'ve learned basics of Blender, Autodesk Fusion360 and 3D printing related stuff. My published models can be found here in my Thingiverse profile linked below.',
      // My Future block
      'future': 'My Future',
      'future-other': 'Did I mention my eye to details? These next tabs colors are based on chosen colors theme for each section! Theming implementation of this portfolio is written entirely by me. If you didn\'t give it a shot, in the top navigation bar in the About Me section you can find a Theme button. Maybe you don\'t want to scroll all the way there, so you can always try the floating links in the bottom right corner...',
      'future-myself': 'Myself',
      'future-myself-title': 'Personal Improvement',
      'future-myself-content': 'Personal improvement is a fundamental part of each and every day of my life. I like to imagine it as building a never ending skyscraper: even if you put a single brick every day may seem to be insignificant progress, but it in the end it adds up to a big result. Constance, determination and diligence is what makes a difference.',
      'future-projects': 'Projects',
      'future-projects-title': 'Future Projects',
      'future-projects-content-p1': 'Practicing in programming is just as important as studying, so projects are a fundamental part of it. For this reason it\'s important to have a clear prospectus of the time to be dedicated to each project.',
      'future-projects-content-p2': 'As my top priority, I plan continuing start2impact projects on a daily basis. Then the projects I want to carry on with much dedication are my Subsonic C++ library and MuseigennAnime, of which I\'m already working on a huge rework!',
      'future-projects-content-p3': 'Next I\'ll continue the Arduino project for the Heltec ESP32 board that is a great learning tool both software and hardware, along with relative Android and iOS app in Kotlin.',
      'future-projects-content-p4': 'Further on, when the Subsonic library will reach a good compatibility state, the Foobar2000 plugin will begin its development stage.',
      'future-objectives': 'Objectives',
      'future-objectives-title': 'Future Objectives',
      'future-objectives-content-p1': 'Future is always uncertain, but having solid objectives helps maintaining focus on what\'s better to do.',
      'future-objectives-content-p2': 'My long term aim is beginning to work in a startup team. Team working is often incentivizing, motivating and I\'m sure that, having someone to confront my ideas with, I\'ll learn new things and improve everyday!',
      'future-objectives-content-p3': 'To achieve my main aim, start2impact is giving me a big chance to gain experience and demonstrate what I\'m capable of, so my first step towards the goal is to complete my Full Stack Course with my full commitment.',
      // Footer
      'thanks-content-1': 'Huge thanks to ',
      'thanks-content-2': ' for this opportunity to learn and improve myself, to ',
      'thanks-content-3': ' team, but especially to my dear love for supporting me ♥',
      'thanks': 'Special Thanks',
      'links': 'My Links',
      'source': 'Source Code',
      // Theme modal
      'main-color': 'Main Color',
      'nuance': 'Nuance',
      'text-color': 'Text Color',
      'background-color': 'Background Color',
      'theme-reset': 'Reset',
      'theme-undo': 'Undo',
      'theme-apply': 'Apply',
      'theme-close': 'Close',
      'theme-toast-apply': 'Theme saved and applied',
      'theme-toast-undo': 'Undone theme edits',
      'theme-toast-reset': 'Theme reset to default',
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
