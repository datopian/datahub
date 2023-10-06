---
section: help
lead: true
title: Inserisci una visualizzazione nel tuo sito web
authors:
- stefanobandera
---
Si può facilmente incorporare sul proprio sito web una delle visualizzazioni create su OpenSpending. Questo significa che puoi avere i display interattivi anche sul tuo sito.

Presupponiamo che abbiate scelto una visualizzazione su Open Spending. Se noti sulla parte in basso a destra della pagina c'è un pulsante *Embed*. Fai clic su questo pulsante e ti verrà presentato il codice per incorporare la visualizzazione sul vostro sito web e alcune opzioni per le dimensioni (in pixel) . Per il resto bisogna solo tagliare e incollare questo codice nel tuo sito. Se non siete sicuri su come incollare correttamente il codice, contattare l'amministratore del sito.

Il motivo per cui è possibile incorporare un codice dipende dai widget. In termini molto semplificati, un widget è un pezzo di codice che è possibile aggiungere alla tua pagina web, e tira i dati - in questo caso, dal database di OpenSpending - in modo che non sia necessario memorizzare i dataset per proprio conto.

**Siti Satelliti**

## INESC - Orçamento ao seu Alcançe (Budget alla tua portata?)

Questa è stata una collaborazione tra OKF Brasil _ INESC (Istituto di studi socio-economici), una ONG brasiliano. L'obiettivo era quello di rendere più facile per il pubblico monitorare il bilancio federale brasiliano, e come è suddiviso tra i molti enti pubblici, con una particolare attenzione sui capitoli di spesa.

I dati provengono da SIGA Brasil, un aggregatore dei tanti sistemi utilizzati dal governo per organizzare il bilancio. Questo ci permette di scegliere le colonne che vogliamo, ad esempio ente pubblico, categoria, sottocategoria, budget, spese, ecc, _ esportare in un file CSV. dati dal 2001, fino alla data attuale, aggiornato quotidianamente. A parte alcuni problemi, come le righe con mese "00", non abbiamo dovuto modificare molto per caricarlo in OpenSpending.

### Costruire il sito

Sapevamo di volerci concentrare su OpenSpending, cosa che ora avviene a vari livelli per tutti gli enti pubblici. Nel 2012, per esempio, il Ministero dell'Istruzione non ha speso il 16,3% del proprio bilancio (circa 6,1 miliardi di dollari). OpenSpending non aveva un grafico, out-of-the-box, che andrebbe bene per questo tipo di dati. Così abbiamo progettato il nostro software.

Dopo alcune ore di prove, abbiamo deciso di fare un grafico a serie cronologica, con barre e linee. Il grafico in figura X mostra i dati del 2012 del Ministero dell'educazione . L'area blu rappresenta il budget (nota che cambia nel corso dell'anno). Le barre mostrano quanto è stato speso in quel determinato mese, e la linea mostra il totale delle spese fino ad ora. Si può vedere, dalla distanza della linea rossa dalla punta dell'area blu, che a Dicembre è stato alquanto sotto utilizzato.

<img class="alignnone size-medium wp-image-1590" src="http://community.openspending.org/files/2013/10/image_20-300x147.png" alt="image_20" width="300" height="147" />

Per costruire questo grafico, stiamo usando NVD3, una libreria JavaScript con una raccolta di grafici riutilizzabili in D3. Il dato proviene da OpenSpending, utilizzando le API Aggregate. E 'ottimo e, dopo aver fatto un aggregazione, il risultato si memorizza nella cache e il programma diventa molto veloce. Ma esiste una limitazione che ci ha dato alcuni problemi: è possibile utilizzare solo una misura alla volta.

Per questo grafico, abbiamo 2 misure: il budget ed i pagamenti. Ma, internamente, i pagamenti sono divisi in due parti: quello che è stato pagato per l'anno in corso, ed i debiti pagati negli anni precedenti. Così, ci troviamo con 3 misure. Visto che l'API Aggregata ne consente solo una, abbiamo dovuto fare tre richieste per la costruzione di questo grafico.

Questo, ovviamente, crea un problema di prestazioni, sia per il nostro progetto sia per OpenSpending stesso. Ma, visto che le richieste vengono memorizzate nella cache dopo il primo utilizzo, si finisce per risolvere tutto. Esistono già piani per supportare più misure nelle API, quindi anche questo problema verrà risolto.

### Per usare il Treemap

Nella pagina di indice, abbiamo voluto mostrare una visione ampia del il bilancio riguardante gli enti pubblici. Inoltre, abbiamo voluto mostrare la quantità di denaro che viene utilizzato sia per funzione che per sottofunzione, come l’istruzione generale e l'istruzione di base. Per dimostrare questo, abbiamo scelto il Treemap.

Tramite un widget è stato facile: basta crearlo in OpenSpending, prendere il codice e incollarlo nel sito. Ma abbiamo però incontrato alcune limitazioni.

I widget sono fatti per quando si vuole semplicemente mettere il grafico in un post sul blog o articolo di giornale. Non è possibile personalizzarlo. Abbiamo dovuto cambiare i caratteri e i colori, per farlo entrare all'interno del design del resto della pagina. Dato che è un iframe, non c'è modo di cambiarlo usando solo CSS. Ma c'è una soluzione semplice: copiare il codice iframe del widget nella tua pagina.

<img class="alignnone size-medium wp-image-1591" src="http://community.openspending.org/files/2013/10/image_21-300x173.png" alt="image_21" width="300" height="173" />

Non c'è bisogno di costruire un treemap, bastano poche righe di codice di inizializzazione. Quando è nella tua pagina, è possibile utilizzare anche CSS. Purtroppo, questo non funziona per tutto: i colori non possono essere modificati in questo modo. Ma è facile configurare un altro schema di colori: devi semplicemente cambiare il codice di inizializzazione. Abbiamo anche aggiunto un pulsante "Indietro", in modo da poter navigare facilmente tra funzioni e sottofunzioni.

**Searching**

Per aiutare l'utente a trovare gli enti pubblici, abbiamo implementato un motore di ricerca con il completamento automatico, utilizzando il plug-in di Twitter Bootstrap typeahead. Poiché non ci sono molte entità (circa 500), abbiamo deciso di caricarle tutte quando l'utente entra prima nella pagina, in modo che la ricerca sia istantanea.

<img class="alignnone size-medium wp-image-1592" src="http://community.openspending.org/files/2013/10/image_22-300x177.png" alt="image_22" width="300" height="177" />

**Precedente** [<a href="../crea-una-visualizzazione/">Crea una visualizzazione</a>]

**Inizio** [<a href="{{site.baseurl}}/help/guide/it/">Guida ad OpenSpending</a>]
