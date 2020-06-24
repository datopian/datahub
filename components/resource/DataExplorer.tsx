import Link from 'next/link';
import ErrorMessage from '../Error';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

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
  const resource = result.resources.find(
    (item) => item.name === variables.resource
  );

  return <>{JSON.stringify(resource)}</>;
}
