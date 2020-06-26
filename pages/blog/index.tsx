import { GetServerSideProps } from 'next';
import { initializeApollo } from '../../lib/apolloClient';
import Head from 'next/head';
import Nav from '../../components/home/Nav';
import List from '../../components/static/List';
import gql from 'graphql-tag';

const QUERY = gql`
  query posts {
    posts @rest(type: "Posts", path: "", endpoint: "wordpress-posts") {
      found
      posts
      meta
    }
  }
`;

function PostList() {
  return (
    <>
      <Head>
        <title>Portal | Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className="p-6">
        <List />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: QUERY,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default PostList;
