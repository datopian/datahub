import { GetServerSideProps } from 'next';
import { initializeApollo } from '../lib/apolloClient';
import utils from '../utils';
import Head from 'next/head';
import Nav from '../components/home/Nav';
import Form from '../components/search/Form';
import Total from '../components/search/Total';
import List from '../components/search/List';
import gql from 'graphql-tag';

const QUERY = gql`
  query search($q: String, $sort: String) {
    search(q: $q, sort: $sort)
      @rest(type: "Search", path: "package_search?{args}") {
      result {
        count
        results {
          name
          title
          organization {
            name
            title
          }
        }
      }
    }
  }
`;

function Search({ variables }) {
  return (
    <>
      <Head>
        <title>Portal | Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className="p-6">
        <Form />
        <Total variables={variables} />
        <List variables={variables} />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query || {};
  const variables = utils.convertToCkanSearchQuery(query);

  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: QUERY,
    variables,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      variables,
    },
  };
};

export default Search;
