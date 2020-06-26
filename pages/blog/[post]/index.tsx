import { GetServerSideProps } from 'next';
import { initializeApollo } from '../../../lib/apolloClient';
import Head from 'next/head';
import Nav from '../../../components/home/Nav';
import Post from '../../../components/static/Post';
import gql from 'graphql-tag';

const QUERY = gql`
  query post($slug: String) {
    post(slug: $slug)
      @rest(type: "Post", path: "{args.slug}", endpoint: "wordpress") {
      title
      content
      excerpt
      slug
      date
      modified
    }
  }
`;

function PostItem({ variables }) {
  return (
    <>
      <Head>
        <title>Portal | {variables.slug}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className="p-6">
        <Post variables={variables} />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const variables = {
    slug: context.query.post,
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

export default PostItem;
