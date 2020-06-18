import { GetServerSideProps } from 'next';
import querystring from 'querystring';
import config from '../config';
import utils from '../utils';
import Head from 'next/head';
import Nav from '../components/home/Nav';
import Input from '../components/search/Input';
import Total from '../components/search/Total';
import Sort from '../components/search/Sort';
import List, { DEFAULT_SEARCH_QUERY } from '../components/search/List';
import { initializeApollo } from '../lib/apolloClient';

function Search({ ckanResult, datapackages, query }) {
  return (
    <>
      <Head>
        <title>Portal | Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className="p-6">
        <Input query={query} />
        <Total total={ckanResult.count} />
        <Sort />
        <List datapackages={datapackages} />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: DEFAULT_SEARCH_QUERY,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    unstable_revalidate: 1,
  };
  //
  // const query = context.query || {};
  // const ckanQuery = querystring.stringify(
  //   utils.convertToCkanSearchQuery(query)
  // );
  // const res = await fetch(
  //   `${config.get('DMS')}/api/3/action/package_search?${ckanQuery}`
  // );
  // const ckanResult = (await res.json()).result;
  // const datapackages = ckanResult.results.map((item) =>
  //   utils.ckanToDataPackage(item)
  // );
  //
  // return { props: { ckanResult, datapackages, query } };
};

export default Search;
