---
redirect_from: /2013/09/visualizing-data/
title: Visualizing Data in OpenSpending
authors:
- Michael Bauer
---
*This post is cross-posted from the [PBS Idea Lab Blog](http://www.pbs.org/idealab/2013/09/how-to-visualize-data-with-openspending/).*

OpenSpending is a database, analysis, and visualization tool for budget- and expenditure-related data. It acts as a data warehouse, giving you access access to budgetary data from around the world.

One of OpenSpending's most commonly used features is its ability to easily visualize budgets in two different formats. In this tutorial, we will use data from the World Bank's BOOST portal and visualize it using OpenSpending.

#### What you’ll need

We'll use these tools:

* [Open Refine](http://openrefine.org) - for converting the data

* Mozilla Firefox or Google Chrome (Refine requires a browser, and it doesn’t work well with Internet Explorer)

#### Obtaining the data from World Bank's BOOST portal

The World Bank's BOOST portal aims at providing insight into the way countries spend their money. They have done this for World Bank grants in Kenya with the portal [kenya.wb-boost.org](http://kenya.wb-boost.org). In this tutorial, we’ll use this data and visualize it using OpenSpending.

The first step in the process is downloading the data from the World Bank's BOOST platform.

##### Walkthrough: downloading data from the BOOST platform

1. Open [kenya.wb-boost.org](http://kenya.wb-boost.org) in your browser.

2. It defaults to a map view, which is not optimal for our purposes. Switch to the pivot table view of the tool by clicking on the "pivot table" tab.

    ![image alt text](http://i.imgur.com/BENYBVR.png)

4. The table view is initially empty because the system does not know how to aggregate information.

    On the left, there are the options for the data we want to have shown. Add more groups to the selection to allow for a finer picture. Do so by dragging them from the "Group Rows" box into the "Selected Groups" box.

    We want to have:

    1. Top-level spending Unit
    2. Expenditure type
    3. Sector
    4. Economic Category
    5. Sub-Economic Category

    When you have these, click on the "Build Table" button in the middle of the grey area. This will take a while.

9. Now download the data with the "Export to CSV" button on the center top. This will ask you to pick a folder in which to store the file.

#### Preparing the data for OpenSpending

Great - now we have the data, so let’s prepare it for OpenSpending!

OpenSpending needs the data to be in a specific format to be able to use it. Specifically, OpenSpending needs one column for the amount spent, one column for the date of the transaction (in our case the year), and then more columns for other properties (such as the spending unit, the sector, the economic category, etc.).

To be able to use the data we just downloaded in OpenSpending, we have to bring it into the necessary form. We will do this with a tool called Open Refine. Refine is made for cleaning data and converting data from one format to another.

##### Walkthrough: converting data with Refine

1. Start Refine by double-clicking on the Refine icon. Once it’s ready, a browser window will open and point to [127.0.0.1:3333](http://127.0.0.1:3333).

3. First we need to create a project with our new data. Do so by clicking on the "Create Project" tab.

    ![image alt text](http://i.imgur.com/ywah1MP.png)

4. Now choose the file we just downloaded and click "next". This will open the Preview tab. You’ll notice how the first row is empty and contains the years for the executed budget.

    ![image alt text](http://i.imgur.com/lhXsJJO.png)

7. We want to have the years in the column headings. Let’s tell this to Refine. Enter "2" next to the box saying "Parse the next ____ lines as column headers".

    ![image alt text](http://i.imgur.com/5uD0hld.png)

8. Now that this is fixed, let’s create the project. Click on the "Create Project" button on the top right.

9. OpenSpending wants a single column for all the amounts and a single column for all the years. Right now we have a column for each year. No problem, let’s transpose it.

    Select the column options for the first column ("Executed 2003") and select "Transpose → Transpose cells across Columns into rows".

    ![image alt text](http://i.imgur.com/GwPi7Gh.png)

11. Select "Two new Columns". Call the first Year and the second Amount. Also make sure to select the "fill down in other columns" option.

    ![image alt text](http://i.imgur.com/FUu89HP.png)

12. Click on "Transpose" to do the transposition.

13. Now we only have to remove the "Executed" in the year column. We do this using a "Transform" on the column.

    ![image alt text](http://i.imgur.com/vbKrT45.png)

15. A menu pops up asking us for the "Expression" to transform. Expressions are like formulas in spreadsheets.

    The expression we want to use is `value.replace("Executed ","")` - this will remove the "Executed " from the cells.

    ![image alt text](http://i.imgur.com/ZJHjJbo.png)

16. Next, we have to check whether all the years and all the amount fields actually have values in them. Let’s do this using a facet. Select "Facet → text facet" on the year column.

    ![image alt text](http://i.imgur.com/0yeuDim.png)

    This will open a Facet window on the left side.

    ![image alt text](http://i.imgur.com/lX5sKW9.png)

19. There are 39 rows where the year is blank – let’s delete them. Select the blank rows by clicking on "(blank)".

20. Now let’s remove the rows by selecting "edit rows → remove all matching rows" from the "ALL" column options.

21. Remove the facet by closing the facet window with the little "x" on the top left.

22. Now our dataset is ready for Open Spending!

    Let’s export it to CSV ("Comma-separated value"):

    ![image alt text](http://i.imgur.com/fpWEcvC.png)

Congratulations! You have successfully prepared a dataset for visualization and analysis in OpenSpending.

#### Uploading the data to OpenSpending

The next step we need to take is to upload the Data into OpenSpending. Since OpenSpending does not support direct uploading of data, we’ll have to store the data somewhere on the web. This can be your own website - or in our case a community-driven data portal, [AfricaOpenData.org](http://africaopendata.org).

##### Walkthrough: uploading data on AfricaOpenData

*Note: this step is optional. You could also use a service like [Dropbox](http://dropbox.com/) or your own website to upload the datafile.*

1. Go to [africaopendata.org](http://africaopendata.org) and create a profile.

2. Log in.

3. Now click on the "Add Dataset" button in your dashboard.

    ![image alt text](http://i.imgur.com/IBqUkC9.png)

4. This will ask you some basic information for the dataset - a name, a description and so on.

    ![image alt text](http://i.imgur.com/uA5O4em.png)

5. Click on Next to go ahead.

6. Add a data file by selecting the "Upload a File" tab and choosing your file.

7. Enter some information about the file and click on "Next".

8. Now you can enter some further information. Then click "Finish".

Congratulations, you have published a Dataset on AfricaOpenData!

##### Walkthrough: loading data into OpenSpending

Now that we’ve got our data online, we can work on getting it into OpenSpending.

1. Go to [openspending.org](http://openspending.org).

2. Click on the "Log in/register" tab and register a new account, or log in with a previously registered one.

3. This will open your Dashboard. If you just signed up, this will be empty. Click on the big blue "Import a Dataset" button. This will lead you to a form for you to describe your new dataset. Fill it out.

    ![image alt text](http://i.imgur.com/PJ2VhhR.png)

6. Click on "Next Step". This puts us into the dashboard for the project. To import a dataset, we have to do several steps.

    First, add a source. Click on the "Add a Source" button. Now go back to your uploaded dataset and find the download button (a sample can be found [here](http://africaopendata.org/dataset/boost-kenya)). Copy the link into the menu that popped up in Open Spending and click on Create.

11. OpenSpending will now analyze the file and see whether it’s good to load. This will take a while - feel free to reload the page to see whether it’s done. When it’s done, click on the "create model" button.

    ![image alt text](http://i.imgur.com/J3DyHiG.png)

13. Open Spending will have recognized most of the columns properly – except it wants a column called "time", and we have to create it. Delete the Year column by clicking on the "X" next to "year" in "Existing Dimensions".

15. Now let’s add a dimension by clicking on the "New Dimension" button. This opens a menu. Select "date" and name it "time".

    ![image alt text](http://i.imgur.com/zmhcHDC.png)

17. Click on "Add" to add this dimension. OpenSpending should have automatically identified the "Year" column as the column you want to have.

19. So far so good. To display data more nicely, OpenSpending needs two dimensions labeled "from" and "to" that refer to who spent the money and for what. In our case, those would be *Top-level-spending-units* for "from" and *sub-economic-category* for "to".

    Let's do this similarly to how we added "time". Remove "top-level-spending-units" from the existing dimensions. Create a dimension called "from".

    ![image alt text](http://i.imgur.com/q6gQ21i.png)

23. Now you can add all the attributes to "from" here. In our case, it’s just the one column.

24. Now do the same for "sub-economic-category" and "to".

25. To make sure it doesn’t double-load the data, OpenSpending needs to know how to determine whether a record is already there. This is done by specifying which combination of columns marks an entry as unique.

    To define this, select "Set Unique Dimensions". A popup will appear. Check all dimensions except "amount".

    ![image alt text](http://i.imgur.com/e0gm7M5.png)

27. Great - now click on "Update" and then on "Save Dimensions". This should create a Model in OpenSpending - so it understands what your data looks like.

    Once we have created our model, we can load the data. Go back to the Dashboard and click the "Load" button next to your source. This will take a while and run through. Reload the page and check until the run is finished.  Now we can open the dataset. Click on the link next to the "house" icon on the top.

    ![image alt text](http://i.imgur.com/r8y9ZYh.png)

Congratulations! You have uploaded a dataset to OpenSpending!

#### Creating a visualization on OpenSpending

Now that we have our Dataset on OpenSpending, let's create a visualization.

##### Walkthrough: creating a Treemap visualization in OpenSpending

1. Click on the Visualization tab and select "create a visualization".

    ![image alt text](http://i.imgur.com/f0TRZjK.png)

2. We want to create a TreeMap, so let’s select "TreeMap". This gives us the Visualization editor. It allows us to select the parameters by which the dataset is split and filtered.

    Let’s start with "Sector". Then add a new level and select "From"; add another one and select "Economic Category"; and finally add one more level and choose  "To". "To" will be our most fine-grained information on where the money is spent.

    ![image alt text](http://i.imgur.com/LJMIttP.png)

6. You can play around with the visualization in the bottom to get an idea what is going on. Once you’re happy, click on "Save or embed".

8. Name your visualization and click "Save".

Now you have a visualization, and you can go and embed it on your website.

Stuck? Need further support? Visit [ask.schoolofdata.org](http://ask.schoolofdata.org)! 

