import Head from 'next/head'

export default function Showcase() {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Showcase</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="my-16">
        <div className="showcase-page-header">
          <h1 className="text-4xl">
            Agricultural Production Statistics
            </h1>
          <p className="publisher flex">
            <img src="https://www.gravatar.com/avatar/none?d=https%3A%2F%2Ftesting.datahub.io%2Fstatic%2Fimg%2Flogo-cube03.png" className="rounded-full w-6 mr-2" />
            <a href="#" className="text-orange-400">Stats New Zealand</a>
          </p>
          <table className="table-auto my-6">
            <thead>
              <tr>
                <th className="pr-10 py-2">Files</th>
                <th className="px-10 py-2">Size</th>
                <th className="px-10 py-2">Format</th>
                <th className="px-10 py-2">Created</th>
                <th className="px-10 py-2">Updated</th>
                <th className="px-10 py-2">License</th>
                <th className="px-10 py-2">Source</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="pr-10 py-2">3</td>
                <td className="px-10 py-2">N/A</td>
                <td className="px-10 py-2">text xls</td>
                <td className="px-10 py-2">2020-05-27</td>
                <td className="px-10 py-2">a few seconds ago</td>
                <td className="px-10 py-2">cc-by</td>
                <td className="px-10 py-2">Stats New Zealand</td>
              </tr>
            </tbody>
          </table>
          <div className="mb-10"> These releases contain information on farming in New Zealand - including livestock and arable farming, horticulture, and forestry. Agricultural production statistics are produced in collaboration with the Ministry for Primary Industries.<a href="#readme" className="underline"> Read more</a></div>
          <a href="#data" className="bg-black text-white py-4 px-4 rounded-sm mr-2 hover:border-0 hover:border-black hover:text-black hover:bg-transparent">Download</a>
          <a href="#data-cli" className="border border-black text-black py-4 px-4 rounded-sm">Developers</a>
        </div>
        <div className="my-16">
          <h2 className="text-3xl" id="data">Data Files</h2>
          <p>Download files in this dataset</p>
          <table className="table-auto">
            <thead>
              <th className="pr-6 py-4">File</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Size</th>
              <th className="px-6 py-4">Last changed</th>
              <th className="px-6 py-4">Download</th>
            </thead>
            <tbody>
              <tr>
                <td className="pr-6 py-4">
                  <i className="far fa-file-alt"></i> <a href="#{{item.slug}}" className="anchor-link" title="{{item.resource.title or item.resource.name}}">#</a>
                </td>
                <td className="px-6 py-4" title="{{ item.resource.descriptionHtml or item.resource.title }}">
                </td>
                <td className="px-6 py-4" title="{{ item.resource.sizeFormatted }}">
                </td>
                <td className="px-6 py-4" title="{{ item.resource.modified }}">
                </td>
                <td className="download truncate px-6 py-4">
                  <a href="#">
                  </a>
                  <a href="#">
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <style jsx>{` 
        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
