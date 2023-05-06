import { MDXRemote } from 'next-mdx-remote';
import layouts from 'layouts';
import DocsPagination from './DocsPagination';

export default function MDXPage({ source, frontMatter }) {
  const Layout = ({ children }) => {
    const layoutName = frontMatter?.layout || 'default';
    const LayoutComponent = layouts[layoutName];

    return <LayoutComponent {...frontMatter}>{children}</LayoutComponent>;
  };

  return (
    <Layout>
      <MDXRemote {...source} components={{ DocsPagination }} />
    </Layout>
  );
}
