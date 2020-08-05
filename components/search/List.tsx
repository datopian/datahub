import { useQuery } from '@apollo/react-hooks';
import Item from './Item';
import { ErrorMessage } from '../_shared';
import { SEARCH_QUERY } from '../../graphql/queries';

const List: React.FC<{ variables: any }> = ({ variables }) => {
  const { loading, error, data } = useQuery(SEARCH_QUERY, {
    variables,
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true,
  });

  if (error) return <ErrorMessage message="Error loading search results." />;
  if (loading) return <div>Loading</div>;
  const { result } = data.search;
  return (
    <ul>
      {result.results.map((pkg, index) => (
        <Item datapackage={pkg} key={index} />
      ))}
    </ul>
  );
};

export default List;
