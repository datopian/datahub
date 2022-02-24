const toc = require('remark-toc')
const slug = require('remark-slug')
const gfm = require('remark-gfm')
const footnotes = require('remark-footnotes')



const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [gfm, toc, slug, footnotes],
        rehypePlugins: [],
        providerImportSource: '@mdx-js/react',
    },
})
module.exports = withMDX({
    // Append the default value with md extensions
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
})