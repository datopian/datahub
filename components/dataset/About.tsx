import ErrorMessage from '../Error';
import { NetworkStatus } from 'apollo-client';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const GET_DATAPACKAGE_QUERY = gql`
  query dataset($id: String) {
    dataset(id: $id) @rest(type: "Response", path: "package_show?{args}") {
      result {
        name
        title
        size
        metadata_created
        metadata_modified
        resources {
          name
        }
      }
    }
  }
`;

export default function About({ variables }) {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    GET_DATAPACKAGE_QUERY,
    {
      variables,
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  );

  if (error) return <ErrorMessage message="Error loading dataset." />;
  if (loading) return <div>Loading</div>;

  const { result } = data.dataset;
  return (
    <>
      <table className="table-auto w-full text-sm text-left my-6">
        <thead>
          <tr>
            <th className="px-4 py-2">Files</th>
            <th className="px-4 py-2">Size</th>
            <th className="px-4 py-2">Format</th>
            <th className="px-4 py-2">Created</th>
            <th className="px-4 py-2">Updated</th>
            <th className="px-4 py-2">License</th>
            <th className="px-4 py-2">Source</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2">{result.resources.length}</td>
            <td className="px-4 py-2">{result.size || 'NA'}</td>
            <td className="px-4 py-2"></td>
            <td className="px-4 py-2">{result.metadata_created}</td>
            <td className="px-4 py-2">{result.metadata_modified}</td>
            <td className="px-4 py-2"></td>
            <td className="px-4 py-2"></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
