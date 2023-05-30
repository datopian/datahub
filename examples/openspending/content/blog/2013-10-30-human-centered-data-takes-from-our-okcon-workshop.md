---
redirect_from: /2013/10/human-centered-data-takes-from-our-okcon-workshop/
title: 'Human Centered data: Takes from workshop at OKCon'
authors:
- Anders Pedersen
---
The [Human Centered Data workshop][1] held at [OKCon 2013][2] by the [Sunlight Foundation][3]'s [Kaitlin Devine][4] and [Júlia Keseru](https://twitter.com/jkeserue) asked: what would public spending data look like if it were actually designed to be used?

The workshop wisely refrained from looking for a single answer to that important question. Instead, it recognized that there are as many answers as there are types of users. It asked workshop participants to sort themselves into "basic" and "advanced" user categories and to explore what spending data designed for each group would look like.

## Basic asks from spending data
Júlia Keseru headed up a discussion to address the needs for non-technical users of spending data who wish to access and utilise spending data: from citizens to journalists and activists. Several participants in the group emphasised the importance of having access to user friendly presentations of spending data and not just raw spending data in order to broaden access across levels of data literacy.

The need for enabling citizens to comment and ask questions about actual spending items data was also highlighted. Though this is not possible today it could enable the citizenry to engage more directly on budgeting priorities they care about.

### Unit costs of services
One of the issues often arising as a barrier when citizens or journalists attempt to engage with spending data is the lack of access to the actual unit costs of services. For example a purchase of school books for 1 mio. USD might appear justifiable at first glance, but ultimately it will depend on whether the unit price is 10 or 200 USD per school book. Today only few countries provide information about unit costs though the participants agreed that this could help the public gain a better understanding of the proportions behind the numbers.

### Beware of digital divide
Some participants flagged the challenge of disseminating spending information to communities with little or no access to the internet. Radio was mentioned as a communication channel often under valued, along with  community boards and other low tech solutions, which were also emphasised. Finally SMS was mentioned as option for distributing tailored spending information, which could be configured based on Q&A services. 

## Advanced users
The "advanced" group brought together participants from organisations like [Publish What You Fund][5] and [Development Initiatives][6]. It was conducted by Kaitlin Devine, who got the ball rolling by suggesting the broad outlines of the ideal spending data and allowing participants to flesh them out.

The result was a portrait of spending data as designed for the technical leaders in financial transparency. Surprisingly, most of the discussion centered not around data itself but rather around the contextual information associated with it.

## Documentation

The first requirement for well-designed spending data identified by the power user group wasn't actually about data. Instead, it was about the data's *documentation*. Serious data-driven policy analysis, the group agreed, calls for good documentation of data's underlying methodology and domain.

What needs to be documented is, in short, every non-trivial decision that goes into creating a dataset and choosing how to set its values. This includes the methodology behind the data, including the representation of ambiguous spending items such as loan guarantees: are they represented as "0", since no money is actually spent on them, or are they calculated as some kind of loss? The business rules underlying the data must also be identified (allowing users to avoid double-counting when aggregating data, for example) or else incorporated in the data in the form of structural links.

Guidance on the expected contents of the dataset is also necessary. This includes information on data quality, both an assessment of the dataset's production quality and information on the normal values for different parameters in the dataset. Information on what is and is not contained in the dataset – for example, whether defense spending is included – is also necessary to make sense of the data.

## Categorization

The second need identified by the advanced data users didn't directly concern data, either. It highlighted the need for *metadata* that provides information about the dataset's semantics.

The most important metadata concerns *categorization*, spelling out the classification scheme used to sort spending events into types. Many different such schemes are in use, and the group recognized the need for either a standardized international set of categories or for some sort of third-party "interlingua" to bridge the different schemes.

Other important metadata needs include:

* Granularity (agency, sub-agency, recipient, ...)
* Timestamps and "last updated" info
* Responsibility: who approved the spending in the dataset? Who signed off on it?
* The source of the spending data
* The step in the budget / signing / etc. process represented by the dataset (e.g. proposed, adopted, part-year completed, actual, ...)

## Interoperability

As you might expect from the fact that [a whole OKCon workshop][7] was devoted to the topic, making spending data interoperable was identified as a major need. In practice, this means establishing standards and consistency in identifiers and codes—or doing the work of building bridges between standards already in place.

Good data should have consistent and unique identifiers for transactions, programs, and legal entities. That is, data values that refer to real-world entities and spending events should do so consistently within and between datasets. This is a minimum—the best case would be the existence of a standard format recognized by all data producers. In any case, the availability of machine-readable lookup tables for codes used in datasets is also important.

Does establishing interoperability mean imposing a new standard for categories and identifiers, "one standard to rule them all", on all data producers? Not necessarily. Organizations like UNICEF say that standards should be adapted to local needs—governments who use whatever categories work best for their countries are in the right. The heavy lifting, UNICEF says, should be done by outside agencies, who should identify *mapping principles* that connect standards rather than prescribing new ones.

## Community and context

At this point in the workshop, one participant wondered if we hadn't missed the point. In concentrating on technical issues like metadata and identifiers, weren't the *human questions* at the heart of data getting lost? This question led the conversation to an interesting new topic: the need for means of identifying the *context* of datasets.

How do budget and spending datasets relate to policies and political agendas? What is their meaning in terms of performance on some goal? These are the kinds of questions that we often ask of data, and we typically have our work cut out for us. This doesn't need to be the case: the information we want generally already exists but simply isn't linked to the data. Creating linkages between datasets and policy documents could address the first question, and establishing links between spending data and its stories of success (and failure)—perhaps along the lines of OpenSpending's [Spending Stories][8] project—could address the second.

## Conclusion

The workshop concluded with the conversation still underway, spilling over its time limit—data power users have lots to say about how data can better meet their needs!

One thing is clear, however: data users want data that comes packaged with its interpretation, or rather the documentation and metadata necessary to reconstruct its meaning. Far from being transfixed by mere technical issues, data users are interested in the *meaning* of data, and they want to make it as easy as possible to gain access to that meaning. Data producers therefore need to worry less about producing data itself and start thinking more about producing data documentation and metadata.

[1]:	http://okcon.org/open-data-government-and-governance/session-4/
[2]:	http://okcon.org/
[3]:	http://sunlightfoundation.com
[4]:	http://kaitlindevine.com
[5]:	http://www.publishwhatyoufund.org/
[6]:	http://devinit.org/
[7]:	http://okcon.org/open-data-government-and-governance/session-g/
[8]:	http://blog.okfn.org/category/okf-projects/spending-stories/

