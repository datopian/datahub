import { MDXRemote } from "next-mdx-remote";
import layouts from "layouts";

export default function DRD({ source, frontMatter }) {
  const Layout = ({ children }) => {
    if (frontMatter.layout) {
      let LayoutComponent = layouts[frontMatter.layout];
      return <LayoutComponent {...frontMatter}>{children}</LayoutComponent>;
    }
    return <>{children}</>;
  };

  return (
    <div className="prose mx-auto">
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
