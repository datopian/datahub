---
section: help
lead: true
title: API conventions
authors:
- Neil Ashton
redirect_from:
- /help/api/
---
#### Authentication

Some actions in OpenSpending require authentication, particularly those that write to the system or aim to access protected data (e.g. pre-publication datasets). For this purpose, each user is provided an API key. The key is displayed in the *settings* (go to the dashboard and click on *Change* next to the Information header). You can use it to perform authentication by adding the following into the HTTP headers (change <your-api-key> to the API key you find in your settings):

    Authorization: ApiKey <your-api-key>

#### JSON-P Callbacks

All API calls that return JSON support JSON-P (JSON with padding). You can
add a ``?callback=foo`` parameter to any query to wrap the output in a
function call. This is used to include JSON data in other sites that do not
support CORS:

    $ curl http://openspending.org/cra.json?callback=foo

    foo({
        "description": "Data published by HM Treasury.",
        "name": "cra",
        "label": "Country Regional Analysis v2009",
        "currency": "GBP"
    });

This can be used in remote web pages to include data as a simple ``script``
tag:

    <script>
      function foo(data) {
        alert(data.label);
      }
    </script>
    <script src="http://openspending.org/cra.json?callback=foo"></script>

<!--
#### Cross Origin Resource Sharing

The API does not yet support [CORS](http://code.google.com/p/html5security/wiki/CrossOriginRequestSecurity), but support will be added in the near future.
-->

**Up**: [OpenSpending API](../)
