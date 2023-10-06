---
section: help
lead: true
title: Come vengono Rappresentati i dati su OpenSpending
authors:
- stefanobandera
---
OpenSpending mantiene una collezione di dataset, ciascuna delle quali rappresenta un insieme di dati derivanti da una sorgente separata. All'interno di ogni set di dati, le transazioni individuali sono rappresentate da un insieme di voci. Ogni set di dati ha un modello proprio che mappa la struttura dei dati stessi. Il modello codifica le proprietà di ogni set in termini di dimensioni.

#### Dataset

L'unità di base del sistema OpenSpending è il dataset. Le transazioni finanziarie che condividono un tema comune (ad esempio, la spesa di una particolare città, un bilancio per un determinato anno) vengono raggruppate e memorizzate come un set di dati. Un dataset è una raccolta di "voci", e ogni voce rappresenta una singola transazione associata ad una quantità di soldi e ad un periodo di tempo.

### Modelli

La struttura di ogni dataset dipende completamente dal suo creatore. Questa struttura viene creata specificando un modello che fornisce le dimensioni lungo le quali i vari item possono differire l'uno dall'altro.

Un modello consiste in un insieme di dimensioni. Una dimensione è una proprietà che potenzialmente differenzia una voce da un’ altra. Se pensate ad un dataset come un foglio di calcolo, ciascuna dimensione può essere pensata come una colonna. Tuttavia le dimensioni possono avere più struttura di una normale colonna del foglio di calcolo.

Le dimensioni sono di diversi tipi. La più importante è il tipo di misura. Le misure sono dimensioni che possono contenere un singolo valore numerico. Un' altra importante tipologia di dimensione è il tempo, che rappresenta date e orari. Ogni dato necessita di almeno una misura e una dimensione di tempo, che rappresentano rispettivamente la quantità di denaro presente nella transazione e il momento in cui ha avuto luogo.

Le rimanenti tipologie di dimensioni sono utilizzate per rappresentare altre proprietà che gli item potrebbero avere, ad esempio: numeri di transazione, etichette provenienti da uno schema di classificazione,, oppure i nomi delle persone o le società coinvolte. Tali dimensioni comprendono gli attributi, che possono contenere un singolo valore, e le dimensioni composte, che possono contenere un insieme nidificato di valori. Le dimensioni composte sono utili quando una proprietà include diverse sotto-proprietà che potrebbero essere utilizzate per aggregare i dati.

**Prossimo** [<a href="../aggiungere-dati-ad-openspending/">Aggiungere dati ad OpenSpending</a>]

**Precedente** [<a href="../quali-tipi-di-dati-finanziari-entrano-in-openspending/">Quali tipi di dati finanziari entrano in OpenSpending?]</a>
