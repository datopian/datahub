import Link from 'next/link';
import ErrorMessage from '../Error';
import { NetworkStatus } from 'apollo-client';
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

export default function About({ variables }) {
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
  return (
    <>
      <table className="table-auto w-full text-sm text-left my-6">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Format</th>
            <th className="px-4 py-2">Size</th>
            <th className="px-4 py-2">Created</th>
            <th className="px-4 py-2">Updated</th>
            <th className="px-4 py-2">Download</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2">{resource.name || resource.id}</td>
            <td className="px-4 py-2">{resource.title || ''}</td>
            <td className="px-4 py-2">{resource.description || ''}</td>
            <td className="px-4 py-2">{resource.format}</td>
            <td className="px-4 py-2">{resource.size}</td>
            <td className="px-4 py-2">{resource.created}</td>
            <td className="px-4 py-2">{resource.last_modified || ''}</td>
            <td className="px-4 py-2">
              <a
                href={resource.url}
                className="bg-white hover:bg-gray-200 border text-black font-semibold py-2 px-4 rounded"
              >
                {resource.format}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
