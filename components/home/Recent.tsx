import Link from 'next/link';
import ErrorMessage from '../Error';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const QUERY = gql`
  query search($q: String, $sort: String) {
    search(q: $q, sort: $sort)
      @rest(type: "Search", path: "package_search?{args}") {
      result {
        results {
          name
          title
          organization {
            name
            title
            description
          }
        }
      }
    }
  }
`;

function Recent() {
  const { loading, error, data } = useQuery(QUERY, {
    variables: { sort: 'metadata_created desc' },
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
      <div className="flex flex-col lg:flex-row">
        {result.results.map((resource, index) => (
          <div
            key={index}
            className="border px-4 mb-4 mr-3 border-gray-100 w-5/6 shadow-sm"
          >
            <h1 className="text-2xl font-thin">{resource.title}</h1>
            <p className="text-gray-500">{resource.organization.description}</p>
            <Link
              href={`/@${
                resource.organization ? resource.organization.name : 'dataset'
              }/${resource.name}`}
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
}

export default Recent;
