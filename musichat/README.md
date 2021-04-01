# Musichat

Musichat permette di collegarsi con altri utenti per chattare, ascoltare della musica o guardare dei video insieme rimanendo sincronizzati automaticamente. Ognuno è libero di creare la propria stanza, selezionare quella predefinita o scegliere tra l’elenco di quelle create da altri.



## Dettagli implementazione

### Frontend

- **React.js** libreria rendering e gestione DOM

- **Material-UI** componenti UI/UX in Material Design puliti e responsive

- **react-router-dom** per differenziare ordinatamente le varie stanze e permettere una futura espansione del progetto
- **socket.io-client** per la comunicazione in tempo reale e bilaterale con il server. Vengono passate informazioni come i messaggi degli utenti, i dati di sincronizzazione dei video e messaggi di sistema.
- **axios** per le richieste alle RESTful APIs fornite dal back end Node.js con il framework Express.js
- **react-youtube** che fornisce un componente con delle API di interazione semplici ed efficienti
  moment per la gestione dei tempi per la sincronizzazione e l’ordinamento cronologico dei messaggi
- **React Hooks** usati per facilitare la manutenzione e la leggibilità del codice
- **React Context** usato per rendere lo state contenente le informazioni della stanza disponibile ai vari componenti evitando di doverlo passare ad ogni livello

### Backend

- **Node.js**
- **Express.js** libreria usata come web server per distribuire le pagine e gli asset prodotti dalla build di React.js
- **Socket.IO** usata per la comunicazione in tempo reale e bilaterale con i client. Vengono passate informazioni come i messaggi degli utenti, i dati di sincronizzazione dei video e messaggi di sistema.



## Demo

https://floating-harbor-72676.herokuapp.com/

**Nota:** il caricamento al primo avvio potrebbe richiedere un minuto a causa di una limitazione dell'hosting

