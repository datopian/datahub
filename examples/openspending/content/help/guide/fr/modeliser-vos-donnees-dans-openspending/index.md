---
section: help
lead: true
title: Modéliser vos données dans OpenSpending
authors:
- lombardoelisabetta
---
Pour charger vos données dans OpenSpending, vous devez construire un modèle de vos données. Un modèle définie comment les données seront comprises par OpenSpending. L’application représente les propriétés des données en termes de _dimensions_. Modéliser les données consiste à lister les dimensions que vous souhaitez inclure dans le jeu de données OpenSpending et définir pour chaque dimension la ou les colonnes correspondantes dans le jeu de données d’origine.

###Dimensions obligatoires : montant et date

Chaque modèle nécessite au moins deux dimensions : un montant et une date. Elles spécifient la taille de la transaction et le moment de sa réalisation. Le montant et la date sont associés à des indicateurs spécifiques. Le montant est représenté par un indicateur de mesure et le temps est représenté par une date. Des dimensions génériques ne peuvent pas représenter ces valeurs particulières.

Lorsque vous modélisez vos données, ce n’est pas une mauvaise idée de commencer par les dimensions obligatoires. Tout d’abord, cliquez sur le menu _**Dimensions &amp; Measures**_ au sein de la page _**Manage the dataset**_ de votre jeu de données.

![Dimensions obligatoires](http://blog.openspending.org/files/2013/08/image_5-e1375888673131.png)

Après, cliquez sur _**Add Dimension**_ pour faire apparaître le panneau _Add new dimension_. Cliquez sur la case correspondant à _Date_. Vous verrez la fenêtre _Name_ automatiquement complétée avec la date, comme ci-dessous. Cliquez sur le bouton vert _**Add**_.

![Ajouter une nouvelle dimension](http://blog.openspending.org/files/2013/08/image_6-e1375888703851.png)

Le prochain écran que vous verrez vous donnera des informations sur la signification du temps. Dans la liste déroulante à coté de _Column_, sélectionnez la colonne de vos données qui représentera la valeur du temps.

![Temps](http://blog.openspending.org/files/2013/08/image_7-e1375888730762.png)

Quand vous avez identifié la colonne du temps, cliquez sur _**Add Dimension**_ encore une fois pour ajouter le montant. Cette fois-ci, sélectionnez la case correspondant à _Measure_, qui sera automatiquement complétée sous le nom “montant” et cliquez sur _**Add**_. Choisissez la colonne représentant la valeur de la transaction dans la liste déroulante à côté de _Column_.

###Autre dimension indispensable: l’identifiant

Il y a une autre dimension nécessaire au fonctionnement du modèle: la dimension (ou groupe de dimensions) dont la valeur identifie de manière unique chaque entrée de données, la clé.

Une entrée peut être identifiée aussi par une combinaison de plusieurs colonnes, une _dimension composée_. Étant donné que les clés peuvent être composées, le type “dimension composée” doit être utilisé pour les répresenter, même si votre clé en l’occurrence n’est pas composée.

La dimension clée peut être assignée en cliquant sur **Add Dimension** et ensuite en sélectionnant le bouton radio _Dimension_.

Ajoutez le nom de votre clé, par exemple “clé”, dans la case appropriée. Cliquez sur **Add**. Cochez la case _include in unique_ afin d’identifier cette dimension en tant que partie de votre clé.

On passe maintenant à la liste de **Fields**, qui contient deux rangées nommées _name_ (nom) et _label_ (étiquette). Une dimension composée peut contenir un nombre arbitraire de champs _(fields)_, chacun ayant un nom et un type et pouvant être associé à une colonne dans vos données. Cela nous permet d’expliquer le sens du mot “composé” dans ce contexte: les dimensions sont “composées” car elles regroupent plusieurs colonnes de données dans une seule propriété du jeu de données.

![Dimensions composées](http://blog.openspending.org/files/2013/08/image_8-e1375888755790.png)

Une dimension composée nécessite au moins deux champs, _name_ et _label_. Ces derniers doivent être de type _id_ et _string_. Le nom de la dimension est utilisé afin de fournir à cette dernière une URL opérationnelle et l’étiquette _(label)_ est utilisée pour présenter la dimension au sein de l’interface.

Pour créer une dimension composée minimale, il suffit d’associer la même colonne de vos données d’origine avec le nom _(name)_ et l’étiquette _(label)_. Choisissez la colonne appropriée pour chacun et laissez les options sous “types” unchangées.

###Mesures et autres dimensions

Avec un montant, une date et un identifiant, votre modèle est suffisamment riche. Toutefois, un modèle parfaitement abouti devrait inclure une dimension pour chaque caractéristique importante du jeu de données d’origine. Suivre certaines conventions est alors utile.

Une pratique courante dans la présentation des jeux de données d’origine est la segmentation de l’information qui caractérise chaque donnée sur de multiples colonnes. L’information concernant un compte associé à une transaction peut être réparti entre une colonne “Compte” qui identifie le montant chiffré et une colonne “Description du compte” qui donne une description écrite. L’image ci-dessous illustre cette pratique avec les colonne “Head-account” et “Sub-account”.

![Head-accounts et sub-accounts]({{ site.baseurl }}/img/blog/2013/08/image_9.png)

Les dimensions composées d’OpenSpending sont conçues pour modéliser ce type d’informations éparpillées. Pour ce faire, ajoutez une nouvelle dimension composée et associez chaque colonne à l’un des champs de la dimension. Essayez de faire correspondre une colonne aux commentaires très détaillés à label et une colonne plus concise à _name_. Dans l’image ci-dessous “Head-account” correspond à _name_ et “Head-account description” à _label_.

![Head-account](http://blog.openspending.org/files/2013/08/image_10-e1375888789463.png)

Certaines colonnes de votre base de données sont plus indépendantes, représentant certaines propriétés particulières de chaque donnée. Par exemple, une colonne qui attribue à chaque transaction une catégorie rentre dans ce cadre. Dans l’image ci-dessous, les colonnes _Reporting Type_, _Revenue/Expenditure_ et _Recurrent/Investment_ sont de ce type.

![Propriétés des données]({{ site.baseurl }}/img/blog/2013/08/image_11.png)

Les colonnes indépendantes qui spécifient des propriétés ou des catégories sont mieux modélisées avec des dimensions d’attribut. Un attribut est essentiellement une dimension qui ne connaît qu’un seul champ, quel que soit son type. Pour créer un attribut, sélectionnez simplement la case _Attribute_ quand vous ajoutez une dimension.

![Attribute](http://blog.openspending.org/files/2013/08/image_12-e1375888823415.png)

###Pour finir : sauvegarder et charger

Lorsque chaque dimension a été spécifiée et reliée aux colonnes dans les données source, cliquez sur **Save Dimensions** pour sauvegarder votre modèle. En cas d’erreurs, un message apparaîtra, vous demandant de corriger certains paramètres. S’il n’y a pas d’erreurs, vous serez rédirigé vers le Dashboard, où vous pourrez charger vos données.

Une fois que les données ont été téléchargées, le modèle que vous avez créé sera figé et vous n’aurez plus la possibilité de l’éditer. C’est pourquoi il est préférable de tester le modèle avant de télécharger les données. Pour ce faire, cliquez sur **Test a sample** dans votre tableau de sources de données. Attendez quelques secondes et rechargez la page. Si vous voyez un message indiquant COMPLETE sur un fond vert, alors votre modèle est prêt. Si vous voyez un message indiquant ERRORS, des corrections sont nécessaires.

![Sauvegarder et charger](http://blog.openspending.org/files/2013/08/image_13-e1375888848457.png)

Si votre modèle ne contient plus d’erreurs, cliquez sur **Load** pour charger le jeu de données source et lui appliquer le modèle. Vous pouvez ensuite retourner sur la page d’accueil du jeu de données en cliquant sur son nom en haut de l’écran et créer des visualisations ou explorer le jeu de données.

&nbsp;

**Suivant**:[<a href="../creer-une-visualisation/">Créer une visualisation</a>]

&nbsp;

**Précédent**: [<a href="../creer-un-jeu-de-donnees-sur-openspending/">Créer un jeu de données sur OpenSpending</a>]
