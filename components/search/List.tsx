import Item from './Item';
import ErrorMessage from './Error';
import { NetworkStatus } from 'apollo-client';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const DEFAULT_SEARCH_QUERY = gql`
  query search($query: SearchQuery!) {
    search(query: $query) {
      result {
        results {
          name
          title
          notes
          organization {
            name
            title
            description
          }
        }
      }
    }
  }
`;

export default function List({ variables }) {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    DEFAULT_SEARCH_QUERY,
    {
      variables,
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  );

  if (error) return <ErrorMessage message="Error loading posts." />;
  if (loading) return <div>Loading</div>;

  const { result } = data.search;
  return (
    <ul>
      {result.results.map((pkg, index) => (
        <Item datapackage={pkg} key={index} />
      ))}
    </ul>
  );
}
