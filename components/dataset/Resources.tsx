import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import ErrorMessage from '../Error';
import { GET_RESOURCES_QUERY } from '../../graphql/queries';

const columns = [
  {
    name: 'File',
    render: ({ name: resName, title }, { name }) => (
      <Link href={`${name}/r/${resName}`}>
        <a className="underline">{title || resName}</a>
      </Link>
    ),
  },
  {
    name: 'Format',
    render: ({ format }) => format,
  },
  {
    name: 'Created',
    render: ({ created }) => created,
  },
  {
    name: 'Updated',
    render: ({ last_modified }) => last_modified,
  },
  {
    name: 'Link',
    render: ({ name }, { name: resName }) => (
      <Link href={`${name}/r/${resName}`}>
        <a className="underline">Preview</a>
      </Link>
    ),
  },
];
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
            {columns.map(({ name }) => (
              <th className="px-4 py-2">{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Do not use array index as key */}
          {result.resources.map((resource) => (
            <tr key={resource.id}>
              {columns.map(({ name, render }) => (
                <td key={name} className="px-4 py-2">
                  {render(resource, result)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
