---
title: Connecting the Aid Flows
---

<h2>Connecting the Aid Flows &mdash; making sense of the IATI data</h2>

<p class="pull-right">
    <small>Walk-through by Mark Brough, Publish What You Fund, and Rufus Pollock, OKFN.</small>
</p>

<br/>

<div class="row">
    <div class="span4">
        <p>
            The <a href="http://aidtransparency.net">International Aid Transparency Initiative</a>
            is a political agreement by the world's major donors - including international banks, private foundations and NGOs - on a common way to publish aid information. It also defines a technical standard for exactly how that information should be published, IATI-XML.
        </p>
        <p>
            So far, 29 donors representing 74% of Official Development Finance (ODF)
            <a href="http://aidtransparency.net/implementation">have committed to publishing</a> to IATI. A further <a href="http://iatiregistry.org/group">13 donors</a> representing 45% of ODF have already published, and 12 NGOs and foundations have published their own data.
        </p>
        <p>
            This page details how we converted each donor's data, using simple scripts and open source tools, from raw XML data in the <a href="http://iatiregistry.org/">IATI Registry</a> into a consolidated dataset and then, via loading into <a href="http://openspending.org/">OpenSpending</a> to visualisations like those shown above and an easy-to-use RESTful API.
        </p>

        <p class="pull-right">
            <small>Figure: IATI transactions, aggregated by <a href="http://openspending.org/iati?_view=funder">funding organization</a>.</small>
        </p>
    </div>
    <div class="span8">
        <iframe width='620' height='400' src='http://openspending.org/iati/embed?widget=treemap&state=%7B%22drilldown%22%3A%22from%22%2C%22year%22%3A%222011%22%2C%22cuts%22%3A%7B%22transaction_type%22%3A%22d%22%7D%7D&width=620&height=400' frameborder='0'></iframe>
    </div>
</div>

<hr>

<div class="row">
    <div class="span6">

        <img src="http://farm8.staticflickr.com/7098/7326283576_6b572c9253.jpg" class="shadow inline-image large">
    </div>
    <div class="span6">
        <h3>The IATI Registry and pulling data together</h3>
        <p>
            Data publishers convert their data to the IATI format, publish it on their websites, and then register it with the <a href="http://iatiregistry.org">IATI Registry</a>, which runs on the <a href="http://ckan.org">CKAN data portal software</a>.
        </p>

        <p>
            This decentralised structure of open data feeds, rather than a centralised database, is an important part of IATI. It creates flexibility to allow data providers to publish data in a format that makes sense for their business model, provide live feeds coming straight out of their system, and continuously update and improve the data, in terms of the coverage, proportion of fields used, and quality of the data entered within those fields.
        </p>

        <p>
            It also means that many applications can easily take the data - because it is publicly accessible, openly licensed, and in a standard, comparable format - and create interesting tools and visualisations.
        </p>
    </div>
</div>

<hr>

<div class="row">
    <div class="span6">
        <p>
            However, this decentralised structure also creates challenges for people who want to use the data: quite a lot of technical knowledge is required to convert IATI-XML data into a format that is suitable for analysis. The data has to be downloaded from a range of websites, and then parsed to extract the information from XML files, into a format more suited for analytical purposes - e.g. to aggregate and analyze project funding. This is why it makes sense to place it in (for example) a relational database, a spreadsheet or another format for presenting the data.
        </p>
        <p>
            So far, 29 donors representing 74% of Official Development Finance (ODF)
            <a href="http://aidtransparency.net/implementation">have committed to publishing</a> to IATI. A further <a href="http://iatiregistry.org/group">13 donors</a> representing 45% of ODF have already published, and 12 NGOs and foundations have published their own data.
        </p>

        <h3>Consolidating the data into a simple format</h3>

        <p>
            So a first step we took was to consolidate the IATI data into a simple CSV-based format:
        </p>

        <ol>
            <li>Get data files from the IATI Registry. Fortunately, the first part of the process is made easier because the IATI Registry uses the CKAN API. This allows easy access to download the entire corpus of data.</li>
            <li>Convert into an SQLite database. IATI data contains detailed lists of activities (projects or programmes) that contain many transactions (incoming or outgoing financial flows). Activities are classified in various ways, with multiple recipient countries and sectors. Activities can also be hierarchically related to each other (a project can be part of a bigger programme). A database structure is therefore a good first step to ensure that these relationships are maintained, and that the data is accurately represented.</li>
        </ol>

        <p>
            At this point we have a nice complete version of the IATI data in an SQLite file.
        </p>
    </div>
    <div class="span6">
         <img src="http://farm8.staticflickr.com/7086/7242077678_89e584fc75.jpg" class="shadow left inline-image large">
    </div>
</div>

<hr>

<div class="row">
    <div class="span6">
        <img src="http://farm9.staticflickr.com/8151/7242077310_61b07942dd.jpg" class="shadow left inline-image large">
    </div>
    <div class="span6">

       <h3>Loading into OpenSpending</h3>

        <p>
        A large aspect of IATI is about money - which projects are being funded, where, and transactions from one organisation (the funder) to another (the implementer). So a natural next step was to get this data into OpenSpending, which requires data in a simple CSV-based structure. So next:
        </p>

        <ul>
        <li>scripts create a file in the OpenSpending CSV format by breaking each transaction in each activity into sectoral sub-components</li>
        <li>the value of each transaction is then prorated to the proportion of the activity that is assigned to each sector (again, activities can be assigned to several sectors)</li>
        </ul>

        <p>
        Aside: This means that when the data is aggregated by sector, the aggregate values should be accurate. However, it also means that artificial transactions are created in order to make this representation possible. A sensible way to deal with this would be to create a view of the data that shows only activities, or only "real" transactions, rather than the mini-transactions necessarily created through this process.
        </p>

        <p>
        With that done we now have a <a href="http://thedatahub.org/dataset/iati-registry/resource/ba1a2688-cc2c-4ce8-bc01-7f56a710d97e">600Mb CSV file of IATI transactions</a> which we uploaded as part of the <a href="http://thedatahub.org/dataset/iati-registry">IATI dataset on the DataHub</a>.
        </p>

        <p>
        Finally, we can use the OpenSpending import process and its model editor to import the data and provide relevant information such as the types and roles of the various columns.
        </p>

    </div>
</div>
<hr>
<div class="row">
    <div class="span6">
        <h3>API Access</h3>
        <p>
            As well as the user-friendly interface, you can query OpenSpending via an API. This allows you to pull out data for use in other applications.
        </p>
        <p>
            For example, you can see the biggest implementing organisations of education projects in Uganda in 2011:
        </p>

        <pre>http://openspending.org/api/2/aggregate
    ?dataset=iati
    &cut=time.year:2011
        |recipient_country.name:ug
        |sector.name:11220
        |transaction_type.name:d
    &drilldown=to</pre>

        <p>Or the biggest recipient countries in 2011 for HIV/AIDS projects:</p>

        <pre>http://openspending.org/api/2/aggregate
    ?dataset=iati
    &cut=time.year:2011
        |sector.name:13040
        |transaction_type.name:d
    &drilldown=recipient_country</pre>

        <p>Or the largest funders of projects that have been reported so far in 2012:</p>

        <pre>http://openspending.org/api/2/aggregate
    ?dataset=iati
    &cut=time.year:2012
        |transaction_type.name:d
    &drilldown=from</pre>

        <p>This allows you to visualise the data very easily using something like the Bubbletree, seen here.</p>
    </div>
    <div class="span6">
        <br>
        <img src="http://farm9.staticflickr.com/8156/7242651298_133cb38dee.jpg">
    </div>
</div>