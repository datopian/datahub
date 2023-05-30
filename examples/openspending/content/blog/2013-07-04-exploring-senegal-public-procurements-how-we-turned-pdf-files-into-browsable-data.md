---
redirect_from: /2013/07/exploring-senegal-public-procurements-how-we-turned-pdf-files-into-browsable-data/
title: 'Exploring Senegal Public Procurements : how we turned PDF files into browsable
  data ?'
authors:
- pierre chrzanowski
---
<em>Blog post co-authored by Patrick Nsukami (Dakar Linux User Group), Pierre Chrzanowski (Open Knowledge Foundation France) and Tangui Morlier (Regards Citoyens).</em>

<iframe src="http://openspending.org/marches-publics-senegal/embed?widget=treemap&amp;state=%7B%22drilldowns%22%3A%5B%22from%22%5D%2C%22year%22%3A2013%2C%22cuts%22%3A%7B%7D%7D&amp;width=600&amp;height=400" frameborder="0" width="600" height="400"></iframe>

As part of the <a href="http://fr.okfn.org/2013/05/27/open-data-senegal-retour-sur-le-tandem-dakar-paris/" target="_blank">“Tandem Dakar Paris”</a> a Digital Week organized in May by the French Institute, Jokkolabs (Dakar) and La Cantine (Paris), people from Senegalese and French Open Data communities joint their forces during a workshop in Dakar to explore Senegal Public Data.

During our exploration, we have been pleased to find that <a href="http://www.marchespublics.sn/pmb/index.php?option=com_stats&amp;task=afficheTacmaq&amp;Itemid=141&gt;" target="_blank">Public Procurement Data were regularly published on the Senegalese Authority for Public Procurement website</a>. But the information were released in PDF files and therefore difficult to analyze. So we decided to extract the data into machine readable and open format. In a less than one day, 4800 lines of public procurements awarded between years 2012 and 2013 have been extracted into a single CSV file. It was then easy to upload the file onto Open Spending, making the data easily browsable. Here is how we did it :

<h3>Downloading PDF files</h3>
The Senegalese Authority for Public Procurement releases <a href="http://www.marchespublics.sn/pmb/index.php?option=com_stats&amp;task=afficheTacmaq&amp;Itemid=141&gt;" target="_blank">public procurement data as PDF files</a> on a quarterly basis

<a href="{{ site.baseurl }}/img/blog/2013/07/armp.jpg"><img class="alignnone size-medium wp-image-329" src="http://blog.openspending.org/files/2013/07/armp-300x159.jpg" alt="armp" width="300" height="159" /></a>

The files contain information on each public procurement contract awarded during this period of time, including :

<ul>
<li>amount of the procurement ;</li>
<li>date of the procurement has been awarded ;</li>
<li>public authority who delivered the procurement ;</li>
<li>private or public entity who received the procurement (the beneficiary);</li>
<li>type of procurement : service, good, etc.</li>
</ul>
We choose to download files from the first quarter of 2012 to the first quarter of 2013 (the last one available).

<h3>PDF extraction</h3>
One of the tricky part was then to extract data from the PDF files. To transform a PDF file to a CSV file, it was important to split the task into small ones, and follow the KISS principle (Keep It Simple and Stupid). That's what we did, see it here :

<strong>Task #1 - Split the PDF files :</strong> First step was to split the PDF into one-page-only files that would be easier to handle by scripts. This means to go from one document, containing lots of pages, for example 100 pages, to 100 documents of 1 page each. <strong><a href="http://www.pdflabs.com/tools/pdftk-the-pdf-toolkit " target="_blank">We used pdftk</a></strong> a free and opensource command lines tool, to perform this operation.

<strong>Task #2 - PDF to XML :</strong> Second step was to turn the tables within the PDF files to an XML document. It is easier to parse an XML document (the structure) than a PDF one. For this task,<strong> <a href=" http://linux-commands-examples.com/pdftohtml" target="_blank">we used pdftohtml</a></strong>

<strong>Task #3 - XML to CSV :</strong> then we wrote a script in perl (but you can do it in python, ruby, etc.) that turned the XML document to a CSV document. <strong><a href="https://gitorious.org/sharedscrapers/aod_senegal/blobs/master/marches_senegal/parser_page.pl" target="_blank">Here is the XML to CSV  for 1 page script</a> </strong>

The script creates the columns and the lines we defined. When we were satisfied with the result for the first page, we wrote another script to apply the first script to all the XML pages (a bash script). <strong><a href="https://gitorious.org/sharedscrapers/aod_senegal/blobs/master/marches_senegal/parser_pdf.sh" target="_blank">Here is the XML to CSV bash script</a></strong>

<strong>Task #4 - Retrieve public procurement data only :</strong> The result was a CSV file containing all the information from the tables, including the data on Public Procurements but not only. The final step was to retrieve only data on "Public Procurement". This has been done by parsing the XML file and retrieving only lines with a specific content. <strong><a href="https://gitorious.org/sharedscrapers/aod_senegal/blobs/master/marches_senegal/parse_csv.pl" target="_blank">The Retrieve script is here</a></strong><a href="https://gitorious.org/sharedscrapers/aod_senegal/blobs/master/marches_senegal/parse_csv.pl" target="_blank">
</a>

<strong>Task #5 - Run all the scripts :</strong> finally, we wrote a bash script to perform all the tasks in a row :

<ul>
<li>split pdf</li>
<li>turn pdf pages to xml ones</li>
<li>convert XML documents to CSV ones</li>
<li>retrieve all the lines on "Public Procurement"</li>
</ul>
<strong><a href="https://gitorious.org/sharedscrapers/aod_senegal/blobs/master/marches_senegal/parse_all.sh" target="_blank">Here is the final bash script</a></strong>

Eventually, we got a pretty good first version of the csv file with all data on public procurements inside. Next step was to ensure the quality of the dataset and prepare it to be uploaded onto Open Spending.

All the scripts created during this part are published in AGPL : <a href="http://www.gnu.org/licenses/agpl.html " target="_blank">http://www.gnu.org/licenses/agpl.html </a>and can be forked from <a href="https://gitorious.org/sharedscrapers/aod_senegal" target="_blank">https://gitorious.org/sharedscrapers/aod_senegal</a>

<h3>Cleaning and preparing data</h3>
When extracting data from a PDF file, most of the time your csv comes with conversion errors such as misplaced or divided cells. It is important to correct those errors before going any further. Your dataset is a combination of different inputs from different public authorities : you must also ensure that every reference in the dataset has a unique name (public authority, company, etc.). This will facilitate the analysis. Finally, for uploading the dataset onto Open Spending, you must also ensure the quality of the data such as avoiding empty cells, or converting amounts and dates in the appropriate formats. All this is part of the cleaning process.

To perform those operations we used only 3 kind of tools, linux shell tools, a spreadsheet application LibreOffice Calc (but you can also use Excel) and<a href="http://openrefine.org/" target="_blank"> Open Refine</a> (formerly known as Google Refine).

<strong>Linux shell tools</strong> such as awk, grep or wc that help to identify the error and check if they are correctly corrected. They help to aggregate data and be sure that corrections needed were done globally. A text editor can also be used for this step.

<strong>Open Refine</strong> is a powerful application to help you quickly clean your dataset. We mostly used Refine for its “cluster” feature, which helps you find groups of different cell values that might be alternative representations of the same thing, and then let you attribute a unique name to those cells. We used the “cluster” tool once we were sure that the cells contained the correct information.

<a href="{{ site.baseurl }}/img/blog/2013/07/refine1.png"><img class="alignnone size-large wp-image-354" src="http://blog.openspending.org/files/2013/07/refine1-1024x496.png" alt="refine" width="591" height="286" /></a>

And we used<strong> LibreOffice Calc</strong> for all other operations : aggregate divided cells ; convert amounts in the right currency ; fill in empty cells with a default value.

Here is a summary of the tasks performed during the cleaning process :

<ul>
<li>Fill in empty cells with default values ;</li>
<li>Concatenate values that are divided into several cells ;</li>
<li>Attribute a unique value to same entities (public authorities, companies) ;</li>
<li>Convert all money amount into local currency “Francs CFA” ;</li>
<li>Convert date format from DD/MM/YYYY to YYYY-MM-DD (standard for Open Spending).</li>
</ul>
<h3>Uploading data onto Open Spending</h3>
Once the csv has been cleaned, <a href="http://www.nosdonnees.fr/dataset/marches-publics-du-senegal-publies-par-l-armp" target="_blank">we published the dataset on NosDonnées.fr </a>the French Open Data Hub, under the Odbl licence. The file was then available for all in an open and machine readable format.

<a href="{{ site.baseurl }}/img/blog/2013/07/nosdonneesfr.jpg"><img class="alignnone  wp-image-333" src="{{ site.baseurl }}/img/blog/2013/07/nosdonneesfr.jpg" alt="nosdonneesfr" width="341" height="232" /></a>

Last part was to upload and configure the dataset to be available on Open Spending :

<strong>Step #1 - Import and validate the dataset :</strong> assign a name, an identifier, a country, language, a currency and a description to your dataset. Then specify the url of your dataset. The file must be available on the web, this is why we published it first on NosDonnées.fr.

<a href="{{ site.baseurl }}/img/blog/2013/07/import.png"><img class="alignnone size-medium wp-image-334" src="http://blog.openspending.org/files/2013/07/import-300x189.png" alt="import" width="300" height="189" /></a>

&nbsp;

<strong>Step #2 - Create a model for your dataset :</strong> once the file has been validated by Open Spending, you are invited to attribute dimensions related to your spreadsheet, i.e defining which field designate what. The mandatory fields are the field date, the field amount, the field “to” which is the entity who received the contract, and the field “from” which is the “entity” offering the contract.

Fields “to” and “from” must be compounds dimensions, however the model will not be valid. Make also sure you have an unique ID for each entry. In our case we had to assign an unique code for each procurement row since it was not present in the original file.

You can also specify which dimensions you want to be able to browse by in the Open Spending application. These are the facets of your model. We choose “public authorities”, “beneficiaries” and “type of procurements” and “procurements titles” as facets for our model.

Once the model was ready, we saved it. Then, Open Spending started loading the entire dataset. In case of errors during the loading process, you can always come back to your dataset, do a bit of refine and reload it. After some trials and errors, the result was good enough to be published.

<strong>Step #3 - Create a view :</strong> Dataset was now browsable. Last step (which is not mandatory) was to create specific views or visualisation. On Open Spending you can choose among “Table of aggregates”, “Bubble tree” and “Tree Map”. In our case we wanted to see a list of beneficiaries sorted by who received the most. So we choose “table of aggregates” with a view aggregated by beneficiaries. Once the view was created, we could embed it in our website like this :

<iframe src="http://openspending.org/marches-publics-senegal/embed?widget=aggregate_table&amp;state=%7B%22drilldowns%22%3A%5B%22to%22%5D%2C%22year%22%3A2013%2C%22cuts%22%3A%7B%7D%7D&amp;width=600&amp;height=400" frameborder="0" width="600" height="400"></iframe>

&nbsp;

So that’s all ! <a href="http://openspending.org/marches-publics-senegal" target="_blank">Senegal Public Procurements are now available on Open Spending</a> and easily browsable. We hope this article will be helpful for your exploration into other country's public procurements or PDF files.

