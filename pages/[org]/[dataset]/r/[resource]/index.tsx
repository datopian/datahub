import { GetServerSideProps } from 'next';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { initializeApollo } from '../../../../../lib/apolloClient';
import utils from '../../../../../utils';
import Head from 'next/head';
import Nav from '../../../../../components/home/Nav';
import About from '../../../../../components/resource/About';
import DataExplorer from '../../../../../components/resource/DataExplorer';

const QUERY = gql`
  query dataset($id: String) {
    dataset(id: $id) @rest(type: "Response", path: "package_show?{args}") {
      result {
        resources {
          name
          id
          title
          description
          format
          size
          created
          last_modified
          url
        }
      }
    }
  }
`;

function Resource({ variables }) {
  const { data, loading } = useQuery(QUERY, { variables });

  if (loading) return <div>Loading</div>;
  const result = data.dataset.result;
  // Find right resource
  const resource = result.resources.find(
    (item) => item.name === variables.resource
  );
  return (
    <>
      <Head>
        <title>Portal | {resource.title || resource.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className="p-6">
        <h1 className="text-3xl font-semibold text-primary mb-2">
          {resource.title || resource.name}
        </h1>
        <About variables={variables} />
        <DataExplorer variables={variables} />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo();
  const variables = {
    id: context.query.dataset,
    resource: context.query.resource,
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

export default Resource;
