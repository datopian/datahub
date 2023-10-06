---
section: help
lead: true
title: Modelling your data in OpenSpending
authors:
- Neil Ashton
---
To load data into OpenSpending, you must build a *model* of your data. A model specifies how your data translates into terms OpenSpending understands. OpenSpending represents the properties data in terms of *dimensions*. Modelling data consists of listing the dimensions you would like the target OpenSpending dataset to have and specifying how they relate to columns in the source data.

#### Mandatory dimensions: amount and time

Every model needs to have at least two dimensions: an amount and a time. These specify the size of the transaction and the time when the transaction took place. The amount and time are associated with special types of dimensions. An amount is represented by a *measure* dimension, and a time is represented by a *date*. Generic dimensions cannot represent these special values.

When modelling your data, it's not a bad idea to start with the mandatory dimensions. To begin, click the **Dimensions & Measures** tab within your dataset's **Manage the dataset** page.

<a href="http://blog.openspending.org/files/2013/08/image_5-e1375888673131.png"><img src="http://blog.openspending.org/files/2013/08/image_5-e1375888673131.png" alt="image_5" width="600" height="232" class="alignnone size-full wp-image-587" /></a>

Next, click **Add Dimension** to bring up the *Add new dimension* panel. Click the radio button labeled *Date*. You will see the *Name* box automatically fill with "time", as shown below. Click the green **Add** button.

<a href="http://blog.openspending.org/files/2013/08/image_6-e1375888703851.png"><img src="http://blog.openspending.org/files/2013/08/image_6-e1375888703851.png" alt="image_6" width="600" height="428" class="alignnone size-full wp-image-589" /></a>

The next screen you see will provide you some information about the meaning of time. In the drop-down box next to *Column:*, select the column of your data which represents the time value.

<a href="http://blog.openspending.org/files/2013/08/image_7-e1375888730762.png"><img src="http://blog.openspending.org/files/2013/08/image_7-e1375888730762.png" alt="image_7" width="600" height="257" class="alignnone size-full wp-image-590" /></a>

Once you identify the time column, click **Add Dimension** once again to add the amount. This time, select the radio button labeled *Measure*, which will automatically fill in the name "amount", and click **Add**. Choose the column representing the value of the transaction from the drop-down box next to *Column*.

#### The key and compound dimensions

Only one additional dimension is necessary to make the model sufficient: the dimension (or set of dimensions) whose value uniquely identifies each data point, the *key*.

A data point does not need to be identified by the value of a single column. It can be identified by the combination of several in a *compound dimension*. Because keys *can* be compound, the compound dimension type *must* be used to represent them, even if your particular key is not compound.

To add the key dimension, click **Add Dimension** and select the *Dimension* radio button. Enter a name for your key, such as "key", in the name box. Click **Add**. Check the box labeled *Include in unique key* to identify this dimension as part of your key.

Next, take a look at the list of **Fields**, which contains two rows labeled *name *and *label*. A compound dimension can contain an arbitrary number of *fields*, each of which has a name and a type and each of which can be associated with a column in your data. This is the sense in which these dimensions are "compound": they group multiple columns from the source data into a single property of the target dataset.

<a href="http://blog.openspending.org/files/2013/08/image_8-e1375888755790.png"><img src="http://blog.openspending.org/files/2013/08/image_8-e1375888755790.png" alt="image_8" width="600" height="378" class="alignnone size-full wp-image-591" /></a>

A compound dimension requires at least two fields, *name* and *label*, which must respectively be of type *id* and *string*. The dimension's name is used to provide it with a working URL, and the label is used to present it in the user interface.

To create a minimal compound dimension, simply associate the same column of the source data with both *name* and *label*. Choose the appropriate column for each and leave the default types unchanged.

#### Measures and other dimensions

With an amount, time, and key, your model is sufficiently rich. A really complete model, however, will include dimensions for every meaningful property of the source data. Following certain conventions makes this more convenient.

A common pattern in source data is spreading information that identifies entities – groups, accounts, and so on – across multiple columns. Information about an account associated with a transaction may be divided into an "Account" column with an identifying number and an "Account description" column with a verbal description, for example. "Head-account" and "Sub-account" in the image below exhibit this pattern.

<a href="{{ site.baseurl }}/img/blog/2013/08/image_9.png"><img src="{{ site.baseurl }}/img/blog/2013/08/image_9.png" alt="image_9" width="533" height="403" class="alignnone size-full wp-image-592" /></a>

OpenSpending's compound dimensions are designed to model this kind of scattered information. To do so, add a new compound dimension and associate each column to one of the dimension's fields. Try to match a human-readable column to *label* and a more terse column to *name*. In the image below, "Head-account" is matched to *name* and "Head-account description" to *label*.

<a href="http://blog.openspending.org/files/2013/08/image_10-e1375888789463.png"><img src="http://blog.openspending.org/files/2013/08/image_10-e1375888789463.png" alt="image_10" width="600" height="371" class="alignnone size-full wp-image-593" /></a>

Some columns of your data are more self-contained, representing particular attributes of each data point. A column which sorts each transaction into some category, for example, is of this type. In the image below, the Reporting Type, Revenue/Expenditure, and Recurrent/Investment columns are like this.

<a href="{{ site.baseurl }}/img/blog/2013/08/image_11.png"><img src="{{ site.baseurl }}/img/blog/2013/08/image_11.png" alt="image_11" width="609" height="378" class="alignnone size-full wp-image-594" /></a>

Self-contained columns specifying attributes or categories are best modeled with *attribute* dimensions. An attribute is essentially a dimension with only a single field, which may have any type. To create an attribute, simply select the *Attribute* radio button when adding a dimension.

<a href="http://blog.openspending.org/files/2013/08/image_12-e1375888823415.png"><img src="http://blog.openspending.org/files/2013/08/image_12-e1375888823415.png" alt="image_12" width="600" height="472" class="alignnone size-full wp-image-595" /></a>

#### Wrapping up: saving and loading

When every dimension has been specified and linked to columns in the source data, click **Save Dimensions** to save the model. If anything is wrong with the model, an error message will appear, prompting you to correct its parameters. Otherwise, a message will appear inviting you to return to the dashboard, where you can proceed to load your data.

Once the data has been loaded, the model you have created will be fixed and editing will be disabled. You may therefore wish to test the model before you load. To do this, click **Test a sample** in your data source's row in the dashboard. Wait a few seconds, then reload the page. If you see a message saying COMPLETE with a green background, your model is ready to go. If you see ERRORS, repairs are needed.

<a href="http://blog.openspending.org/files/2013/08/image_13-e1375888848457.png"><img src="http://blog.openspending.org/files/2013/08/image_13-e1375888848457.png" alt="image_13" width="600" height="279" class="alignnone size-full wp-image-596" /></a>

If your model is free of errors, click **Load** to load the source dataset and apply the model. You may then return to the dataset's home page by clicking its name at the top of the screen, where you can proceed to construct visualizations and otherwise play with your data.

**Next**: [Create a Visualization](../create-viz/)

**Up**: [OpenSpending Guide](../)
