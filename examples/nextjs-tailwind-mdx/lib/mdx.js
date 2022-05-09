import matter from 'gray-matter'
import gfm from 'remark-gfm'
import toc from 'remark-toc'
import slug from 'remark-slug'
import smartypants from '@silvenon/remark-smartypants'
import { serialize } from 'next-mdx-remote/serialize'


/**
 * Parse a markdown or MDX file to an MDX source form + front matter data
 *
 * @source: the contents of a markdown or mdx file
 * @returns: { mdxSource: mdxSource, frontMatter: object }
 */
const parse = async function(source) {
  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [gfm, toc, slug, smartypants],
      rehypePlugins: [],
    },
    scope: data,
  })

  return {
    mdxSource: mdxSource,
    frontMatter: data
  }
}

export default parse
