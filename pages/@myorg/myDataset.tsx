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
            Remuneración octubre 2017
          </h1>
          <p className="publisher flex">
            <img src="https://www.gravatar.com/avatar/none?d=https%3A%2F%2Ftesting.datahub.io%2Fstatic%2Fimg%2Flogo-cube03.png" className="rounded-full w-6 mr-2" />
            <a href="#" className="text-orange-400">Datos Abiertos Municipio Loja Ecuador</a>
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
                <td className="px-10 py-2 text-orange-500">cc-by</td>
                <td className="px-10 py-2">Datos Abiertos Municipio Loja Ecuador</td>
              </tr>
            </tbody>
          </table>
          <div className="mb-10"> Contiene información sobre las remuneraciones de los servidores de la institución, correspondiente al mes de octubre del año 2017.</div>
          <a href="#data" className="bg-black text-white py-4 px-4 rounded-sm mr-2 hover:border-0 hover:border-black hover:text-black hover:bg-transparent">Download</a>
          <a href="#data-cli" className="border border-black text-black py-4 px-4 rounded-sm">Developers</a>
        </div>
        <div className="my-16">
          <h2 className="text-3xl pb-2" id="data">Data Files</h2>
          <p>Download files in this dataset</p>
          <table className="table-auto">
            <thead>
              <th className="pr-10 text-left py-4">File</th>
              <th className="px-10 text-left py-4">Description</th>
              <th className="px-10 text-left py-4">Size</th>
              <th className="px-10 text-left py-4">Last changed</th>
              <th className="px-10 text-left py-4">Download</th>
            </thead>
            <tbody>
              <tr className="bg-gray-100 text-sm">
                <td className="pr-10 py-4 text-orange-500">
                  <i className="far fa-file-alt"></i> <a href="/@myorg/preview" className="anchor-link">Remuneración octubre 2017</a>
                </td>
                <td className="px-10 py-4">
                  Remuneración octubre 2017
                </td>
                <td className="px-10 py-4" title="{{ item.resource.sizeFormatted }}">
                </td>
                <td className="px-10 py-4" title="{{ item.resource.modified }}">
                  Invalid Date
                </td>
                <td className="px-10 py-4 text-orange-500">
                  <a href="#">
                    Text
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
