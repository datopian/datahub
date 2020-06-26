import { GetServerSideProps } from 'next';
import { initializeApollo } from '../../../lib/apolloClient';
import Head from 'next/head';
import Nav from '../../../components/home/Nav';
import Page from '../../../components/static/Page';
import gql from 'graphql-tag';

const QUERY = gql`
  query page($slug: String) {
    page(slug: $slug)
      @rest(type: "Page", path: "{args.slug}", endpoint: "wordpress") {
      title
      content
      excerpt
      slug
      date
      modified
    }
  }
`;

function PageItem({ variables }) {
  return (
    <>
      <Head>
        <title>Portal | {variables.slug}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className="p-6">
        <Page variables={variables} />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const variables = {
    slug: context.query.page,
  };

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

export default PageItem;
