const nock = require('nock')

const gdp = {
  "name": "gdp",
  "title": "Country, Regional and World GDP (Gross Domestic Product)",
  "notes": "Country, regional and world GDP in current US Dollars ($). Regional means collections of countries e.g. Europe & Central Asia. Data is sourced from the World Bank and turned into a standard normalized CSV.",
  "resources": [
    {
      "name": "gdp",
      "title": "GDP data"
    }
  ],
  "organization": {
    "title": "World Bank",
    "name": "world-bank",
  }
}

const population = {
  "name": "population",
  "title": "World population data",
  "resources": [
    {
      "name": "population"
    }
  ],
  "organization": {
    "title": "World Bank",
    "name": "world-bank",
  }
}

module.exports.initMocks = function() {
  // Uncomment this line if you want to record API calls
  // nock.recorder.rec()


  // "package_search" mocks
  nock('http://mock.ckan/api/3/action', {'encodedQueryParams':true})
    .persist()
    // 1. Call without query.
    .get('/package_search?facet.field=organization&facet.field=groups&facet.field=tags&facet.field=res_format&facet.field=license_id&facet.limit=5')
    .reply(200, {
      "success": true,
      "result": {
        "count": 2,
        "sort": "score desc, metadata_modified desc",
        "facets": {},
        "results": [
          gdp,
          population
        ],
        "search_facets": {}
      }
    })
    // 2. Call with `q=gdp` query.
    .get('/package_search?q=gdp&facet.field=organization&facet.field=groups&facet.field=tags&facet.field=res_format&facet.field=license_id&facet.limit=5')
    .reply(200, {
      "success": true,
      "result": {
        "count": 1,
        "sort": "score desc, metadata_modified desc",
        "facets": {},
        "results": [
          gdp
        ],
        "search_facets": {}
      }
    })

  // "package_show" mocks
  nock('http://mock.ckan/api/3/action', {'encodedQueryParams':true})
    .persist()
    .get('/package_show?id=gdp')
    .reply(200, {
      "success": true,
      "result": gdp
    })

  // "organization_show" mocks
}
