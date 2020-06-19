import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const GET_NUMBER_OF_DATASETS = gql`
  query search($query: SearchQuery!) {
    search(query: $query) {
      result {
        count
      }
    }
  }
`;

export default function Total({ variables }) {
  const { loading, error, data } = useQuery(GET_NUMBER_OF_DATASETS, {
    variables,
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return <div>Loading</div>;

  const { result } = data.search;

  return (
    <h1 className="text-3xl font-semibold text-primary my-6 inline-block">
      {result.count} results found
    </h1>
  );
}
