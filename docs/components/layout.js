import Link from 'next/link'
import Head from 'next/head'

import Nav from '../components/Nav'

export default function Layout({
  children,
  title = 'Portal.JS',
}) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Nav />

      {children}

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://datopian.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by{' '}
          <img src="/datopian-logo.png" alt="Datopian Logo" className="h-6 ml-2" />
        </a>
      </footer>
    </div>
  )
}
