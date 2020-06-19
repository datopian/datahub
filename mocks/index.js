const nock = require('nock');

const gdp = {
  name: 'gdp',
  title: 'Country, Regional and World GDP (Gross Domestic Product)',
  notes:
    'Country, regional and world GDP in current US Dollars ($). Regional means collections of countries e.g. Europe & Central Asia. Data is sourced from the World Bank and turned into a standard normalized CSV.',
  resources: [
    {
      name: 'gdp',
      id: 'gdp',
      title: 'GDP data',
      format: 'csv',
      created: '2019-03-07T12:00:36.273495',
      last_modified: '2020-05-07T12:00:36.273495',
      datastore_active: false,
      url: 'http://mock.filestore/gdp.csv',
    },
  ],
  organization: {
    title: 'World Bank',
    name: 'world-bank',
    description:
      'The World Bank is an international financial institution that provides loans and grants to the governments of poorer countries for the purpose of pursuing capital projects.',
    created: '2019-03-07T11:51:13.758844',
    image_url:
      'https://github.com/datahq/frontend/raw/master/public/img/avatars/world-bank.jpg',
  },
  metadata_created: '2019-03-07T11:56:19.696257',
  metadata_modified: '2019-03-07T12:03:58.817280',
};

const population = {
  name: 'population',
  title: 'World population data',
  notes:
    'Population figures for countries, regions (e.g. Asia) and the world. Data comes originally from World Bank and has been converted into standard CSV.',
  resources: [
    {
      name: 'population',
      id: 'population',
      title: 'Population data',
      format: 'csv',
      created: '2019-03-07T12:00:36.273495',
      last_modified: '2020-05-07T12:00:36.273495',
      datastore_active: true,
      url: 'http://mock.filestore/population.csv',
    },
  ],
  organization: {
    title: 'World Bank',
    name: 'world-bank',
    description:
      'The World Bank is an international financial institution that provides loans and grants to the governments of poorer countries for the purpose of pursuing capital projects.',
    created: '2019-03-07T11:51:13.758844',
    image_url:
      'https://github.com/datahq/frontend/raw/master/public/img/avatars/world-bank.jpg',
  },
};

const recentDataset = {
  license_title: 'Creative Commons Attribution',
  maintainer: '',
  relationships_as_object: [],
  private: false,
  maintainer_email: '',
  num_tags: 0,
  id: '9b960530-728c-4a07-8f96-c5f89b545d05',
  metadata_created: '2020-06-19T07:30:03.796668',
  metadata_modified: '2020-06-19T07:30:11.392832',
  author: '',
  author_email: '',
  state: 'active',
  version: '',
  creator_user_id: '0d23e029-ddd5-4909-a2cd-5af7fe8d6e9c',
  type: 'dataset',
  resources: [
    {
      mimetype: null,
      cache_url: null,
      hash: '',
      description: '',
      name: 'gettyimages-954867550.jpg',
      format: 'JPEG',
      url:
        'https://demo.ckan.org/pl/dataset/9b960530-728c-4a07-8f96-c5f89b545d05/resource/ac28179c-023e-4c17-af3c-00cbb81f5dcb/download/gettyimages-954867550.jpg',
      datastore_active: false,
      cache_last_updated: null,
      package_id: '9b960530-728c-4a07-8f96-c5f89b545d05',
      created: '2020-06-19T07:30:10.786597',
      state: 'active',
      mimetype_inner: null,
      last_modified: null,
      position: 0,
      revision_id: 'a810e134-79ba-4ab7-a7c4-f60e2fb21d40',
      url_type: 'upload',
      id: 'ac28179c-023e-4c17-af3c-00cbb81f5dcb',
      resource_type: null,
      size: null,
    },
  ],
  num_resources: 1,
  tags: [],
  groups: [],
  license_id: 'cc-by',
  relationships_as_subject: [],
  organization: null,
  name: 'sdfasdasda',
  isopen: true,
  url: '',
  notes: 'sdf',
  owner_org: null,
  extras: [],
  license_url: 'http://www.opendefinition.org/licenses/cc-by',
  title: 'sdf',
  revision_id: 'a810e134-79ba-4ab7-a7c4-f60e2fb21d40',
};

module.exports.initMocks = function () {
  // Uncomment this line if you want to record API calls
  // nock.recorder.rec()

  // "package_search" mocks
  nock('http://mock.ckan/api/3/action', { encodedQueryParams: true })
    .persist()
    // 1. Call without query.
    .get(
      '/package_search?facet.field=organization&facet.field=groups&facet.field=tags&facet.field=res_format&facet.field=license_id&facet.limit=5'
    )
    .reply(200, {
      success: true,
      result: {
        count: 2,
        sort: 'score desc, metadata_modified desc',
        facets: {},
        results: [gdp, population],
        search_facets: {},
      },
    })
    // 2. Call with `q=gdp` query.
    .get(
      '/package_search?q=gdp&facet.field=organization&facet.field=groups&facet.field=tags&facet.field=res_format&facet.field=license_id&facet.limit=5'
    )
    .reply(200, {
      success: true,
      result: {
        count: 1,
        sort: 'score desc, metadata_modified desc',
        facets: {},
        results: [gdp],
        search_facets: {},
      },
    });

  // "package_show" mocks
  nock('http://mock.ckan/api/3/action', { encodedQueryParams: true })
    .persist()
    .get('/package_show?id=gdp')
    .reply(200, {
      success: true,
      result: gdp,
    })
    .get('/package_show?id=population')
    .reply(200, {
      success: true,
      result: population,
    });

  // recent datapackages
  nock('http://mock.ckan/api/3/action', { encodedQueryParams: true })
    .persist()
    .get('/package_search?sort=metadata_created%20desc')
    .reply(200, {
      success: true,
      result: {
        success: true,
        result: {
          count: 1923,
          sort: 'metadata_created desc',
          facets: {},
          results: [recentDataset],
          search_facets: {},
        },
      },
    });

  // "datastore_search" mocks
  nock('http://mock.ckan/api/3/action', { encodedQueryParams: true })
    .persist()
    .get('/datastore_search?resource_id=population')
    .reply(200, {
      success: true,
      result: {
        records: [
          {
            'Country Code': 'ARB',
            'Country Name': 'Arab World',
            Value: 92197753,
            Year: 1960,
          },
          {
            'Country Code': 'ARB',
            'Country Name': 'Arab World',
            Value: 94724510,
            Year: 1961,
          },
          {
            'Country Code': 'ARB',
            'Country Name': 'Arab World',
            Value: 97334442,
            Year: 1962,
          },
        ],
      },
    });

  // Filestore mocks
  nock('http://mock.filestore', { encodedQueryParams: true })
    .persist()
    .get('/gdp.csv')
    .reply(200, 'a,b,c\n1,2,3\n4,5,6\n');
};
