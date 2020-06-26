import ErrorMessage from '../Error';
import parse from 'html-react-parser';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const QUERY = gql`
  query posts {
    posts @rest(type: "Posts", path: "", endpoint: "wordpress-posts") {
      found
      posts
    }
  }
`;

export default function List() {
  const { loading, error, data } = useQuery(QUERY, {
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true,
  });

  if (error) return <ErrorMessage message="Error loading search results." />;
  if (loading) return <div>Loading</div>;

  const { posts, found } = data.posts;

  return (
    <>
      <h1 className="text-3xl font-semibold text-primary my-6 inline-block">
        {found} posts found
      </h1>
      {posts.map((post, index) => (
        <div key={index}>
          <a
            href={`/blog/${post.slug}`}
            className="text-2xl font-semibold text-primary my-6 inline-block"
          >
            {parse(post.title)}
          </a>
          <p>{parse(post.excerpt)}</p>
        </div>
      ))}
    </>
  );
}
