---
section: help
lead: true
title: Creating a dataset on OpenSpending
authors:
- Neil Ashton
---
To begin sharing data on the OpenSpending platform, register on OpenSpending.org and create a new OpenSpending dataset. To create a dataset, simply fill in some metadata that characterizes your data and provide the URL where your data is hosted.

#### Creating a new dataset

Log in to OpenSpending.org with your user information, or register if you have not yet done so. You will arrive at the Dashboard, where you will see a blue button labeled **Import a Dataset**. Click this to begin creating a new OpenSpending dataset.

The next screen prompts you to provide metadata that characterizes your data. This includes the following fields:

* *Title*: a descriptive and meaningful name for the dataset. Can be any string.

* *Identifier*: a shorter title, used as part of the dataset's URL. Can only contain alphanumeric characters, dashes, and underscores – no whitespace or punctuation.

* *Category*: one of "Budget", "Expenditure", and "Other". See the guide section on types of financial data for details on these categories.

* *Currency*: the currency in which the spending described by the dataset takes place.

* *Countries*: a list of countries referenced in the dataset. Choice of countries is constrained by a list of valid countries.

* *Languages*: a list of languages used in the dataset. Choice of languages is constrained by a list of valid languages.

* *Description*: a characterization of the dataset in simple prose. Can be any string.

Fill in all of these fields. Be sure to include a Description which explains the origin of your dataset and acknowledges any changes you have introduced (for example, any cleaning you have done).

Once all metadata has been filled in, press **Next Step** to proceed.

#### Adding a new data source

Clicking through to the next step creates your new OpenSpending dataset and takes you to its *Manage* page. The Manage page is used to add data sources. It is also used to provide schematic information that allows OpenSpending to interpret the data, a process called "modelling" that will be covered in the next section of the guide.

To add a data source to a dataset, click **Add a source**. A prompt will appear, asking you for a URL. Provide the URL of the CSV file you published on the web in the previous section of the guide and click **Create**. You will see a blue text box indicating that OpenSpending is thinking about your data.

<a href="http://blog.openspending.org/files/2013/08/image_2-e1375888360807.png"><img src="http://blog.openspending.org/files/2013/08/image_2-e1375888360807.png" alt="image_2" width="600" height="228" class="alignnone size-full wp-image-582" /></a>

Click **Refresh** or simply use your browser's refresh button. If OpenSpending succeeded at analyzing your data, you should see a green text box telling you that your data is ready. You should also see a correct list of your CSV's columns.

<a href="http://blog.openspending.org/files/2013/08/image_3-e1375888381459.png"><img src="http://blog.openspending.org/files/2013/08/image_3-e1375888381459.png" alt="image_3" width="600" height="408" class="alignnone size-full wp-image-583" /></a>

Note that if you incorrectly provide OpenSpending with an HTML file instead of a valid CSV file, it will not complain but will simply try to analyze the HTML as if it were a CSV. The result looks like the following.

<a href="http://blog.openspending.org/files/2013/08/image_4-e1375888407751.png"><img src="http://blog.openspending.org/files/2013/08/image_4-e1375888407751.png" alt="image_4" width="600" height="234" class="alignnone size-full wp-image-584" /></a>

If you added a bad data source, don't worry. You do not have to use the source in your final dataset: OpenSpending requires you to do more work on a data source before it can be published. Simply add a new, correct source and forget about the bad one.

**Next**: [Modelling your data in OpenSpending](../modelling-data/)

**Up**: [OpenSpending Guide](../)
