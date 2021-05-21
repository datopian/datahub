import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { initializeApollo } from '../lib/apolloClient';
import RecentDataset from '../components/home/Recent';
import SearchForm from '../components/search/Form';
import { SEARCH_QUERY } from '../graphql/queries';
import { loadNamespaces } from './_app';
import useTranslation from 'next-translate/useTranslation';
import NavBar from '../components/home/Nav';

const Home: React.FC<{ locale: any; locales: any }> = ({
  locale,
  locales,
}) => {
  const { t } = useTranslation();
  const navMenu = [
    { title: 'Blog', path: '/blog' },
    { title: 'Search', path: '/search' },
    { title: 'Docs', path: 'http://tech.datopian.com/frontend/' },
    { title: 'GitHub', path: 'https://github.com/datopian/portal' },
  ];
  return (
    <>
      <div className="container mx-auto">
        <Head>
          <title>{t(`common:title`)}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBar logo={'/images/logo.svg'} navMenu={navMenu} />
        <section className="flex justify-center items-center flex-col mt-8 mx-4 lg:flex-row">
          <div>
            <h1 className="text-4xl mb-3 font-thin">
              Find, Share and Publish <br /> Quality Data with{' '}
              <span className="text-orange-500">Datahub</span>
            </h1>
            <p className="text-md font-light mb-3 w-4/5">
              {t(`common:description`)}
            </p>
            <SearchForm />
          </div>
          <div className="mt-4">
            <img src="/images/banner.svg" className="w-4/5" alt="banner_img" />
          </div>
        </section>
        <RecentDataset />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  locales,
}) => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: SEARCH_QUERY,
    variables: {
      sort: 'metadata_created desc',
      rows: 3,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      _ns: await loadNamespaces(['common'], locale),
      locale,
      locales,
    },
  };
};

export default Home;
