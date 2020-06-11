const nock = require('nock')

module.exports.initMocks = function() {
  // Uncomment this line if you want to record API calls
  // nock.recorder.rec()


  // "package_search" mocks
  nock('http://mock.ckan/api/3/action')
    .get('/package_search')
    .reply(200, {
      "success": true,
      "result": {
        "count": 2,
        "sort": "score desc, metadata_modified desc",
        "facets": {},
        "results": [
          {
            "name": "gdp"
          },
          {
            "name": "population"
          }
        ],
        "search_facets": {}
      }
    })

  // "package_show" mocks

  // "organization_show" mocks
}
