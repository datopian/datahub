import Item from './Item';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const DEFAULT_SEARCH_QUERY = gql`
  search($query: SearchQuery!) {
    result {
      results
    }
  }
`;

export default function List() {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    DEFAULT_SEARCH_QUERY,
    {
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  );

  if (error) return <ErrorMessage message="Error loading posts." />;
  if (loading) return <div>Loading</div>;

  const { result } = data;

  return (
    <ul>
      {result.map((datapackage, index) => (
        <Item datapackage={datapackage} key={index} />
      ))}
    </ul>
  );
}
