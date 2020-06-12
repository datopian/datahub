const nock = require('nock')

const gdp = {
  "name": "gdp",
  "title": "Country, Regional and World GDP (Gross Domestic Product)",
  "notes": "Country, regional and world GDP in current US Dollars ($). Regional means collections of countries e.g. Europe & Central Asia. Data is sourced from the World Bank and turned into a standard normalized CSV.",
  "resources": [
    {
      "name": "gdp",
      "title": "GDP data",
      "format": "csv",
      "created": "2019-03-07T12:00:36.273495",
      "last_modified": "2020-05-07T12:00:36.273495"
    }
  ],
  "organization": {
    "title": "World Bank",
    "name": "world-bank",
    "description": "The World Bank is an international financial institution that provides loans and grants to the governments of poorer countries for the purpose of pursuing capital projects.",
    "created": "2019-03-07T11:51:13.758844",
    "image_url": "https://github.com/datahq/frontend/raw/master/public/img/avatars/world-bank.jpg"
  },
  "metadata_created": "2019-03-07T11:56:19.696257",
  "metadata_modified": "2019-03-07T12:03:58.817280"
}

const population = {
  "name": "population",
  "title": "World population data",
  "notes": "Population figures for countries, regions (e.g. Asia) and the world. Data comes originally from World Bank and has been converted into standard CSV.",
  "resources": [
    {
      "name": "population",
      "title": "Population data",
      "format": "csv",
      "created": "2019-03-07T12:00:36.273495",
      "last_modified": "2020-05-07T12:00:36.273495"
    }
  ],
  "organization": {
    "title": "World Bank",
    "name": "world-bank",
    "description": "The World Bank is an international financial institution that provides loans and grants to the governments of poorer countries for the purpose of pursuing capital projects.",
    "created": "2019-03-07T11:51:13.758844",
    "image_url": "https://github.com/datahq/frontend/raw/master/public/img/avatars/world-bank.jpg"
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
