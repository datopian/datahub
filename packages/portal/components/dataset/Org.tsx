import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import { ErrorMessage } from '../_shared';
import { GET_ORG_QUERY } from '../../graphql/queries';

const Org: React.FC<{ variables: any }> = ({ variables }) => {
  const { loading, error, data } = useQuery(GET_ORG_QUERY, {
    variables,
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true,
  });

  if (error) return <ErrorMessage message="Error loading dataset." />;
  if (loading) return <div>Loading</div>;

  const { organization } = data.dataset.result;
  return (
    <>
      {organization ? (
        <>
          <img
            src={
              organization.image_url ||
              'https://datahub.io/static/img/datahub-cube-edited.svg'
            }
            className="h-5 w-5 mr-2 inline-block"
            alt="org_img"
          />
          <Link href={`/@${organization.name}`}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="font-semibold text-primary underline">
              {organization.title || organization.name}
            </a>
          </Link>
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default Org;
