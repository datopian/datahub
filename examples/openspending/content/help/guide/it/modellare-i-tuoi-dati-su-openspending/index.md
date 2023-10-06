---
section: help
lead: true
title: Modellare i tuoi dati su OpenSpending
authors:
- stefanobandera
---
Per caricare i dati in OpenSpending, è necessario costruire un modello - dati. Un modello serve a specificare come i dati si traducano in termini che OpenSpending comprenda. OpenSpending rappresenta le proprietà dei dati in termini di dimensioni. I dati di modello si realizzano elencando le dimensioni che si desidera studiare nel dataset caricato su OpenSpending, e specificando come questi si relazionino alle colonne presenti nei dati di origine.

### Dimensioni obbligatorie: quantità e tempo

Ogni modello deve avere almeno due dimensioni: una quantità e un tempo. Questi specificano la dimensione della transazione e il momento in cui questa è avvenuta. La quantità e il tempo sono associati a particolari tipi di dimensioni. L'importo viene rappresentato da una misura, e il tempo è rappresentato da una data. Dimensioni generiche non possono rappresentare questi valori specifici.

Quando modelli i dati, non è una cattiva idea quella di iniziare con le dimensioni obbligatorie. Per iniziare, fai clic su *Dimensions &amp; Measures* all'interno della pagina **Manage the dataset**.

<img class="alignnone size-medium wp-image-1568" src="http://community.openspending.org/files/2013/09/image_5-300x113.png" alt="image_5" width="300" height="113" />

Successivamente, fai clic su *Add Dimension *per aprire il nuovo pannello *Add new dimension*. Clicca sul pulsante *Date*. Vedrai la casella *Name box *riempirsi automaticamente con il "tempo", come mostrato di seguito. Fai clic sul pulsante verde Aggiungi (**Add**).

<img class="alignnone size-medium wp-image-1569" src="http://community.openspending.org/files/2013/09/image_6-300x215.png" alt="image_6" width="300" height="215" />

La prossima schermata fornirà alcune informazioni sul significato del tempo. Nella casella a discesa accanto alla Colonna, seleziona la colonna dei dati che rappresenta il valore del tempo.

<img class="alignnone size-medium wp-image-1570" src="http://community.openspending.org/files/2013/09/image_7-300x129.png" alt="image_7" width="300" height="129" />

Dopo aver identificato la colonna tempo, fai clic su *Add Dimension *per aggiungere la dimensione quantità. Questa volta, selezionare il pulsante di opzione *Misura*, che riempirà automaticamente la colonna "amount", e clicca su *Add*. Scegli la colonna che rappresenta il valore della transazione tramite il box a discesa accanto alla Colonna.

### Le dimensioni chiavi e di compound

Soltanto una dimensione supplementare è necessaria per rendere il modello valido: la dimensione (o insieme di dimensioni) il cui valore identifica ciascun punto dei dati, la chiave.

Un punto dati non deve essere identificato dal valore di una singola colonna. Esso può essere identificato dalla combinazione di varie colonne in una dimensione composta. Poiché le chiavi possono essere composte, il tipo di dimensione deve essere utilizzato per rappresentarle, anche se la chiave particolare non è composta.

Per aggiungere la dimensione chiave, clicca su ** *Add Dimension * **e seleziona il pulsante *Dimension*. Inserisci un nome per la chiave, come "key", nel *Name box*. Fai clic su ** *Add* **. Selezionare la casella *include _ unique key *per identificare questa dimensione come parte della vostra chiave.

Successivamente, date un'occhiata alla **Field list**, che contiene due file *name *e *label*. Una dimensione composta può contenere un numero arbitrario di campi, ciascuno dei quali ha un nome e una tipizzazione e ciascuno dei quali può essere associato a una colonna nei dati. Questo è il senso per cui tali dimensioni sono dette "composte": esse raggruppano colonne multiple derivanti dai dati di origine, in una singola proprietà del dataset di destinazione.

<img class="alignnone size-medium wp-image-1571" src="http://community.openspending.org/files/2013/09/image_8-300x172.png" alt="image_8" width="300" height="172" />

Una dimensione composta richiede almeno due campi, *name* e *label*, che devono essere rispettivamente di tipo id e di stringa. Il nome della dimensione viene utilizzato per dotarla di un URL funzionante, l'etichetta viene utilizzata per presentarla nell'interfaccia utente.

Per creare una dimensione composta minima, è sufficiente associare la stessa colonna dei dati di origine con nome ed etichetta. Scegliere la colonna appropriata per ciascuna dimensione e lasciare le tipologie predefiniti invariati.

### Misure e altre dimensioni

Con quantità, tempo e chiave, il modello è sufficientemente ricco. Un modello veramente completo, tuttavia, comprenderà dimensioni per ogni proprietà significativa dei dati di origine. Seguendo alcune convenzioni questo diventa più conveniente.

Un modello comune per i dati di origine sta diffondendo informazioni che identificano entità - gruppi, account, e così via - tramite diverse colonne. Le informazioni su un account associato a una transazione ad esempio possono essere visualizzate dividendo in una colonna "Account", con un numero di identificazione e una colonna "descrizione Account" con una descrizione verbale. "Head-account" e "Sub-account" nell'immagine qui di seguito presentano questo modello.

<img class="alignnone size-medium wp-image-1572" src="http://community.openspending.org/files/2013/09/image_9-300x226.png" alt="image_9" width="300" height="226" />

Le dimensioni composte di OpenSpending sono progettate per modellare questo tipo di informazioni sparse. Per farlo, aggiungi una nuova dimensione composta e associa ogni colonna ad uno dei campi della dimensione creata. Cerca di far corrispondere una colonna leggibile e una colonna più concisa per essere rinominata. Nell'immagine sottostante, "Head-account" è abbinato a *name* e " Head-account description" a *label*.

<img class="alignnone size-medium wp-image-1573" src="http://community.openspending.org/files/2013/09/image_10-300x185.png" alt="image_10" width="300" height="185" />

Alcune colonne di dati sono più autonome, rappresentando particolari attributi di ciascun punto dati. Una colonna che ordina ogni transazione in qualche categoria, per esempio, è di questo tipo. Nell'immagine sottostante le colonne Reporting Type, Revenue/Expenditure, e Recurrent/Investment sono di questo tipo.

<img class="alignnone size-medium wp-image-1574" src="http://community.openspending.org/files/2013/09/image_11-300x186.png" alt="image_11" width="300" height="186" />

Colonne indipendenti che specificano attributi o categorie sono meglio modellate con le dimensioni *attribute*. Un attributo è essenzialmente una dimensione con un solo campo, che può essere di qualsiasi tipo. Per creare un attributo, è sufficiente selezionare il pulsante di opzione *Attribute* quando si aggiunge una dimensione.

<img class="alignnone size-medium wp-image-1575" src="http://community.openspending.org/files/2013/09/image_12-300x236.png" alt="image_12" width="300" height="236" />

**Concludendo: salvataggio e caricamento**

Quando ogni dimensioni è stato impostata e collegata alle rispettive colonne nei dati di origine, fai clic su *Save Dimensions* per salvare il modello. Se qualcosa è sbagliato con il modello, viene visualizzato un messaggio di errore che richiede di correggere i parametri. In caso contrario, verrà visualizzato un messaggio che ti invita a tornare alla dashboard, dove si può procedere a caricare i dati.

Una volta che i dati sono stati caricati, il modello creato sarà fisso e il montaggio sarà disattivato. Quindi,volendo, si può testare il modello prima di caricarlo. Per fare questo, clicca su Test nella riga dedicata alla fonte dati presente nella dashboard. Attendi alcuni secondi, quindi ricarica la pagina. Se viene visualizzato un messaggio con uno sfondo verde che dice COMPLETE, il modello è pronto a partire. Se vedi errori, sono necessarie alcune riparazioni.

<img class="alignnone size-medium wp-image-1576" src="http://community.openspending.org/files/2013/09/image_13-300x139.png" alt="image_13" width="300" height="139" />

Se il vostro modello è privo di errori, fai clic su *Load* per caricare il dataset di origine e applicare il modello. Si può quindi tornare alla home page del dataset cliccando sul suo nome nella parte superiore della schermata, in cui è possibile procedere alla costruzione di effetti grafici e giocare con i vostri dati.

**Prossimo** [<a href="../crea-una-visualizzazione/">Crea una visualizzazione</a>]

**Precedente** [<a href="../creare-un-dataset-su-openspending/">Creare un dataset su OpenSpending</a>]
