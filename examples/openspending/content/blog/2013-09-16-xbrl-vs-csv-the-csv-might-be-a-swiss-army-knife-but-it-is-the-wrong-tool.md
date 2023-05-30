---
redirect_from: /2013/09/xbrl-vs-csv-the-csv-might-be-a-swiss-army-knife-but-it-is-the-wrong-tool/
title: 'XBRL vs. CSV: The CSV might be a Swiss army knife, but it is the wrong tool'
authors:
- Anders Pedersen
---
<a href="http://www.flickr.com/photos/usnationalarchives/7496443948/" title="Apply webbing to the frame - chair, 1936 by The U.S. National Archives, on Flickr"><img src="http://farm9.staticflickr.com/8021/7496443948_d893418576.jpg" width="500" height="359" alt="Apply webbing to the frame - chair, 1936"></a><!--magazine.image = http://farm9.staticflickr.com/8021/7496443948_d893418576.jpg -->

In our ongoing debate about the pros and cons of XBRL and CSV, we are pleased that we are able to post this response from <a href="http://en.wikipedia.org/wiki/XBRL">Charles Hoffman</a>, who is widely credited as one of the main accountants behind XBRL. If this is the first post you read in the series do not miss the earlier entries in this debate. First Marc Joffe argued for the use of <a href="http://tabbforum.com/opinions/the-case-for-muni-xbrl-bringing-municipal-financial-disclosure-into-the-21st-century">XBRL in municipal reporting</a>. Then Friedrich Lindenberg responded that financial reporting should instead <a href="http://community.openspending.org/2013/09/13/finance-data-standards/">look to transport data</a> in order to reduce complexity. Below follows the response from Charles Hoffman:

XBRL has unfortunately earned the reputation it has because of (a) flaws in the way some regulators implement XBRL and (b) misunderstands of the business people promoting XBRL. This is very consistent with what Gartner calls the <a href="http://irwebreport.com/20110309/xbrl-investor-relations/">“hype cycle”</a>.

The following are the realities and truths which should be considered summarised as succinctly as possible. You can see the details <a href="http://xbrl.squarespace.com/journal/2013/3/1/achieving-meaningful-exchange-of-information.html">here on my blog</a>.

### Point 1: Achieving meaningful exchange
“The only way a meaningful exchange of information can occur is the prior existence of agreed upon semantics, syntax, and workflow/process rules.” <a href="http://xbrl.squarespace.com/journal/2010/8/29/into-to-hl7-video-can-help-you-understand-xbrl.html">This video</a> made available by HL7 explains this in more detail.

###Point 2: Formality
If you consider point 1, the “rules” can be somewhat of a bottomless pit. A balance needs to be achieved between practicality (something actually works) and “formality” (spending so much time creating rules and making things so complex that no one could ever use the system). A practical balance needs to be achieved.

###Point 3: Expressiveness
While it is true that CSV has been around a long time, it is easy to use, there is lots of support….CSV is not very expressive. CSV is a “flat” tabular structure, two dimensional. Information is “n” dimensional (could have many dimensions). An OWL ontology is WAY, WAY more expressive in terms of creating rules to make sure the information is correct (i.e. Point 1), but it is much more complicated because of that expressiveness.

###Point 4: Complexity
While “complexity” can never be removed from a system, the complexity CAN be moved. What I mean by this is that while it is hard to create something like an OWL ontology, computer software can shield business users from the complexity in many, many different ways. One example is the use of “patterns”. Another is using “application profiles”. Another is using the 80/20 rule in terms of creating business rules to assure information quality. I could go on and on about this and show you many, many examples. Fundamentally this all boils down to the this one fact: “XBRL software vendors” are building the wrong software; they have built XBRL technical syntax editors instead of “digital financial reporting” applications or “digital business reporting” applications. This problem is understood by some software vendors who are now building the correct software, others are understanding, everyone will be forced to move in this direction due to market pressure.

###Point 5: Guidance-based, semantic-oriented, model-driven, business report authoring enabled by “semantic web” technologies
Authoring business reports in the future will be as different as the difference between creating a photograph when you used a darkroom filled with smelly and chemicals as contrast to using “Photoshop”. What you can do with a business report will also be as different as what you can do with a photograph printed on a piece of paper and a photograph expressed digitally. The key is “metadata” and applications which understand and therefore leverage that metadata. For example, Microsoft Word knows ZERO about creating a financial report. Nothing. Guidance-based, semantic-oriented, model-driven financial report authoring tools (think TurboTax) will have:
• Knowledge baked in
• New knowledge can be inferred/added
• Agility to adapt to ever-changing conditions
• Semi-automated data integration
• Machine intelligence

You may not be able to imagine these applications, or maybe you can. But when you see an application working correctly, leveraging a rich set of metadata (which you cannot even express using CSV files), it will be very, very easy to grasp these ideas. Read the documents linked do on <a href="http://xbrl.squarespace.com/journal/2013/1/2/smart-dataapplications.html">this blog post</a>.

XBRL is only part of a much, much broader trend of digital business reporting and digital financial reporting. That is part of an even bigger trend, “digital”. Electronic medical records is an example of the much broader trend. Electronic medical records has many of the same issues as what the U.S. Securities and Exchange Commission (SEC) is trying to do with XBRL-based financial filings. The accounting profession and SEC is much, much further down the path than electronic medical records from what I can see. Electronic medical records (EMR) are not “interoperable” or exchangeable between systems yet (XBRL is). There is no international standard for EMR (there is for financial reporting, XBRL).

Generally, people are having the wrong discussion! They are discussing syntax (i.e. CSV, JSON, XML, etc.) and they should be discussing “how the heck are we going to articulate and management semantics”. That is the discussion which needs to occur. This is very, very useful stuff. This is not about saying that CSV is bad and that XBRL is good. They are two different tools for different problems. Using the wrong tool to solve a problem is bad as well as inappropriately using a tool is bad!

The goal as I see this is success. Success means (for business people) cost effective, easy to use, effective, robust, reliable, repeatable, predictable, scalable, secure (when necessary), auditable (when necessary), practical, business information exchange by business users between business systems.

Below you will find a short video where Charles Hoffman explains XBRL:
<iframe src="//www.youtube.com/embed/nATJBPOiTxM" frameborder="0" width="420" height="315"></iframe>

