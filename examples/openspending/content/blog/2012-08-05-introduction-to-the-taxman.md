---
authors:
- nick
redirect_from: /2012/08/introduction-to-the-taxman/
title: An introduction to the TaxMan
---

One of the pieces of technology powering [Where Does My Money Go][wdmmg] is a standalone application, TaxMan, that performs a rather dull yet important task. As anyone who has filled out a tax return will know, tax can be rather complicated, with numerous steps and calculations to perform. If you are  lucky, some of these calculations may be performed for you by your national revenue agency. This however doesn't help you if your aim is not only to calculate *your* tax, but also to understand how taxes are calculated in general. With [Where Does My Money Go][wdmmg], we wanted to find a way to estimate the total tax payments of UK citizens based on their salaries, income tax and "indirect" payments such as VAT (sales tax), fuel duties, etc.

[wdmmg]: http://wheredoesmymoneygo.org/

Enter the TaxMan.
TaxMan is a really simple JSON-over-HTTP API that aims to provide current and historical tax calculators for jurisdictions around the world. It currently has support for South African, Mexican, and British tax codes, including estimated calculations for British indirect taxes, and it's easy to extend to other countries. Critically, it doesn't try to shoehorn a complicated algorithmic tax code into a tabular format.

Before we go into details about how TaxMan works, let's see what it does. For example, find out which jurisdictions are supported by TaxMan (the following examples use [HTTPie][httpie] on the command line, but you can use anything capable of making HTTP GET requests, such as your browser or jQuery):

    $ http GET taxman.openspending.org
    HTTP/1.1 200 OK
    Content-Type: application/json; charset=utf-8
    Content-Length: 75
    Date: Wed, 01 Aug 2012 07:42:31 GMT

    {
        "jurisdictions": {
            "gb": "/gb",
            "za": "/za"
        },
        "message": "Welcome to the TaxMan"
    }

We explicitly link to the jurisdictions from the root of the API so that any client library can refer to `jurisdictions.gb` rather than having to "hard code" any of TaxMan's URL structure. So let's
follow the link for South Africa, here shown as `za` (TaxMan by convention uses [ISO3166 codes][iso3166] to denote countries):

[iso3166]: http://www.iso.org/iso/country_codes.htm

    $ http GET taxman.openspending.org/za
    HTTP/1.1 200 OK
    Content-Type: application/json; charset=utf-8
    Content-Length: 331
    Date: Wed, 01 Aug 2012 07:47:31 GMT

    {
        "calculation": {
            "total": 0
        },
        "data": {
            "income_tax": {
                "bands": [
                    {
                        "rate": 0.18,
                        "width": 160000
                    },
                    ...,
                    {
                        "rate": 0.38,
                        "width": 133000
                    },
                    {
                        "rate": 0.4
                    }
                ]
            },
            "rebates": {
                "aged_65_to_74": 6390,
                "aged_75_plus": 2130,
                "base": 11440
            }
        },
        "options": {
            "age": null,
            "income": null,
            "year": 2012
        }
    }

There's plenty to take in here, so let's focus on the basic structure first. There are three top-level keys in the response: `calculation`, `data`, and `options`. As you might expect, `calculation` contains the results of any tax calculation performed by TaxMan. In this example, no calculation has been performed, as we didn't give TaxMan an income to use for the calculation. Thus there's no interesting data. TaxMan will however also attempt to provide the data *it used to perform its calculations*, which is shown in the `data` field. The `options` field makes explicit the available options for this calculator. Note
that we can supply an `income` and an `age`, and some of the entries in `data` begin to make more sense. The `data.income_tax.bands` key contains a description of South Africa's tax bands. All bands have a tax `rate`, and all but the last band has a `width`, denoting the width of the band of income taxed at that rate. The last band covers all higher income, so has an effectively infinite width. For example, a tax system which charges 10% tax on all income up to £40,000, and 20% thereafter, would have two tax bands:

    [{ "rate": 0.1, "width": 40000 }, { "rate": 0.2 }]

So, what happens if we do supply an income? I'll truncate the `data` section of TaxMan's output for the sake of clarity.

    $ http GET 'taxman.openspending.org/za?income=200000'
    HTTP/1.1 200 OK
    Content-Type: application/json; charset=utf-8
    Content-Length: 468
    Date: Wed, 01 Aug 2012 08:06:07 GMT

    {
        "calculation": {
            "income_tax": {
                "bands": [
                    28800,
                    10000,
                    0,
                    0,
                    0,
                    0
                ],
                "total": 38800
            },
            "rebates": {
                "age_related": 0,
                "base": 11440,
                "total": 11440
            },
            "taxable": 200000,
            "total": 27360
        },
        "data": { ... },
        "options": {
            "age": null,
            "income": 200000,
            "year": 2012
        }
    }

You'll notice that the `calculation` section now contains much more information about the calculation, including data on how much you paid in each tax band, your tax rebates, and the total payable tax (`calculation.tax`).

And that's really all there is to TaxMan. It enforces few of the conventions mentioned above on its calculators, although I hope that the `calculation`, `data`, `options` triptych will become a pattern throughout. Most importantly of all, TaxMan is intended to be a simple and discoverable API. Explicitly representing available options is part of this aim of "discoverability".

Under the hood, TaxMan is a very simple open-source [Node][node] application. Calculators are typically one or two files. You can [find the source code on GitHub][tmgh], and we encourage you to fork it and add a calculator for another jurisdiction -- perhaps your own -- or improve an existing one.

[node]: http://nodejs.org/
[tmgh]: https://github.com/openspending/taxman/
