import { useQuery } from '@apollo/react-hooks';
import ErrorMessage from '../Error';
import { GET_DATAPACKAGE_QUERY } from '../../graphql/queries';

const columns = [
  {
    name: 'Files',
    render: ({ resources }) => (resources && resources.length) || 0,
  },
  {
    name: 'Size',
    render: ({ size }) => size || 'N/A',
  },
  {
    name: 'Format',
    render: () => null,
  },
  {
    name: 'Created',
    render: ({ metadata_created: created }) => created || 'N/A',
  },
  {
    name: 'Updated',
    render: ({ metadata_modified: updated }) => updated || 'N/A',
  },
  {
    name: 'License',
    render: () => null,
  },
  {
    name: 'Source',
    render: () => null,
  },
];

export default function About({ variables }) {
  const { loading, error, data } = useQuery(GET_DATAPACKAGE_QUERY, {
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
      <table className="table-auto w-full text-sm text-left my-6">
        <thead>
          <tr>
            {columns.map(({ name }) => (
              <th key={name} className="px-4 py-2">
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {columns.map(({ name, render }) => (
              <td key={name} className="px-4 py-2">
                {render(result)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
}
