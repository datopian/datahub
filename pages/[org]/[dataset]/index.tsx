import { GetServerSideProps } from 'next';
import { useQuery } from '@apollo/react-hooks';
import { initializeApollo } from '../../../lib/apolloClient';
import utils from '../../../utils';
import Head from 'next/head';
import Nav from '../../../components/home/Nav';
import About from '../../../components/dataset/About';
import Org from '../../../components/dataset/Org';
import Resources, {
  DEFAULT_DATASET_QUERY,
} from '../../../components/dataset/Resources';

function Dataset({ variables }) {
  const {
    data: {
      dataset: { result },
    },
  } = useQuery(DEFAULT_DATASET_QUERY, { variables });

  return (
    <>
      <Head>
        <title>Portal | {result.title || result.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className="p-6">
        <h1 className="text-3xl font-semibold text-primary mb-2">
          {result.title || result.name}
        </h1>
        <Org variables={variables} />
        <About variables={variables} />
        <Resources variables={variables} />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo();
  const variables = {
    id: context.query.dataset,
  };

  const apolloResponse = await apolloClient.query({
    query: DEFAULT_DATASET_QUERY,
    variables,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      variables,
    },
  };
};

export default Dataset;
