import { promises as fs } from 'fs';
import path from 'path';
import { getProject } from '../lib/octokit';
import getConfig from 'next/config';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export async function getStaticProps() {
  const jsonDirectory = path.join(process.cwd(), '/datasets.json');
  const repos = await fs.readFile(jsonDirectory, 'utf8');
  const github_pat = getConfig().serverRuntimeConfig.github_pat;

  const projects = await Promise.all(
    JSON.parse(repos).map(async (repo) => {
      const project = await getProject(repo, github_pat);
      return { ...project, repo_config: repo };
    })
  );
  return {
    props: {
      projects,
    },
  };
}

const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  timeZone: 'UTC',
});

export default function Datasets({ projects }) {
  return (
    <>
      <NavBar />
      <div className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold leading-6 text-indigo-600">
              Datasets
            </h1>
            <p className="mt-2 text-sm text-gray-700 py-8">
              Here is a list of all my datasets for easy access and sharing all
              stored on multiple github accounts and repos and joined together
              here
            </p>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Repo
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
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">More info</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {projects.map((project) => (
                      <tr key={project.id}>
                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {project.repo_config.name
                            ? project.repo_config.name
                            : project.full_name +
                              (project.base_path === '/'
                                ? ''
                                : '/' + project.base_path)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <a href={project.html_url}>{project.full_name}</a>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          {project.repo_config.description
                            ? project.repo_config.description
                            : project.description}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {formatter.format(new Date(project.last_updated))}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a
                            href={`/@${project.repo_config.owner}/${
                              project.repo_config.repo
                            }/${
                              project.base_path === '/' ? '' : project.base_path
                            }`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            More info
                            <span className="sr-only">
                              on,
                              {project.repo_config.name
                                ? project.repo_config.name
                                : project.full_name +
                                  (project.base_path === '/'
                                    ? ''
                                    : '/' + project.base_path)}
                            </span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
