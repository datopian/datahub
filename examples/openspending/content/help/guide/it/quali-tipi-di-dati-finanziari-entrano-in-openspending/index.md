---
section: help
lead: true
title: Quali tipi di dati finanziari entrano in OpenSpending?
authors:
- stefanobandera
---
OpenSpending è molto flessibile nel tipo di dati finanziari che supporta. Anche se il progetto OpenSpending ha un forte focus sulla finanza pubblica, questo non è un vincolo tecnico. OpenSpending supporta qualsiasi insieme di dati costituito da un insieme di transazioni, ciascuna associata ad una quantità di denaro e un periodo di tempo.

La maggior parte dei dati attualmente ospitati su OpenSpending possono essere classificati come dati transazionali o di bilancio. La differenza principale tra questi è il loro livello di granularità. Dati transazionali o di transazione tracciano singole operazioni, mentre i dati sul bilancio aggregano le transazioni in categorie.

### Dati di spesa derivanti da transazioni

I dati di transazione, o semplicemente "i dati di spesa", tracciano singole operazioni finanziarie. Ogni pagamento tra singoli soggetti, in una determinata data, e per uno scopo specifico (ad esempio, un progetto o un servizio) è elencato singolarmente. Dati di spesa transazionali comprendono vari tipi di record, comprese le informazioni sui contributi pubblici, le obbligazioni, e le spese effettive.

Le informazioni aggregate (ad esempio la somma) non dovrebbero essere incluse nei dati di transazione. Dati che sono stati parzialmente o completamente aggregati richiedono una diversa modalità di analisi e devono essere trattati come dati di bilancio piuttosto che dati di transazione. Ciò non significa, tuttavia, che i diversi pagamenti "fisici", che si riferiscono ad una singola transazione "logica" non possano essere rappresentati da una singola operazione nella tipologia dei dati transazionali.

I dati di transazione in OpenSpending includono:

* [DC Venditori e Contraenti](http://openspending.org/dc-vendors-contractors)

* [L’Austrian Development Agency](http://openspending.org/ada)

Un altro tipo correlato di dati si riferisce alle procedure di aggiudicazione degli appalti pubblici. Dati sugli appalti sono dati relativi a gare pubbliche: quanto è stato offerto, per quanto, e chi ha vinto la gara. Esso può essere visto come un sottoinsieme dei dati di transazione.

I dati sugli appalti comprendono:

* [Marchés publics au Sénégal](http://openspending.org/marches-publics-senegal/views/liste-des-attributaires)

* [Marchés publics France 2011](http://openspending.org/marches-publics-france-2011)

### Dati di bilancio

Nei dati di bilancio, le spese e i redditi sono aggregati per categorie. L'obiettivo di questa aggregazione è quello di aiutare il lettore nella comprensione del bilancio, che in genere è un documento di policy che viene utilizzato per fornire una panoramica sulle più importanti scelte finanziarie del governo. L'allocazione dei dati è tipicamente strutturata da uno schema di classificazione, piuttosto che tramite i destinatari effettivi dei fondi.

I dati di bilancio spesso presentano congiuntamente dati sui risultati del passato e sugli stanziamenti per un periodo futuro. In una tale presentazione, gli importi spesi negli anni precedenti su un particolare settore, sono utilizzati per informare su quanto dovrebbe essere assegnato per il prossimo periodo di programmazione finanziaria. Le informazioni di bilancio spesso si basano su stime e dati aggregati.

Diverse regioni riportano differenti tipi di informazioni di bilancio disponibili, tra cui: Dichiarazioni Pre-Budget, proposte di bilancio esecutivo, bilanci promulgati, e fondi stanziati per i cittadini (versioni semplificate di quote di bilancio a beneficio dei cittadini).

I dati di bilancio su OpenSpending includono:

* [Berlin Budget](http://openspending.org/berlin_de)

* [Seville Spending Budget](http://openspending.org/seville-budget)

**Prossimo** [<a href="../come-vengono-rappresentati-i-dati-su-openspending/">Come vengono rappresentati i dati su OpenSpending?</a>]

**Precedente** [<a href="../cose-openspending/">Cos'è OpenSpending</a>]
