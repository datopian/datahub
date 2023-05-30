---
section: help
lead: true
title: Create a Visualization
authors:
- Neil Ashton
---
The OpenSpending platform makes it easy to create and embed visualizations of datasets. Three types of visualizations are supported: BubbleTree, TreeMap, and Table of Aggregates.
All OpenSpending visualizations allow you to choose a series of dimensions along which to aggregate your data, drilling down into finer and finer detail. Each visualization is created the same way: by choosing the dimensions to aggregate and the order in which to drill down.
To start creating a visualization, go to a dataset's home page and select **Create a visualization** from the *Visualizations* menu.

#### BubbleTree

The BubbleTree is an interactive visualization that presents aggregated spending data as a circle of bubbles. Each bubble represents an aggregated (sub-)total. The central bubble represents an aggregated sum, and its surrounding bubbles represent the other sums that it is made of. By clicking on any bubble, the user is shown how the sum breaks down into further sub-totals.

To create a BubbleTree, choose the dimensions to aggregate and the order in which to aggregate them. Choose the primary dimension from the *Level* drop-down menu. You will see the aggregated total of that dimension as the central bubble, with values of the dimension surrounding it with their own totals.

<a href="{{ site.baseurl }}/img/blog/2013/08/image_14.png"><img src="{{ site.baseurl }}/img/blog/2013/08/image_14.png" alt="image_14" width="478" height="553" class="alignnone size-full wp-image-598" /></a>

To add a second level, click **Add a level** and choose a new dimension. Users will now be able to click on bubbles to "drill down" and see how the values of the first level break down into values on the second level.

<a href="{{ site.baseurl }}/img/blog/2013/08/image_15.png"><img src="{{ site.baseurl }}/img/blog/2013/08/image_15.png" alt="image_15" width="473" height="564" class="alignnone size-full wp-image-599" /></a>

#### TreeMap

The TreeMap presents aggregated spending data as an interactive rectangle of coloured tiles. Each tile represents aggregated values for a particular dimension of the data. Clicking on the tile "zooms in" to show how it breaks down along further aggregated dimensions.

To create a TreeMap, simply choose the dimensions to aggregate and their order. Select the primary dimension from the *Tile* menu. You will see a TreeMap showing how the total spending breaks down across that dimension.

<a href="{{ site.baseurl }}/img/blog/2013/08/image_16.png"><img src="{{ site.baseurl }}/img/blog/2013/08/image_16.png" alt="image_16" width="475" height="543" class="alignnone size-full wp-image-600" /></a>

The visualization has no useful interactivity yet. Adding further tile levels allows you to drill down to see how aggregated values decompose into smaller aggregates. To add a second level of tiles, click **Add a level** and choose a new dimension. Users can now click tiles to see how their totals break down.

<a href="{{ site.baseurl }}/img/blog/2013/08/image_17.png"><img src="{{ site.baseurl }}/img/blog/2013/08/image_17.png" alt="image_17" width="475" height="561" class="alignnone size-full wp-image-601" /></a>

#### Table of Aggregates

The Table of Aggregates is a simple tabular view of a dataset that aggregates totals across chosen dimensions. A Table of Aggregates is specified by choosing dimensions for its columns.

Choosing a primary dimension via the *Columns* menu will display the data in tabular form, with aggregated amounts and percentages of the overall total. By default, the rows will be sorted by percentage.

<a href="http://blog.openspending.org/files/2013/08/image_18-e1375889043439.png"><img src="http://blog.openspending.org/files/2013/08/image_18-e1375889043439.png" alt="image_18" width="600" height="458" class="alignnone size-full wp-image-602" /></a>

Adding another column by clicking **Add a level** will break down each subtotal in the first column by the aggregated sums of the new column. Note that this generally changes the percentage values and thus rearranges rows.

<a href="http://blog.openspending.org/files/2013/08/image_19-e1375889063736.png"><img src="http://blog.openspending.org/files/2013/08/image_19-e1375889063736.png" alt="image_19" width="600" height="530" class="alignnone size-full wp-image-603" /></a>

**Next**: [Embed a visualisation into your website](../embed-viz)

**Up**: [OpenSpending Guide](../)
