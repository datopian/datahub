import { MDXRemote } from "next-mdx-remote";
import layouts from "layouts";

export default function MDXPage({ source, frontMatter }) {
  const Layout = ({ children }) => {
    if (frontMatter.layout) {
      let LayoutComponent = layouts[frontMatter.layout];
      return <LayoutComponent {...frontMatter}>{children}</LayoutComponent>;
    }
    return <>{children}</>;
  };

  return (
    <div className="prose mx-auto prose-a:text-primary dark:prose-a:text-primary-dark prose-strong:text-primary dark:prose-strong:text-primary-dark prose-code:text-primary dark:prose-code:text-primary-dark prose-headings:text-primary dark:prose-headings:text-primary-dark text-primary dark:text-primary-dark prose-headings:font-headings dark:prose-invert prose-a:break-words">
      <header>
        <div className="mb-6">
          {/* Default layout */}
          {!frontMatter.layout && (
            <>
              <h1>{frontMatter.title}</h1>
              {frontMatter.author && (
                <div className="-mt-6">
                  <p className="opacity-60 pl-1">{frontMatter.author}</p>
                </div>
              )}
              {frontMatter.description && (
                <p className="description">{frontMatter.description}</p>
              )}
            </>
          )}
        </div>
      </header>
      <main>
        <Layout>
          <MDXRemote {...source} />
        </Layout>
      </main>
    </div>
  );
}
