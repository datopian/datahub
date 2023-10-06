---
section: help
lead: true
title: Quels types de données financières peut-on ajouter dans OpenSpending?
authors:
- lombardoelisabetta
---
OpenSpending est très flexible et admet de nombreux type de données financières. Et si le projet OpenSpending s’intéresse en particulier aux données financières des gouvernements, cela n’est pas une limitation technique. OpenSpending supporte ainsi n’importe quel jeu de données contenant une liste de transactions associées à une quantité monétaire et à une date.

La plupart des données actuellement hébergées sur OpenSpending sont des données budgétaires ou bien des données transactionnelles. La principale différence entre ces deux types de données est leur granularité. Les données transactionnelles portent sur des transactions uniques réalisées, alors que les données budgétaires sont des données de dépenses aggrégées par catégories.

###Les données de transactions financières

Les données transactionnelles, ou plus simplement les “données de dépense”, renseignent sur les transactions financières. Chaque paiement d’une entité à une autre entité pour une date donnée et avec un objet particulier (un projet, un service, etc.) est alors renseigné.

Les informations agrégées (ex: un sous-total de transactions) ne devraient pas être incluses dans les données de transactions. Les données qui ont été partiellement ou complétement agrégées ne peuvent pas être analysées de la même manière et devraient donc être traitées comme des données budgétaires plutôt que comme des données transactionnelles. En revanche, si plusieurs paiements ont été effectués à différentes dates pour régler une même dépense, ceux-ci devraient pouvoir être agrégés pour représenter une transaction unique.

Exemples de données transactionnelles sur OpenSpending:

* [Contrats publics Washington D.C.](http://openspending.org/dc-vendors-contractors/ "Contrats publics Washington D.C.")
* [Agence de Développement Autrichienne.](http://openspending.org/ada/ "Agence de Développement Autrichienne")

Un autre type de données concerne les marchés publics. Les données sur les marchés publics informent sur l’objet du marché, le montant du marché, et qui a remporté le marché. Les données des marchés publics peuvent être considérées comme un sous-type de données transactionnelles (dans le cas où il s’agit d’un marché réalisé).

Exemples de données sur les marchés publics sur OpenSpending:

* [Marchés publics au Sénégal.](http://openspending.org/marches-publics-senegal/views/liste-des-attributaires "Marchés publics au Sénégal")
* [Marchés publics France 2011.](http://openspending.org/marches-publics-france-2011 "Marchés publics France 2011")

###Les données budgétaires

Pour les données budgétaires, les dépenses et les recettes sont agrégées par catégories. L’objectif de ces aggrégations est d’aider le lecteur à comprendre le budget, qui est habituellement un document de politique publique utilisé pour donner au lecteur un aperçu des choix financiers les plus importants du gouvernement. Les fonds alloués sont habituellement structurés en fonction de secteurs plutôt qu’en fonction des actuels bénéficiaires.

Les données budgétaires présentent généralement à la fois les recettes et dépenses passées et le budget prévisionnel. Ainsi, les montants des dépenses pour les années précédentes dans un secteur particulier donnent une indication sur les fonds qui devrait être attribués pour la période suivante. Les données budgétaires sont en général composées de données agrégées et d’estimations statistiques.

Les pays publient différents types d’informations budgétaires, incluant : le pré-budget, la proposition de budget (projet de loi de Finance), le budget ratifié, et le budget citoyen (qui est une version simplifiée du budget pour une meilleure compréhension par les citoyens).

Des exemples de données budgétaires sur OpenSpending:

* [Budget de la ville de Berlin.](http://openspending.org/berlin_de "Budget de la ville de Berlin")
* [Budget de la ville de Séville.](http://openspending.org/seville-budget "Budget de la ville de Séville")

&nbsp;

**Suivant**:[<a href="../representation-des-donnees-dans-openspending/">Représentation des données dans OpenSpending</a>]

&nbsp;

**Précédent**: [<a href="../quest-ce-que-openspending/">Qu’est ce que OpenSpending?</a>]
