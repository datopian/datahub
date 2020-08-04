import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import ErrorMessage from '../Error';
import { GET_RESOURCES_QUERY } from '../../graphql/queries';

export default function Resources({ variables }) {
  const { loading, error, data } = useQuery(GET_RESOURCES_QUERY, {
    variables,
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true,
  });

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
