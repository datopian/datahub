import { promises as fs } from 'fs';
import path from 'path';
import { getProject } from '../lib/octokit';
import getConfig from 'next/config';

export async function getStaticProps() {
  const project_name = getConfig().serverRuntimeConfig.project_name;
  const jsonDirectory = path.join(
    process.cwd(),
    `/examples/${project_name}/datasets.json`
  );
  const repos = await fs.readFile(jsonDirectory, 'utf8');
  const github_pat = getConfig().serverRuntimeConfig.github_pat;

  const projects = await Promise.all(
    (JSON.parse(repos)).map(async (repo) => {
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
  minute: 'numeric',
  second: 'numeric',
  timeZone: 'UTC',
});

export function Datasets({ projects }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <h2 className="text-2xl font-bold leading-10 tracking-tight">
          My Datasets
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600">
          Here is a list of all my datasets for easy access and sharing
        </p>
        <div className="mt-20">
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
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    ></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {projects.map((project) => (
                    <tr>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {project.repo_config.name
                          ? project.repo_config.name
                          : project.full_name + (project.base_path === '/' ? '' : '/' + project.base_path)}
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
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a
                          href={`/@${project.repo_config.owner}/${project.repo_config.repo}/${project.base_path === '/' ? '' : project.base_path}`}
                        >
                          More info
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
  );
}

export default Datasets;
