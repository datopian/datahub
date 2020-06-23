import Item from './Item';
import ErrorMessage from '../Error';
import { NetworkStatus } from 'apollo-client';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const QUERY = gql`
  query search($q: String, $sort: String) {
    search(q: $q, sort: $sort)
      @rest(type: "Search", path: "package_search?{args}") {
      result {
        results {
          name
          title
          organization {
            name
            title
          }
        }
      }
    }
  }
`;

export default function List({ variables }) {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(QUERY, {
    variables,
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true,
  });

  if (error) return <ErrorMessage message="Error loading search results." />;
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
