/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/display-name */
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import { Table, ErrorMessage } from '../_shared';
import { GET_RESOURCES_QUERY } from '../../graphql/queries';

const columns = [
  {
    name: 'File',
    key: 'file',
    render: ({ name: resName, title, parentName }) => (
      <Link href={`${parentName}/r/${resName}`}>
        <a className="underline">{title || resName}</a>
      </Link>
    ),
  },
  {
    name: 'Format',
    key: 'format',
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
    name: 'Link',
    key: 'link',
    render: ({ name: resName, parentName }) => (
      <Link href={`${parentName}/r/${resName}`}>
        <a className="underline">Preview</a>
      </Link>
    ),
  },
];

const Resources: React.FC<{ variables: any }> = ({ variables }) => {
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
      <Table
        columns={columns}
        data={result.resources.map((resource) => ({
          ...resource,
          parentName: result.name,
        }))}
      />
    </>
  );
};

export default Resources;
