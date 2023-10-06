---
section: help
lead: true
title: Crea una visualizzazione
authors:
- stefanobandera
---
La piattaforma OpenSpending rende facile creare e incorporare visualizzazioni di set di dati. Sono supportati tre tipi di visualizzazioni: BubbleTree, TreeMap, e la tabella di aggregati.

Tutte le visualizzazioni presenti in OpenSpending permettono di scegliere una serie di dimensioni lungo le quali aggregare i dati, aumentando il livello di particolarità qualora ve ne sia bisogno. Ogni visualizzazione viene creata nello stesso modo: con la scelta delle dimensioni da aggregare e l'ordine in cui eseguire il drill down.

Per iniziare a creare una visualizzazione, vai alla home page di un dataset e seleziona **Create a visualization** dal <em>Visualizations menu</em>.

**BubbleTree**

Il BubbleTree è una visualizzazione interattiva che presenta i dati di spesa aggregati come un cerchio a bolle. Ogni bolla rappresenta un aggregato (sub) totale. La bolla centrale rappresenta una somma aggregata, e le sue bolle circostanti rappresentano le altre somme da cui è composta. Cliccando su ogni bolla, viene mostrato all'utente come la somma si divida ulteriormente in sub-totali .

Per creare un BubbleTree, scegli le dimensioni da aggregare e l'ordine in cui aggregarle. Scegli la dimensione primaria dal menu a cascata. Si vedrà il totale aggregato per quella dimensione, come la bolla centrale, con i singoli valori totali che la circondano.

<img class="alignnone size-medium wp-image-1578" src="http://community.openspending.org/files/2013/09/image_14-259x300.png" alt="image_14" width="259" height="300" />

Per aggiungere un secondo livello, clicca su Add a level e scegli una nuova dimensione. Gli utenti saranno ora in grado di fare clic su le bolle di "drill-down" e vedere come i valori del primo livello si suddividono in i singoli valori totali nel secondo livello.

<img class="alignnone size-medium wp-image-1579" src="http://community.openspending.org/files/2013/09/image_15-251x300.png" alt="image_15" width="251" height="300" />

**TreeMap**

Il TreeMap presenta i dati di spesa aggregati come un rettangolo interattivo composto da rettangoli colorati. Ogni rettangolo rappresenta valori aggregati per una particolare dimensione dei dati. Cliccando su "zooms in" si mostra come è possibile scomporre ed esplorare le dimensioni aggregate.

Per creare un TreeMap, basta scegliere le dimensioni da aggregare e il loro ordine. Seleziona la dimensione primaria dal menu *Tile*. Vedrai un TreeMap che mostra come la spesa totale scompone attraverso quella dimensione.

<img class="alignnone size-medium wp-image-1580" src="http://community.openspending.org/files/2013/09/image_16-262x300.png" alt="image_16" width="262" height="300" />

La visualizzazione non è ancora interattiva . L'aggiunta di ulteriori livelli ci mostra come sia possibile scomporre ed esplorare le dimensioni aggregate, permettendo di visualizzare in dettaglio come valori aggregati si scompongano in unità più piccole. Per aggiungere un secondo livello di rettangoli, clicca su **Add a level** e scegli una nuova dimensione. Gli utenti possono ora scegliere i rettangoli con i quali dividere il totale.

<img class="alignnone size-medium wp-image-1581" src="http://community.openspending.org/files/2013/09/image_17-254x300.png" alt="image_17" width="254" height="300" />

### Table of Aggregates

La tabella di aggregati è una semplice rappresentazione tabellare di un dataset che aggrega i totali delle dimensioni scelte. Una tabella di aggregati si specifica scegliendo dimensioni da inserire nelle sue colonne.

La scelta di una dimensione primaria tramite il *Column menu* visualizza i dati in forma di tabella, con importi aggregati e percentuali del totale complessivo. Di default, le righe verranno ordinati in base a valori percentuali.

<img class="alignnone size-medium wp-image-1582" src="http://community.openspending.org/files/2013/09/image_18-300x229.png" alt="image_18" width="300" height="229" />

Aggiungendo un'altra colonna, cliccando su Add a level, si rompe ogni subtotale presente nella prima colonna tramite le somme aggregati della nuova colonna. Nota che questo in genere cambia i valori percentuali e riorganizza le righe della tabella.

<img class="alignnone size-medium wp-image-1583" src="http://community.openspending.org/files/2013/09/image_19-300x264.png" alt="image_19" width="300" height="264" />

**Prossimo** [<a href="../inserisci-una-visualizzazione-nel-tuo-sito-web/">Inserisci una visualizzazione nel tuo sito web</a>]

**Precedente** [<a href="../creare-un-dataset-su-openspending/">Modellare i tuoi dati su OpenSpending</a>]
