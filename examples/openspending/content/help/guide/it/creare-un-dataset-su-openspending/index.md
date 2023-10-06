---
section: help
lead: true
title: Creare un dataset su OpenSpending
authors:
- stefanobandera
---
Per iniziare la condivisione dei dati sulla piattaforma OpenSpending, registrati su OpenSpending.org e crea un nuovo OpenSpending dataset. Per creare un set di dati, è sufficiente compilare alcuni metadati, che caratterizzano i propri dati, e fornire l'URL in cui i dati sono ospitati.

**Crea un nuovo dataset**

Accedi OpenSpending.org con le informazioni utente, o registrati se non l'hai ancora fatto. Arriverai alla Dashboard, dove vedrai un pulsante blu etichettato *Import a dataset. *Fai clic qui per avviare la creazione di un nuovo insieme di dati su OpenSpending.

La schermata successiva richiede di fornire i metadati che contraddistinguono i tuoi dati. Questo include i seguenti campi:

* *Title*: un nome descrittivo e significativo per il dataset. Può essere qualsiasi stringa.

* *Identifier*: un titolo più breve, utilizzato come parte dell'URL del dataset. Può contenere solo caratteri alfanumerici, trattini e underscore - senza spazi o segni di punteggiatura.

* *Category*: "Bilancio", "spese", e "Altro". Vedi la sezione guida riguardo i tipi di dati finanziari per i dettagli su queste categorie.

* Currency: la valuta in cui la spesa descritta dal dataset ha luogo.

* Paesi: l'elenco dei paesi di riferimento nel dataset. La scelta degli Stati è limitata da un elenco di paesi validi.

* Languages: l'elenco delle lingue utilizzate nel dataset. La scelta delle lingue è limitata da un elenco di lingue valide.

* Description: una caratterizzazione del dataset in semplice prosa. Può essere qualsiasi stringa.

Compila tutti questi campi. Assicurati di includere una descrizione che spieghi l'origine del dataset e riconosca tutte le modifiche introdotte (ad esempio, le operazioni di pulizia che hai fatto).

Una volta che tutti i metadati sono state inseriti, premi **Next Step **per procedere.

**Aggiungere una nuova fonte di dati**

Facendo clic su *next step* viene creato il tuo nuovo dataset OpenSpending che ti conduce alla pagina di Gestione. La pagina Gestione viene utilizzata per aggiungere sorgenti dati. E' utilizzato anche per fornire informazioni schematiche che permettono ad OpenSpending di interpretare i dati, un processo chiamato "modelling" che verrà trattato nella prossima sezione della guida.

Per aggiungere una fonte di dati al dataset, fai clic su *Add source*. Viene visualizzato un messaggio che vi chiederà di inserire un URL. Fornisci l'URL del file CSV che hai pubblicato sul web, nella sezione precedente della guida e fai clic su *Create*. Vedrai una finestra di testo blu che indica l’elaborazione dati di OpenSpending.

<img class="alignnone size-medium wp-image-1564" src="http://community.openspending.org/files/2013/09/image_2-300x104.png" alt="image_2" width="300" height="104" />

Clicca su *Refresh *o semplicemente usa il pulsante di aggiornamento del browser. Se OpenSpending riesce ad analizzare i dati, si dovrebbe vedere una casella di testo verde che indica che i dati sono pronti. Si dovrebbe anche vedere un elenco delle colonne del file CSV.

<img class="alignnone size-medium wp-image-1565" src="http://community.openspending.org/files/2013/09/image_3-300x202.png" alt="image_3" width="300" height="202" />

Si noti che se si fornisce ad OpenSpending un file HTML invece di un file CSV valido, il software non si lamenterà, ma semplicemente cercherà di analizzare il codice HTML come se fosse un file CSV. Il risultato è simile al seguente.

<img class="alignnone size-medium wp-image-1566" src="http://community.openspending.org/files/2013/09/image_4-300x104.png" alt="image_4" width="300" height="104" />

Se hai aggiunto una fonte dati non corretta, non ti preoccupare. Non è necessario utilizzare la fonte nel dataset finale: OpenSpending richiede di lavorare molto su una fonte di dati prima di poter essere pubblicata. Basta aggiungere una nuova, corretta sorgente e dimenticare quello sbagliata.

**Prossimo** [<a href="../modellare-i-tuoi-dati-su-openspending/">Modellare i tuoi dati su OpenSpending</a>]

**Precedente** [<a href="../pubblicare-i-dati-sul-web/">Pubblicare i dati sul web</a>]
