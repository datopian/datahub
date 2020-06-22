import Link from 'next/link';
import ErrorMessage from '../Error';
import { NetworkStatus } from 'apollo-client';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const QUERY = gql`
  query dataset($id: String!) {
    dataset(id: $id) {
      result {
        resources {
          name
          id
          url
          format
          title
          created
          last_modified
        }
      }
    }
  }
`;

export default function DataExplorer({ variables }) {
  const { loading, error, data } = useQuery(QUERY, {
    variables,
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true,
  });

  if (error) return <ErrorMessage message="Error loading dataset." />;
  if (loading) return <div>Loading</div>;

  const { result } = data.dataset;
  const resource = result.resources[0];

  return <>{JSON.stringify(resource)}</>;
}
