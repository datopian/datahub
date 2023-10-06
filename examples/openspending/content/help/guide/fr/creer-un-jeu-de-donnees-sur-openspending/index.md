---
section: help
lead: true
title: Créer un jeu de données sur OpenSpending
authors:
- lombardoelisabetta
---
Pour pouvoir partager vos données sur OpenSpending, vous devez d’abord vous enregistrer sur le site OpenSpending.org. Pour créer un jeu de données, il vous suffira ensuite d’indiquer ses métadonnées et son URL.

###Créer un nouveau jeu de données

Connectez-vous sur OpenSpending avec vos informations d’utilisateur. Vous serez ensuite redirigé vers le Dashboard. Cliquez sur le bouton **Import a Dataset** pour créer un nouveau jeu de données.

L’écran suivant vous invite à fournir les métadonnées qui définissent votre jeu de données. Voici les informations demandées :

* _Title_ (Titre): une description et un nom explicite pour le jeu de données.
* _Identifier_ (Identifiant): un titre court, utilisé dans l’URL du jeu de données. L’identifiant peut contenir uniquement des caractères alphanumériques, des tirets, et des traits bas – ni espace blanc ni signe de ponctuation.
* _Category_ (Catégorie): pouvant être “Budget” (Budget), “Expenditure” (Dépense) ou “Other” (Autres). Référez-vous aux types de données financières pour des détails sur ces catégories.
* _Currency_ (devise): la devise utilisée pour les montants dans le jeu de données.
* _Countries_ (Pays): une liste de pays référencés dans le jeu de données. Le choix des pays est contraint à une liste de pays valides.
* _Languages_ (Langue): une liste des langues utilisées dans le jeu de données. Le choix des langues est contraint par une liste de langues valides.
* _Description_ (Description): une définition du jeu de données en langage simple.

Remplissez ces champs. Assurez-vous d’inclure une description qui explique l’origine de votre jeu de données et les modifications apportées (par exemple que le jeu de données a été nettoyé).

Dès que toutes les métadonnées ont été renseignées, cliquez sur **Next Step** pour continuer.

###Ajouter une nouvelle source de données

L’étape suivante vous emmène sur la page _Manage_ (Gestion). La page _Manage_ est utilisée pour ajouter la source du jeu de données. Elle est aussi utilisée pour créer le modèle de schéma de données qui permet à OpenSpending d’interpréter les informations. Cette étape, dénomée _modelling_ (modélisation) est expliquée en détail dans la section suivante du guide.

Pour ajouter une source de données à un jeu de données, cliquez sur **Add a source**. Une fenêtre apparaît vous demandant d’entrer une URL. Indiquez l’URL du fichier CSV que vous avez précédemment publié sur le web comme indiqué dans la section précédente du guide et cliquez sur _**Create**_. Vous verrez alors une fenêtre bleue indiquant qu’OpenSpending est en train d’examiner les données.

![Ajouter des données étape 1](http://blog.openspending.org/files/2013/08/image_2-e1375888360807.png)

Cliquez sur _**Refresh**_ ou utilisez le bouton de rafraîchissement de votre navigateur. Si OpenSpending parvient à analyser vos données, vous verrez alors un message vert vous disant que les données sont prêtes. Vous devriez également voir une liste correcte des colonnes de votre CSV.

![Ajouter des données étape 2](http://blog.openspending.org/files/2013/08/image_3-e1375888381459.png)

Notez que si vous fournissez à OpenSpending un fichier HTML à la place d’un fichier CSV, l’application analysera quand même le HTML comme si c’était un CSV. Le résultat ressemblera à cela:

![Ajouter des données étape 3](http://blog.openspending.org/files/2013/08/image_4-e1375888407751.png)

Si vous avez ajouté une mauvaise source, ce n’est pas grave. Vous n’avez pas à utiliser cette source pour votre jeu de données final. OpenSpending demande un travail supplémentaire sur les données avant de pouvoir les publier. Ajoutez alors simplement la source correcte, et oubliez l’autre source.

&nbsp;

**Suivant**:[<a href="../modeliser-vos-donnees-dans-openspending/">Modéliser vos données dans OpenSpending</a>]

&nbsp;

**Précédent**: [<a href="../publier-les-donnees-sur-le-web/">Publier les données sur le web</a>]
