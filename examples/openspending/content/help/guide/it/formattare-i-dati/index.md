---
section: help
lead: true
title: Formattare i dati
authors:
- stefanobandera
---
Openspending si aspetta che tutti i dati sian presentati in un formato semplice.

**CSV**

OpenSpending accetta dati in un formato di file singolo, il Comma Separated Value (CSV​​). CSV è un file di testo che rappresenta i dati in forma di tabella, simile a un foglio di calcolo. In una tabella, ciascun dato è rappresentato da una riga, e le proprietà di ciascun dato sono rappresentate da una colonna. I file CSV codificano le tabelle dando ad ogni riga una linea nel file di testo e separando le colonne tramite virgole.

I CSV accettati da OpenSpending sono denormalizzati, il che significa che essi non liberano spazio eliminando i valori ridondanti. Inoltre file CSV di OpenSpending sono a forma rettangolare, ovvero posseggono esattamente lo stesso numero di colonne in ogni riga.

**Il format OpenSpending**

I file CSV di OpenSpending devo avere le seguenti proprietà.

1. Una riga di intestazione. La prima riga del file CSV deve contenere i nomi delle colonne, separati da virgole. Tutte le altre righe vengono trattate come righe dei dati.

2. Almeno tre colonne. Valori indispensabili delle colonne sono: un importo, la data (in cui ci si potrebbe riferire solo all’anno), e un compratore o un destinatario (che potrebbe essere il nome di un account).

3. Colonne corrispondenti. Ogni colonna deve rappresentare sempre un singolo tipo di valore per tutte le righe. (Non ci può essere nessuna riga sottointestata, per esempio.)

4. Le righe sono punti dati. Le righe devono contenere un solo tipo di informazione: una transazione o una linea di bilancio. Una riga deve rappresentare al massimo un solo periodo di tempo. (Le righe non possono rappresentare più transazioni.)

5. Nessun riga o cella vuota. Ogni riga di un file di dati importato deve contenere tutte le informazioni necessarie per costruire l'oggetto risultante.

6. Nessun totale pre-aggregato (per es. totali parziali o "roll-up"). OpenSpending calcolerà questi automaticamente.

7. Un identificatore unico. Ci deve essere una colonna (o una combinazione di colonne) il cui valore identifica in modo univoco ogni riga. Il modo più semplice per creare un tale identificativo è quello di aggiungere una colonna fittizia al dataset in cui si inserisce un numero che per ciascuna riga aumenta. È possibile farlo in Excel digitando i numeri nelle prime due file, selezionando entrambe le celle e trascinando verso il basso l'angolo inferiore destro della cella per estendere la serie. Se l'insieme dei dati ha troppe righe per Excel, è possibile aggiungere la colonna di identificazione unica usando [mySQL](http://stackoverflow.com/questions/16113570/how-to-add-new-column-to-mysql-table).

8. Le date nel formato corretto. Le date devono essere nel formato "aaaa-mm-gg".

9. I numeri nel formato corretto. I numeri devono contenere solo cifre e un periodo opzionale - no virgole! (Numeri leggibili come "12,345.67" devono essere convertiti in numeri come "12.345,67".)

La comunità di OpenSpending ha raccolto qualche esempio di fogli di calcolo, al fine di illustrare come appaiono "buoni"o “cattivi” dati tabulari.

Qui sono presentati esempi di cattiva formattazione dei fogli di calcolo:

* [transazioni multiple su una riga](https://docs.google.com/spreadsheet/ccc?key=0AvdkMlz2NopEdG5kR0kzQ0E5V3BuTS16MndBT3dMdEE#gid=0), (diversi anni su di una stessa riga)

* [cattivi numeri](https://docs.google.com/spreadsheet/ccc?key=0AvdkMlz2NopEdEo1Y2p2R0VvdnJvRXMwUVREbHRoLXc#gid=0), (i numeri hanno le virgole per leggibilità)

* [Washington, DC](https://docs.google.com/a/okfn.org/spreadsheet/ccc?key=0AvdkMlz2NopEdDhrZnRkWl9ZX2ZZNVptTzdueWw3emc#gid=0) (dati sulle transazioni)

* [Minsk, Belarus](https://docs.google.com/a/okfn.org/spreadsheet/ccc?key=0AvdkMlz2NopEdEtIMFlEVDZXOWdDUEthUTQ0c21aV2c#gid=0) (dati sui bilanci)

**Prossimo** [<a href="../pubblicare-i-dati-sul-web/">Pubblicare i dati sul web</a>]

**Precedente** [<a href="../raccolta-dati/">Raccolta Dati</a>]
