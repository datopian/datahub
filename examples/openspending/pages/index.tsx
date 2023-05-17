import { promises as fs } from 'fs';
import path from 'path';
import { GithubProject, getProjectDataPackage } from '../lib/octokit';
import getConfig from 'next/config';
import ExternalLinkIcon from '../components/icons/ExternalLinkIcon';
import TimeAgo from 'react-timeago';
import Link from 'next/link';
import { Hero } from '../components/Hero';
import { Header } from '../components/Header';
import { Container } from '../components/Container';
import { FiscalDataPackage } from '../lib/datapackage.interface';
import { loadDataPackage } from '../lib/loader';
import { Project } from '../lib/project.interface';
import { Index } from 'flexsearch';
import { useForm } from 'react-hook-form';

export async function getStaticProps() {
  const jsonDirectory = path.join(process.cwd(), '/datasets.json');
  const repos = await fs.readFile(jsonDirectory, 'utf8');
  const github_pat = getConfig().serverRuntimeConfig.github_pat;
  const datapackages = await Promise.all(
    JSON.parse(repos).map(
      async (_repo: GithubProject) =>
        await getProjectDataPackage(_repo.owner, _repo.name, 'main', github_pat)
    )
  );
  const projects = datapackages.map(
    (datapackage: FiscalDataPackage & { repo: string }) =>
      loadDataPackage(datapackage, 'os-data', datapackage.name)
  );
  return {
    props: {
      projects,
    },
  };
}

export function Datasets({ projects }) {
  const index = new Index({ tokenize: 'full' });
  projects.forEach((project: Project) =>
    index.add(
      project.name,
      `${project.repo} ${project.name} ${project.title} ${project.author} ${project.title} ${project.cityCode} ${project.fiscalPeriod?.start} ${project.fiscalPeriod?.end}`
    )
  );
  const { register, watch, handleSubmit, reset } = useForm({
    defaultValues: {
      searchTerm: '',
    },
  });
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
          <div className="mt-5">
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                placeholder="Search here"
                aria-label="Hate speech on Twitter"
                {...register('searchTerm')}
                className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-600 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 sm:text-sm"
              />
            </div>
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Repository
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Author
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Fiscal Year
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {projects
                      .filter((project: Project) =>
                        watch().searchTerm && watch().searchTerm !== ''
                          ? index
                              .search(watch().searchTerm)
                              .includes(project.name)
                          : true
                      )
                      .map((project: Project) => (
                        <tr key={project.name}>
                          <td className="whitespace-nowrap px-3 py-6 text-sm text-gray-500">
                            {project.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-6 text-sm group text-gray-500 hover:text-gray-900 transition-all duration-250">
                            <a
                              href={`https://github.com/${project.owner.name}/${project.repo.name}`}
                              target="_blank"
                              className="flex items-center"
                            >
                              @{project.owner.name}/{project.repo.name}{' '}
                              <ExternalLinkIcon className="ml-1" />
                            </a>
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500">
                            {project.author}
                          </td>
                          {project.fiscalPeriod ? (
                            <td className="whitespace-nowrap px-3 py-6 text-sm text-gray-500">
                              {project.fiscalPeriod.start} -{' '}
                              {project.fiscalPeriod.end}
                            </td>
                          ) : (
                            <td className="whitespace-nowrap px-3 py-6 text-sm text-gray-500">
                              No data
                            </td>
                          )}
                          <td className="relative whitespace-nowrap py-6 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <a
                              href={`/@${project.owner.name}/${project.repo.name}/`}
                              className="border border-gray-900 text-gray-900 px-4 py-2 transition-all hover:bg-gray-900 hover:text-white"
                            >
                              info
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Datasets;
