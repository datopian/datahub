import { useQuery } from '@apollo/react-hooks';
import { Table, ErrorMessage } from '../_shared';
import { GET_DATAPACKAGE_QUERY } from '../../graphql/queries';

const columns = [
  {
    name: 'Files',
    key: 'files',
    render: ({ resources }) => (resources && resources.length) || 0,
  },
  {
    name: 'Size',
    key: 'size',
  },
  {
    name: 'Format',
    key: 'format',
  },
  {
    name: 'Created',
    key: 'metadata_created',
  },
  {
    name: 'Updated',
    key: 'metadata_modified',
  },
  {
    name: 'License',
    key: 'license',
  },
  {
    name: 'Source',
    key: 'source',
  },
];

const About: React.FC<{ variables: any }> = ({ variables }) => {
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
  return <Table columns={columns} data={[result]} />;
};

export default About;
