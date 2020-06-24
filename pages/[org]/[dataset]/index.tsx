import { GetServerSideProps } from 'next';
import { useQuery } from '@apollo/react-hooks';
import { initializeApollo } from '../../../lib/apolloClient';
import utils from '../../../utils';
import Head from 'next/head';
import Nav from '../../../components/home/Nav';
import About from '../../../components/dataset/About';
import Org from '../../../components/dataset/Org';
import Resources from '../../../components/dataset/Resources';
import gql from 'graphql-tag';

const QUERY = gql`
  query dataset($id: String) {
    dataset(id: $id) @rest(type: "Response", path: "package_show?{args}") {
      result {
        name
        title
        size
        metadata_created
        metadata_modified
        resources {
          name
          title
          format
          created
          last_modified
        }
        organization {
          name
          title
          image_url
        }
      }
    }
  }
`;

function Dataset({ variables }) {
  const { data, loading } = useQuery(QUERY, { variables });

  if (loading) return <div>Loading</div>;
  const { result } = data.dataset;

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

export default Dataset;
