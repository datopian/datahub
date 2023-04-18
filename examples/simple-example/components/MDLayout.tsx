import FrictionlessViewFactory from "./drd/FrictionlessView";
import Table from "./drd/Table";

/* eslint import/no-default-export: off */
function DatapackageLayout({ children, project, excerpt }) {
  const { metadata } = project;

  const title = metadata.title;
  const resources = metadata.resources;
  const views = metadata.views;

  const FrictionlessView = FrictionlessViewFactory({ views, resources });

  return (
    <article className="docs prose text-primary dark:text-primary-dark dark:prose-invert prose-headings:font-headings prose-a:break-words mx-auto p-6">
      <header>
        {title && <h1 className="mb-4">{title}</h1>}
        <a
          className="font-semibold mb-4"
          target="_blank"
          href={project.github_repo}
        >
          @{project.owner} / {project.name}
        </a>
        {excerpt && <p className="text-md">{excerpt}</p>}
      </header>
      <section className="mt-10">
        {views.map((view, i) => {
          return (
            <div key={`visualization-${i}`}>
              <FrictionlessView viewId={i} />
            </div>
          );
        })}
      </section>
      <section className="mt-10">
        <h2>Data files</h2>
        <table className="table-auto">
          <thead>
            <tr>
              <th>File</th>
              <th>Title</th>
              <th>Format</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((r) => {
              return (
                <tr key={`resources-list-${r.name}`}>
                  <td>
                    <a
                      target="_blank"
                      href={`https://github.com/${project.owner}/${project.name}/blob/main/${r.path}`}
                    >
                      {r.path}
                    </a>
                  </td>
                  <td>{r.title}</td>
                  <td>{r.format.toUpperCase()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {resources.slice(0, 5).map((resource) => {
          return (
            <div key={`resource-preview-${resource.name}`} className="mt-10">
              <h3>{resource.title || resource.name || resource.path}</h3>
              <Table url={resource.path} />
            </div>
          );
        })}
      </section>
      <hr />
      <section>
        <h2>Read me</h2>
        {children}
      </section>
    </article>
  );
}

export default function MDLayout({ children, layout, ...props }) {
  return <DatapackageLayout project={props.project} excerpt={props.excerpt}>{children}</DatapackageLayout>;
}
