const { GraphQLScalarType } = require('graphql');
const { ApolloServer } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');
const { importSchema } = require('graphql-import');
const typeDefs = importSchema('./schema.graphql');

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

const datapackages = [gdp, population];

const resolvers = {
  Query: {
    search: (parent, { query }) => ({
      success: true,
      result: {
        count: 2,
        sort: 'score desc, metadata_modified desc',
        facets: {},
        results: datapackages,
        search_facets: {},
      },
    }),
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  mocks: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
