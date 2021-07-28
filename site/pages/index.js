import Layout from '../components/Layout'

export default function Home() {

  return (
    <Layout>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center py-10">
        <h1 className="text-6xl font-bold">
          <a href="https://portaljs.com/">
            <img src="/logo.svg" alt="PortalJS Logo" className="h-28" />
          </a>
        </h1>

        <h2 className="mt-6 text-4xl font-normal leading-snug">
          Rapidly build rich data portals using a modern frontend framework
        </h2>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <a
            href="/docs/"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-semibold">▸ Documentation</h3>
            <p className="mt-4 text-xl">
              Find in-depth information about Portal.js features and API.
            </p>
          </a>

          <a
            href="/learn/"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-semibold">▸ Learn</h3>
            <p className="mt-4 text-xl">
              Learn about Portal.js in an interactive course.
            </p>
          </a>

          <a
            href="/gallery/"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-semibold">▸ Gallery</h3>
            <p className="mt-4 text-xl">
              Discover examples of Portal.js projects.
            </p>
          </a>

          <a
            href="https://github.com/datopian/portal.js"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-semibold">▸ Contribute</h3>
            <p className="mt-4 text-xl">
              Checkout the Portal.js repository on github
            </p>
          </a>
        </div>
      </main>
    </Layout>
  )
}
