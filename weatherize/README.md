# Weatherize

### Progetto di valutazione Javascript

Per questo progetto è stato richiesto di creare una pagina web che si interfacciasse con le API di [OpenWeather](https://openweathermap.org/) per la ricerca del meteo in una località.

Ho reso personale il progetto creando un oggetto Javascript istanziabile con una chiave API di OpenWeather, il quale permette a qualsiasi pagina di mostrare il meteo di una località con poche aggiunte al codice.



## Esempio

### Istanziamento

L'oggetto Weatherize fa instanziato con parametro la chiave API di OpenWeather

```javascript
let weatherize = new Weatherize('CHIAVE-API');
```



### Verifica (opzionale)

È possibile verificare le la chiave istanziata sia corretta e funzionante con l'apposita funzione. È possibile passare come parametri una funzione di callback e successivamente parametri per la stessa.

```javascript
watherize.keyTest(callback, 'par1', 'par2', ...);
```



### Definizione campi

Gli elementi della pagina che verranno riempiti sono definiti da semplici classi che iniziano tutte con `weather-`

```html
<h1 class="weather-location"></h1>

<div>
    <span class="weather-date weather-d1"></span>
    <img class="weather-icon-avg weather-d1">
    <span class="weather-temp-max-avg weather-d1"></span>
    <span class="weather-temp-min-avg weather-d1"></span>    
</div>

<div>
    <span class="weather-date weather-d2"></span>
    <img class="weather-icon-avg weather-d2">
    <span class="weather-temp-max-avg weather-d2"></span>
    <span class="weather-temp-min-avg weather-d2"></span>   
</div>

...
```



### Riempimento campi

È possibile chiamare questa funzione sia con una località Chiamando questa funzione i campi precedentemente definiti verranno riempiti con i 

```javascript
weatherize.getWeather('Località', callback);
```





Risorse usate:

- [Materialize](https://materializecss.com/) 

- [jQuery](https://jquery.com/)

- [FontAwesome](https://fontawesome.com/)

  

[Sito Web](https://kyraminol.github.io/s2i-projects/weatherize/)
