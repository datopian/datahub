/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import { ErrorMessage } from '../_shared';
import { SEARCH_QUERY } from '../../graphql/queries';

const Recent: React.FC = () => {
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
      <div className="recent flex flex-col lg:flex-row">
        {result.results.map((dataset, index) => (
          <div
            key={index}
            className="border px-4 mb-4 mr-3 border-gray-100 w-5/6 shadow-sm"
          >
            <h1 className="text-2xl font-thin">{dataset.title}</h1>
            <p className="text-gray-500">
              {dataset.organization && dataset.organization.description}
            </p>
            <Link
              href={`/@${
                dataset.organization ? dataset.organization.name : 'dataset'
              }/${dataset.name}`}
            >
              <a className="pt-3 flex justify-end text-orange-500">
                View Dataset
              </a>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Recent;
