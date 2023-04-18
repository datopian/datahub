import parse from '../lib/markdown';
import Project from '../lib/project';
import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';

export async function getStaticProps() {
  const jsonDirectory = path.join(
    process.cwd(),
    '/examples/simple-example/repos.json'
  );
  const repos = await fs.readFile(jsonDirectory, 'utf8');

  const projects = await Promise.all(
    JSON.parse(repos).map(async (repo) => {
      const project = await Project.getFromGitHub(repo.owner, repo.repo);
      console.log(project);

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

export function Datasets({ projects }) {
  console.log(projects);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
          Luccas Datasets
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600">
          Here is a list of all my datasets for easy access and sharing, if you
          have any questions{' '}
          <a
            href="#"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            sending me an email
          </a>{' '}
          and i’ll get back to you as soon as we can.
        </p>
        <div className="mt-20">
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
          </dl>
        </div>
      </div>
    </div>
  );
}

export default Datasets;
