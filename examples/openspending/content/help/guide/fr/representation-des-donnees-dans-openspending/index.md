---
section: help
lead: true
title: Représentation des données dans OpenSpending
authors:
- lombardoelisabetta
---
OpenSpending contient une collection de jeux de données, dont chacun provient d’une source différente. Dans un jeu de données, chaque transaction est représentée par une liste d’entrées (ou attributs). Chaque jeu de données a son propre modèle de structure de données. Un modèle décrit les propriétés d’un jeu de données en termes de dimensions.

###Jeu de données

L’unité de base dans OpenSpending est le jeu de données. Les données financières partageant un sujet commun (un budget pour une ville, le budget d’une année) sont regroupées ensemble et enregistrées dans un jeu de données. Un jeu de données est une collection d’ «entrées», et chaque entrée représente une transaction unique associée à un montant et à une date.

Un jeu de données inclut également des métadonnées pour décrire son contenu. Les métadonnées contiennent une description du jeu de données, des informations sur la source des données, et d’autres informations qui peuvent aider l’utilisateur à trouver et interpréter le contenu de ce jeu de données.

###Modèle

Le créateur d’un jeu de données a la maîtrise compléte sur la structure du jeu de données. Cette structure est créée en définissant un modèle qui est composé de dimensions.

Une dimension est une propriété qui définit une entrée du jeu de données. En considérant qu’un jeu de données est un tableau, les dimensions peuvent alors être assimilées aux colonnes. Cependant, une dimension peut avoir une structure plus complexe qu’une seule colonne.

Les dimensions sont de différentes natures. La plus importante étant celle de type _**measure**_ (montant). Une _measure_ est une dimension qui contient une valeur numérique. Une autre dimension importante est celle de type _**time_** (temps), qui représente la date et l’heure. Chaque entrée nécessite au moins une dimension _measure_ et une dimension _time_, représentant respectivement le montant et la date d’une transaction.

Les autres dimensions sont utilisées pour représenter d’autres propriétés du jeu de données, telles que le numéro de la transaction, le type de la transaction, le nom de l’administration et le nom de la société ou l’individu impliqué. Ces dimensions incluent des _**attributes**_ (attributs), qui contiennent une valeur unique, et les _**compound dimensions**_ (dimensions composées), qui peuvent contenir plusieurs valeurs. Les dimensions composées peuvent être utiles lorsqu’une propriété est définie par plusieurs autres propriétés.

&nbsp;

**Suivant**:[<a href="../ajouter-des-donnees-dans-openspending/">Ajouter des données dans OpenSpending</a>]

&nbsp;

**Précédent**: [<a href="../quels-types-de-donnees-financieres-peut-on-ajouter-dans-openspending/">Quels types de données financières peut-on ajouter dans OpenSpending?</a>]
