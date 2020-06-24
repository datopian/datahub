import Link from 'next/link';
import ErrorMessage from '../Error';
import { NetworkStatus } from 'apollo-client';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const GET_DATAPACKAGE_QUERY = gql`
  query dataset($id: String) {
    dataset(id: $id) @rest(type: "Response", path: "package_show?{args}") {
      result {
        name
        resources {
          name
          title
          format
          created
          last_modified
        }
      }
    }
  }
`;

export default function Resources({ variables }) {
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
      <h3 className="text-xl font-semibold">Data Files</h3>
      <table className="table-auto w-full text-sm text-left mb-6">
        <thead>
          <tr>
            <th className="px-4 py-2">File</th>
            <th className="px-4 py-2">Format</th>
            <th className="px-4 py-2">Created</th>
            <th className="px-4 py-2">Updated</th>
            <th className="px-4 py-2">Link</th>
          </tr>
        </thead>
        <tbody>
          {result.resources.map((resource, index) => (
            <tr key={index}>
              <td className="px-4 py-2">
                <Link href={`${result.name}/r/${resource.name}`}>
                  <a className="underline">{resource.title || resource.name}</a>
                </Link>
              </td>
              <td className="px-4 py-2">{resource.format}</td>
              <td className="px-4 py-2">{resource.created}</td>
              <td className="px-4 py-2">{resource.last_modified}</td>
              <td className="px-4 py-2">
                <Link href={`${result.name}/r/${resource.name}`}>
                  <a className="underline">Preview</a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
