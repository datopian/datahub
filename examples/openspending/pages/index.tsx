import { promises as fs } from 'fs';
import path from 'path';
import {
  GithubProject,
  getProjectDataPackage,
  getProjectMetadata,
} from '../lib/octokit';
import getConfig from 'next/config';
import ExternalLinkIcon from '../components/icons/ExternalLinkIcon';
import TimeAgo from 'react-timeago';
import Link from 'next/link';
import { Hero } from '../components/Hero';
import { Header } from '../components/Header';
import { Container } from '../components/Container';
import { FiscalDataPackage } from '../lib/datapackage.interface';
import { loadDataPackage } from '../lib/loader';
import DatasetsSearch from '../components/DatasetsSearch';
import { Table } from '../components/Table';

export async function getStaticProps() {
  const jsonDirectory = path.join(process.cwd(), '/datasets.json');
  const repos = await fs.readFile(jsonDirectory, 'utf8');
  const github_pat = getConfig().serverRuntimeConfig.github_pat;
  const datapackages = await Promise.all(
    JSON.parse(repos).map(async (_repo: GithubProject) => {
      const datapackage = await getProjectDataPackage(
        _repo.owner,
        _repo.name,
        'main',
        github_pat
      );
      const repo = await getProjectMetadata(
        _repo.owner,
        _repo.name,
        github_pat
      );

      return {
        datapackage,
        repo,
      };
    })
  );

  const projects = datapackages.map(
    (item: { datapackage: FiscalDataPackage & { repo: string }; repo: any }) =>
      loadDataPackage(item.datapackage, item.repo)
  );

  return {
    props: {
      projects: JSON.stringify(projects),
    },
  };
}

export function Datasets({ projects }) {
  projects = JSON.parse(projects);

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <Hero />
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
            <DatasetsSearch datasets={projects} />
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Datasets;
