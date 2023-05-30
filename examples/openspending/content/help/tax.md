---
section: help
lead: true
title: Personal tax API
authors:
- Neil Ashton
---
The tax share API estimates a household's tax contribution based on simple
proxy data. The estimate allows for both direct tax (including income tax,
national insurance and council tax) and indirect tax (including VAT, alcohol
and tobacco duty, and fuel duty).

    GET http://openspending.org/api/mytax?income=N

The basic call accepts a variety of parameters, most of which are optional:

* ``income`` (required)
  Total household income, including all pension and benefits. This is
  used to estimate total tax paid, including both direct and indirect
  taxation.

* ``spending``
  Total spending on consumption.

* ``smoker``
  yes/no

* ``drinker``
  yes/no

* ``driver``
  yes/no

This will generate a simple JSON response of the following form:

    {
      "alcohol_tax": 153.04239230064161,
      "explanation": [
        "This household income falls between national average income decile 1 (which has average gross household income of 9219.00, and pays 1172.00 in direct tax, 1016.00 in VAT, 1101.00 in smoking taxes, 288.00 in alcohol-related taxes, 150.00 in car-related taxes, and 349.00 in other indirect taxes), and decile 2 (which has average gross household income of 13583.00, and pays 1368.00 in direct tax, 969.00 in VAT, 1085.00 in smoking taxes, 310.00 in alcohol-related taxes, 167.00 in car-related taxes, and 289.00 in other indirect taxes).",
        "Therefore, a household with an income of 10000.00 pays approximately 1207.08 in direct tax and 2888.97 in total indirect tax."
      ],
      "tax": 4096.0439963336394,
      "tobacco_tax": 291.93721356553618,
      "car_related_tax": 338.26214482126488,
      "total_direct_tax": 1207.076993583868,
      "vat": 1098.1365719523374,
      "total_indirect_tax": 2888.9670027497709
    }

**Up**: [OpenSpending API](../)
