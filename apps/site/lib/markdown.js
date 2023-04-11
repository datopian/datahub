import matter from 'gray-matter'
import toc from 'remark-toc'
import slug from 'remark-slug'
import gfm from 'remark-gfm'
import footnotes from 'remark-footnotes'

import { serialize } from 'next-mdx-remote/serialize'

/**
 * Parse a markdown or MDX file to an MDX source form + front matter data
 *
 * @source: the contents of a markdown or mdx file
 * @returns: { mdxSource: mdxSource, frontMatter: ...}
 */
const parse = async function(source) {
  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [gfm, toc, slug, footnotes],
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
