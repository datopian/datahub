import Head from 'next/head'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create a Portal App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          <a href="https://portaljs.com/">
            <img src="/portaljs-logo.svg" alt="PortalJS Logo" className="h-28" />
          </a>
        </h1>

        <h2 className="mt-6 text-4xl font-normal leading-snug">
          Yay, the portal is open 🌀<br />Let's go explore some data ...
        </h2>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <a
            href="https://portaljs.org/docs"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-semibold">▸ Documentation</h3>
            <p className="mt-4 text-xl">
              Find in-depth information about Portal.js features and API.
            </p>
          </a>

          <a
            href="https://portaljs.com/learn/"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-semibold">▸ Learn</h3>
            <p className="mt-4 text-xl">
              Learn about Portal.js in an interactive course.
            </p>
          </a>

          <a
            href="https://github.com/datopian/portal.js/tree/main/examples"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-semibold">▸ Examples</h3>
            <p className="mt-4 text-xl">
              Discover and deploy boilerplate example Portal.js projects.
            </p>
          </a>

          <a
            href="https://portaljs.com/deploy/"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-semibold">▸ Deploy</h3>
            <p className="mt-4 text-xl">
              Learn how to deploy your Portal.js site with DataHub or Github pages.
            </p>
          </a>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="https://www.datopian.com/wp-content/uploads/2020/09/datopian-bash-png.png" alt="Datopian Logo" className="h-6 ml-2" />
        </a>
      </footer>
    </div>
  )
}
