---
redirect_from: /2013/11/linkedspending-openspending-becomes-linked-open-data/
title: 'LinkedSpending: OpenSpending becomes Linked Open Data'
authors:
- Anders Pedersen
---
![Image by the Linkedspending Project](http://linkedspending.aksw.org/extensions/page/page/img/rdfdatacube_shrinked.png)

The LinkedSpending project converts the OpenSpending data to RDF and publishes the resulting data. This data is represented in the RDF Data Cube format and is freely available and openly licensed.

## Conversion
All of the OpenSpending datasets describe observations referring to a specific point or period in time and thus undergo only minor changes.
New datasets however, are frequently added. Because of this, the huge number of datasets and their size, an automatic, repeatable transformation is required.
This is realized by an [open source Java application](https://github.com/AKSW/openspending2rdf) which fetches a list of datasets on execution and only transforms the ones who are not transformed yet. Datasets are downloaded as JSON over the OpenSpending API and are cached to prevent unnecessary traffic.

For each class used by LinkedSpending, there is a mapping at which URL the information used to create the instances of those classes is found. Because the source data adheres to the data cube model, a conversion of the data to RDF needs an appropriate RDF vocabulary. The RDF DataCube vocabulary, i.e.an RDF variant of the data cube model, is an ideal fit for the transformed data.

## Publishing

LinkedSpending data is published using [an instance](http://linkedspending.aksw.org) of the [OntoWiki](http://aksw.org/Projects/OntoWiki.html) which is a Wiki for Semantic Information.Depending on the actor and the needs, OntoWiki provides various abilities to gather the published RDF data as described as follows.
The data can be explored by viewing the properties of a resource, its values and by following links to other resources. Using the [SPARQL endpoint](http://linkedspending.aksw.org/sparql), actors are able to satisfy complex information needs {% raw %}<a href="http://linkedspending.aksw.org/sparql?default-graph-uri=&query=select+distinct+%3Fdate+{%3Fo+a+qb%3AObservation.+%3Fo+qb%3AdataSet+ls%3Ade-bund.+%3Fo+lso%3ArefDate+%3Fdate.+FILTER+%28xsd%3Adate%28%3Fdate%29+%3E%3D+%222020-1-1%22^^xsd%3Adate%29+}&format=text%2Fhtml&timeout=0&debug=on">(example query)</a>.{% endraw %}
Faceted search offers a selection of values for certain properties and thus slice and dice of the dataset according to the interests on the fly.

## Usage Scenarios
Apart from the information needs that can already be satisfied using the source data, there are usage scenarios that are easier or only possible with LinkedSpending.

### Economic Analysis
LinkedSpending is represented in Linked Open Data which facilitates data integration.
Currencies and countries from DBpedia and LinkedGeoData, respectively, are already integrated.
This allows to create SPARQL queries for information needs such as "which datasets use currencies whose inflation rates are greater than 10 %".

### Finding and Comparing Relevant Datasets
Government spending amounts are often much higher than the sums ordinary people are used to dealing with but even for policy makers it is hard to understand, if a certain amount of money spent is too high or normal.
Comparing datasets and finding those which are similar to another one helps separating common values from outliers which should be further investigated. For example, if another country has a similar budget structure but spends way less on healthcare with a similar health level.

## Future Work
The improvement of LinkedSpending will be the task of a software engineering internship group which is part of the bachelor degree program at our University. OntoWiki is developed in research group. Some of the plans are:

- analyze the data quality
- integrate LinkedSpending with further datasets
- improve faceted search and visualization

## Contact

LinkedSpending is a project of the research group "Agile Knowledge Engineering and Semantic Web" (AKSW) which is hosted by the Chair of Business Information Systems (BIS) of the Institute of Computer Science (IfI) / University of Leipzig as well as the Institute for Applied Informatics (InfAI).  Please see the [paper draft](http://svn.aksw.org/papers/2013/openspending2rdf/public.pdf) for further details or [contact us](mailto:hoeffner@informatik.uni-leipzig.de).
