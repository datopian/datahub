---
redirect_from: /2013/12/processing-data-for-open-spending/
title: Processing data for Open Spending
authors:
- Olaf Veerman
---
*[Flipside](http://flipside.org/) is a Lisbon-based web development agency that recently added over 380,000 non-bid contracts from the Portuguese government to OpenSpending. This guest post by [Daniel Silva](https://twitter.com/danielfdsilva) describes how it was done.*

Even though the data on non-bid expenditures from the Portuguese government is already publicly available on [Base.gov.pt](http://www.base.gov.pt), data on OpenSpending is much more accessible. People can explore and browse the set in the browser or use the API to create visualizations or other insights. You can find the [Portuguese contract data on OpenSpending here][os-data].

[os-data]: https://openspending.org/pt_ajustes-diretos

## Processing the data

To prepare the data for import, we used Python to process its files, with one JSON document per line, and turned the data into a CSV. The most important things the script handles are:

- all dates are formatted to `yyyy-mm-dd`
- whenever the `signing date` is empty, the field is populated with the `publication date` (Openspending discards any row with empty cells)
- the fields containing amounts are stripped of the Euro sign and the thousand-separator, and the decimal mark is set to `.`
- the CPV code is split from its description
- multiple locations are split with a pipe
- multiple contracting or contracted entities are combined in one new entity.

You can check the code for yourself on [the processor's Github repository](https://github.com/flipside-org/ajustes-processor).

### Multiple contracting or contracted entities

OpenSpending doesn't support multiple contracting or contracted entities for one record. The format used for importing is CSV, and since it has a flat structure, it doesn't allow multidimensional values. 

To solve this problem, we have two options:

- Split the contracting and contracted entities, creating a contract for each one and dividing the total amount by the number of entities. This would lead to several duplicate contracts and erroneous amounts, since not every contracted company will be paid the same.
- Keep one single contract and merge the entities. The problem with this approach is that analysis of relationships between entities becomes more difficult.  

We chose the latter approach so the contract maintains its integrity. Users that want to further analyse the dataset will always be able to preprocess the data and split entities before doing so.

## Creating the model

Besides preparing the CSV file for import, OpenSpending also requires people to create a model for the dataset. We decided to add as much information as possible, even though we were forced to leave out some potentially interesting data regarding amounts actually spent. Since not all contracts contain these amounts and OpenSpending discards rows with empty dates or floats, we decided to not include them in the model just yet. You can [check the model](https://openspending.org/pt_ajustes-diretos/model.json) on openspending.org.

