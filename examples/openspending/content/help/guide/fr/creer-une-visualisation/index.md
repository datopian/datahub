---
section: help
lead: true
title: Créer une visualisation
authors:
- lombardoelisabetta
---
La plateforme OpenSpending permet de créer facilement des visualisations de données. Trois visualisations sont proposées: le BubbleTree, la TreeMap et la Table des agrégats.

Toutes les modélisations d’OpenSpending vous permettent de choisir une série de dimensions grâce auxquelles vous pouvez agréger vos données et les segmenter selon des propriétés de plus en plus précises. Chaque modélisation est créée de la même manière : en choisissant les dimensions à agréger et l’ordre dans lequel les segmenter.

Pour commencer à créer une modélisation, allez dans la page d’accueil du jeu de données et sélectionnez _**Create a visualisation**_ dans le menu _Visualization_.

###BubbleTree

Le BubbleTree est une visualisation interactive qui présente les données de dépense aggrégée sous forme de bulles. Chaque bulle représente un (sous-)total aggrégé. La bulle centrale représente la somme aggrégée et les bulles qui l’entourent représentent les autres sommes qui la composent. En cliquant sur n’importe quelle bulle, l’utilisation voit la manière dont la somme se divise en d’autres sous-totaux.

Pour créer un BubbleTree, choisissez les dimension d’agrégation et l’ordre dans lequel vous voulez les agréger. Choisissez la première dimension dans la liste déroulante Level. Vous verrez alors le total agrégé de cette dimension sous la forme de la bulle centrale, avec les valeurs des dimensions qui l’entourent et leurs propres totaux.

![Bumble Tree]({{ site.baseurl }}/img/blog/2013/08/image_14.png)

Pour ajouter un deuxième niveau, cliquez sur _**Add a level**_ et choisissez une nouvelle dimension. Les utilisateurs seront alors capables de cliquer sur les bulles pour les segmenter et voir comment les valeur du premier niveau se divisent dans les valeurs du second niveau.

![Bumble Tree]({{ site.baseurl }}/img/blog/2013/08/image_15.png)

###TreeMap

Le TreeMap représente les données de dépense agrégées sous forme de rectangle de couleur. Chaque rectangle représente un montant agrégé selon une dimension du jeu de données. Cliquer sur un rectangle permet d’explorer la répartition des sous-totaux suivant une autre dimension.

Pour créer un TreeMap, choisissez simplement les dimensions à agréger et leur niveau. En sélectionnant la dimension de premier niveau vous verrez apparaître la répartition des montants dans les rectangles suivant la dimension choisie.

![Tree Map]({{ site.baseurl }}/img/blog/2013/08/image_16.png)

Pour rendre la visualisation plus interactive, ajoutez des niveaux supplémentaires qui vous permettront d’explorer comment chaque montant se divise en sous-montants. Pour ajouter un second niveau, cliquez sur **Add a level** et choisissez une nouvelle dimension. Les utilisateurs peuvent désormais cliquer pour voir comment les montants se divisent.

![Visualisation interactive]({{ site.baseurl }}/img/blog/2013/08/image_17.png)

###Tableau d’agrégats

Le tableau d’agrégats est un simple tableau qui offre une vue des données numériques agrégées (additionnées) suivant la dimension choisie.

Sélectionnez une dimensions dans le menu _Columns_. Vous verrez alors apparâitre un tableau avec les montants et le pourcentage du montant total qu’ils représentent. Par défaut, les lignes sont triées par pourcentage décroissant.

![Tableau d’agrégats](http://blog.openspending.org/files/2013/08/image_18-e1375889043439.png)

En ajoutant une autre colonne en cliquant sur **Add a level**, le montant de la première colonne sera divisé en sous-totaux dans la seconde suivant la dimension sélectionnée. Notez que cette opération modifie les valeurs des pourcentages et donc l’ordre des lignes.

![Ajouter des colonnes](http://blog.openspending.org/files/2013/08/image_19-e1375889063736.png)

&nbsp;

**Suivant**:[<a href="../inclure-une-visualisation-sur-votre-site-web/">Inclure une visualisation sur votre site web</a>]

&nbsp;

**Précédent**: [<a href="../modeliser-vos-donnees-dans-openspending/">Modéliser vos données dans OpenSpending</a>]
