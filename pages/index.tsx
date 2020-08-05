import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { initializeApollo } from '../lib/apolloClient';
import Nav from '../components/home/Nav';
import Recent from '../components/home/Recent';
import Form from '../components/search/Form';
import { SEARCH_QUERY } from '../graphql/queries';

const Home: React.FC = () => (
  <div className="container mx-auto">
    <Head>
      <title>Portal</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Nav />
    <section className="flex justify-center items-center flex-col mt-8 mx-4 lg:flex-row">
      <div>
        <h1 className="text-4xl mb-3 font-thin">
          Find, Share and Publish <br /> Quality Data with{' '}
          <span className="text-orange-500">Datahub</span>
        </h1>
        <p className="text-md font-light mb-3 w-4/5">
          At Datahub, we have over thousands of datasets for free and a Premium
          Data Service for additional or customised data with guaranteed
          updates.
        </p>
        <Form />
      </div>
      <div className="mt-4">
        <img src="/images/banner.svg" className="w-4/5" alt="banner_img" />
      </div>
    </section>
    <Recent />
  </div>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: SEARCH_QUERY,
    variables: {
      sort: 'metadata_created desc',
      rows: 3,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default Home;
