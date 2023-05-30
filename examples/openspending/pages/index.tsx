import { getAllProjectsFromOrg } from '../lib/project';
import getConfig from 'next/config';
import { Hero } from '../components/Hero';
import { Container } from '../components/Container';
import { FiscalDataPackage } from '../lib/datapackage.interface';
import { loadDataPackage } from '../lib/loader';
import DatasetsSearch from '../components/DatasetsSearch';
import Layout from '../components/_shared/Layout';

export async function getStaticProps() {
  //  TODO: support other orgs
  // const orgsListPath = path.join(process.cwd(), '/orgs.json');
  // const orgs = await fs.readFile(orgsListPath, 'utf8');

  const github_pat = getConfig().serverRuntimeConfig.github_pat;

  const allProjects = await getAllProjectsFromOrg(
    'os-data',
    'main',
    github_pat
  );

  const projects = allProjects.results.map(
    (item: { datapackage: FiscalDataPackage & { repo: string }; repo: any }) =>
      loadDataPackage(item.datapackage, item.repo)
  );

  const availableCountries = projects
    .map((item) => item.countryCode)
    .filter((v) => v) //  Filters false values
    .filter((v, i, a) => a.indexOf(v) === i) //  Remove duplicates
    //  TODO: title should be the full name
    .map((code) => ({ code, title: code }));

  const minPeriod = projects.map(project => project.fiscalPeriod ? project.fiscalPeriod.start : null).filter(item => item !== null).sort()[0]
  const maxPeriod = projects.map(project => project.fiscalPeriod ? project.fiscalPeriod.end : null).filter(item => item !== null).sort().slice(-1)[0]

  return {
    props: {
      projects: JSON.stringify(projects),
      availableCountries,
      minPeriod,
      maxPeriod
    },
  };
}

export function Home({ projects, availableCountries, minPeriod, maxPeriod }) {
  projects = JSON.parse(projects);

  return (
    <Layout>
      <Hero
        countriesCount={availableCountries.length}
        datasetsCount={projects.length}
        filesCount={projects.reduce(
          (partialSum, a) => partialSum + a.files.length,
          0
        )}
      />
      <section className="py-20 sm:py-32">
        <Container>
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2
              id="datasets"
              className="font-display text-4xl font-medium tracking-tighter text-emerald-600 sm:text-5xl"
            >
              Datasets
            </h2>
            <p className="mt-4 font-display text-2xl tracking-tight text-emerald-900">
              Find spending data about countries all around the world.
            </p>
          </div>
          <div className="mt-10">
            <DatasetsSearch
              datasets={projects}
              availableCountries={availableCountries}
              minPeriod={minPeriod}
              maxPeriod={maxPeriod}
            />
          </div>
        </Container>
      </section>
    </Layout>
  );
}

export default Home;
