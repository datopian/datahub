import { useQuery } from '@apollo/react-hooks';
import ErrorMessage from '../Error';
import { GET_RESOURCES_QUERY } from '../../graphql/queries';

const columns = [
  {
    name: 'Name',
    key: 'name',
    render: ({ name, id }) => {
      name || id;
    },
  },
  {
    name: 'Title',
    key: 'title',
  },
  {
    name: 'Description',
    key: 'description',
  },
  {
    name: 'Format',
    key: 'format',
  },
  {
    name: 'Size',
    key: 'size',
  },
  {
    name: 'Created',
    key: 'created',
  },
  {
    name: 'Updated',
    key: 'last_modified',
  },
  {
    name: 'Download',
    key: 'download',
    render: ({ url, format }) => (
      <a
        href={url}
        className="bg-white hover:bg-gray-200 border text-black font-semibold py-2 px-4 rounded"
      >
        {format}
      </a>
    ),
  },
];

export default function About({ variables }) {
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
  const resource = result.resources.find(
    (item) => item.name === variables.resource
  );
  return (
    <>
      <table className="table-auto w-full text-sm text-left my-6">
        <thead>
          <tr>
            {columns.map(({ key, name }) => (
              <th key={key} className="px-4 py-2">
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {columns.map(({ key, render }) => (
              <td className="px-4 py-2">
                {(render && typeof render === 'function' && render(resource)) ||
                  resource[key]}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
}
