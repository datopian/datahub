/* eslint-disable jsx-a11y/anchor-is-valid */
import { useQuery } from '@apollo/react-hooks';
import { ErrorMessage } from '../_shared';
import { SEARCH_QUERY } from '../../graphql/queries';
import { Recent } from 'portal';

const RecentDataset: React.FC = () => {
  const { loading, error, data } = useQuery(SEARCH_QUERY, {
    variables: {
      sort: 'metadata_created desc',
      rows: 3,
    },
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true,
  });

  if (error) return <ErrorMessage message="Error loading search results." />;
  if (loading) return <div>Loading</div>;

  const { result } = data.search;

  return (
    <section className="my-10 mx-4 lg:my-20">
      <h1 className="text-2xl font-thin mb-4">Recent Datasets</h1>
      <Recent datasets={result.results} />
    </section>
  );
};

export default RecentDataset;
