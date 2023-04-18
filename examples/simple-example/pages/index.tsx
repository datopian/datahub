import parse from '../lib/markdown';
import Project from '../lib/project';
import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';

export async function getStaticProps() {
  const jsonDirectory = path.join(
    process.cwd(),
    '/examples/simple-example/datasets.json'
  );
  const repos = await fs.readFile(jsonDirectory, 'utf8');

  const projects = await Promise.all(
    JSON.parse(repos).map(async (repo) => {
      const project = await Project.getFromGitHub(repo.owner, repo.repo);

      //  Defaults to README
      const content = project.readme ? project.readme : '';

      let { mdxSource, frontMatter, excerpt } = await parse(content, '.mdx');

      if (project.metadata?.resources) {
        frontMatter.layout = 'datapackage';
      }

      return {
        mdxSource,
        frontMatter,
        excerpt,
        project: project.serialize(),
      };
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
        <h2 className="text-2xl font-bold leading-10 tracking-tight text-indigo-500">
          My Datasets
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600">
          Here is a list of all my datasets for easy access and sharing
        </p>
        <div className="mt-20">
          {/*
          <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:grid-cols-3 lg:gap-x-10">
            {projects.map((project) => (
              <div>
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <Link
                    href={`@${project.project.owner}/${project.project.name}`}
                  >
                    {project.project.owner}/{project.project.name}
                  </Link>
                </dt>
                <dt className="text-base font-semibold leading-7 text-indigo-600">
                  <a
                    href={`https://github.com/${project.project.owner}/${project.project.name}`}
                  >
                    Github repo
                  </a>
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {project.excerpt !== '' ? project.excerpt : 'No description'}
                </dd>
              </div>
            ))}
          </dl> */}
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Dataset name
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
                        <a href={project.project.repo_metadata.html_url}>
                          {project.project.owner}/{project.project.name}
                        </a>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        {project.project.repo_metadata.description}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {formatter.format(
                          new Date(project.project.repo_metadata.updated_at)
                        )}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a
                          href={`/@${project.project.owner}/${project.project.name}`}
                          className="text-indigo-600 hover:text-indigo-900"
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
