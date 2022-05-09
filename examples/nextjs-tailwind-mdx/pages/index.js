import Head from 'next/head'

import siteConfig from '../config/siteConfig'

export default function Home() {
  return (
    <>
      <div className="text-center">
        <h1 className="text-6xl font-bold mt-24 mb-8">
          <a className="text-blue-600" href="https://github.com/datopian/nextjs-tailwind-mdx">
            {siteConfig.title}
          </a>
        </h1>
        <h2 className="text-4xl">
          {siteConfig.tagline}
        </h2>
      </div>
    </>
  )
}
