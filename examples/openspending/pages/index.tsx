import { promises as fs } from 'fs';
import path from 'path';
import { getProject } from '../lib/octokit';
import getConfig from 'next/config';
import ExternalLinkIcon from '../components/icons/ExternalLinkIcon';
import TimeAgo from 'react-timeago';
import Link from 'next/link';
import { Hero } from '../components/Hero';
import { Header } from '../components/Header';
import { Container } from '../components/Container';

export async function getStaticProps() {
  const jsonDirectory = path.join(
    process.cwd(),
    '/datasets.json'
  );
  const repos = await fs.readFile(jsonDirectory, 'utf8');
  const github_pat = getConfig().serverRuntimeConfig.github_pat;

  const projects = await Promise.all(
    (JSON.parse(repos)).map(async (repo) => {
      console.log(repo);
      const project = await getProject(repo, github_pat);
      console.log(project);
      return { ...project, repo_config: repo };
    })
  );

  return {
    props: {
      projects,
    },
  };
}

export function Datasets({ projects }) {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <Hero />
      <section
        className="py-20 sm:py-32"
      >
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
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Last updated
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {projects.map((project) => (
                      <tr key={project.id}>
                        <td className="whitespace-nowrap px-3 py-6 text-sm text-gray-500">
                          {project.repo_config.name
                            ? project.repo_config.name
                            : project.full_name + (project.base_path === '/' ? '' : '/' + project.base_path)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-6 text-sm group text-gray-500 hover:text-gray-900 transition-all duration-250">
                          <a href={project.html_url} target="_blank" className='flex items-center'>@{project.full_name} <ExternalLinkIcon className='ml-1' /></a>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          {project.repo_config.description
                            ? project.repo_config.description
                            : project.description}
                        </td>
                        <td className="whitespace-nowrap px-3 py-6 text-sm text-gray-500">
                          <TimeAgo date={new Date(project.last_updated)} />
                        </td>
                        <td className="relative whitespace-nowrap py-6 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <a
                            href={`/@${project.repo_config.owner}/${project.repo_config.repo}/${project.base_path === '/' ? '' : project.base_path}`}
                            className='border border-gray-900 text-gray-900 px-4 py-2 transition-all hover:bg-gray-900 hover:text-white'
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
