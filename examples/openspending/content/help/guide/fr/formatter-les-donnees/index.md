---
section: help
lead: true
title: Formatter les données
authors:
- lombardoelisabetta
---
OpenSpending suppose que les données soient fournies dans un seul format simple.

###Fichier CSV

OpenSpending accepte les données dans un seul type de format de fichier, le format CSV (Comma-Separated Values). Un fichier CSV est un fichier texte qui représente les données sous la forme d’un tableau, similaire à un format tableur. Dans un tableau, chaque entrée est représentée par une ligne, et chaque propriété de l’entrée est représentée par une colonne. Dans un fichier CSV, les lignes sont subdivisées en colonnes à l’aide de virgules.

Les fichiers CSV acceptés par OpenSpending sont “dénormalisés”: cela signifie qu’ils n’économisent pas d’espace en supprimant des valeurs redondantes. Ils doivent également être “rectangulaires”, c’est-à-dire qu’ils ont exactement le même nombre de colonnes pour chacune des lignes.

###Le format OpenSpending

Un fichier CSV doit avoir les caractéristiques suivantes pour OpenSpending.

1. Une ligne de titre. La première ligne du fichier CSV devrait contenir les noms des colonnes, séparés par des virgules.
2. Au moins 3 colonnes : un montant, une date (qui peut être juste une année), et le payeur ou le bénéficiaire (qui peut juste être le nom d’un compte).
3. Des colonnes homogènes. Chaque colonne doit toujours représenter un seul type de valeur pour toutes les lignes (Il ne peut y avoir, par exemple, de sous-division).
4. Les lignes sont des points de données. Chaque ligne ne doit contenir qu’un type de données : une transaction ou une ligne budgétaire (elles ne peuvent représenter plusieurs transactions)
5. Aucune ligne ou cellule vide. Chaque ligne d’un fichier devrait contenir toutes les informations requises afin de pouvoir construire l’objet résultant.
6. Pas de résultats aggrégés (exemple : sous total ou calculs à l’aide de formules). Ils seront calculés automatiquement par OpenSpending.
7. Un identifiant unique. Il doit y avoir une colonne ou une combinaison de colonnes permettant d’identifier chaque ligne. La méthode la plus simple pour créer un tel identifiant est de créer une colonne supplémentaire dans laquelle vous ajoutez un chiffre qui s’incrémente à chaque ligne. Vous pouvez le faire dans Excel en ajoutant les deux premiers chiffres de la série, sélectionnez les deux cellules, et faire glisser le coin droit de la seconde cellule tout en bas du jeu de données pour étendre automatiquement la série. Si le jeu de données a trop de colonnes pour un logiciel comme Excel, vous pouvez utiliser [mySQL.](http://stackoverflow.com/questions/16113570/how-to-add-new-column-to-mysql-table "mySQL")
8. Les dates dans le bon format. Les dates doivent toutes être dans le format “aaaa-mm-jj”
9. Les nombres dans le bon format. Les nombres doivent contenir uniquement des chiffres et éventuellement un point (pas une virgule) pour séparer les décimales (un nombre écrit “12,345.67” devrait être converti en “12345.67”).

La communauté OpenSpending a rassemblé des [exemples](https://drive.google.com/a/okfn.org/#folders/0B_dkMlz2NopEbmRoTExsMDFMR2M "exemples de formatage de données") afin d’illustrer les «bons» et les «mauvais» exemples de formatage de jeux de données.

Voici des exemples de jeux de données **mal formattés**:

* [Plusieurs transactions, une ligne](https://docs.google.com/a/okfn.org/spreadsheet/ccc?key=0AvdkMlz2NopEdG5kR0kzQ0E5V3BuTS16MndBT3dMdEE#gid=0 "Plusieurs transactions, une ligne") (plusieurs années sur une seule entrée)
* [Format de chiffre incorrect](https://docs.google.com/a/okfn.org/spreadsheet/ccc?key=0AvdkMlz2NopEdEo1Y2p2R0VvdnJvRXMwUVREbHRoLXc#gid=0 "Format de chiffre incorrect") (les chiffres contiennent des virgules pour la lisibilité)

Voici des exemples de **bons** jeux de données:

* [Washington, DC](https://docs.google.com/a/okfn.org/spreadsheet/ccc?key=0AvdkMlz2NopEdDhrZnRkWl9ZX2ZZNVptTzdueWw3emc#gid=0 "Données de dépenses de la ville de Washington D.C.") (données de dépenses)
* [Minsk, Biélorussie](https://docs.google.com/a/okfn.org/spreadsheet/ccc?key=0AvdkMlz2NopEdEtIMFlEVDZXOWdDUEthUTQ0c21aV2c#gid=0 "Données budgétaires de la ville de Minsk") (données budgétaires)

&nbsp;

**Suivant**:[<a href="../publier-les-donnees-sur-le-web/">Publier les données sur le web</a>]

&nbsp;

**Précédent**: [<a href="../rassembler-les-donnees/">Rassembler les données</a>]
