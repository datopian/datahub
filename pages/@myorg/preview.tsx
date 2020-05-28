import Head from 'next/head'
import Link from 'next/link'

export default function Showcase() {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Showcase</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="my-16">
        <div className="my-16">
          <h2 className="text-3xl pb-2" id="data">Remuneración octubre 2017</h2>
          <p className="text-2xl my-4 font-light">Field Information</p>
          <table className="table-auto border text-sm mb-2">
            <thead>
              <th className="px-5 w-2/5 text-left py-4 border">Field Name</th>
              <th className="px-5 w-1/5 text-left py-4 border">Order</th>
              <th className="px-5 w-1/6 text-left py-4 border">Type(Format)</th>
              <th className="px-5 w-1/5 text-left py-4 border">Description</th>
            </thead>
            <tbody>
              <tr className="bg-gray-200 text-sm border">
                <td className="px-5 py-4 border font-bold">
                  No.
                </td>
                <td className="px-5 py-4 border">
                  1
                </td>
                <td className="px-5 py-4 border">
                  any
                </td>
                <td className="px-5 py-4 border">
                </td>
              </tr>
              <tr className="text-sm border">
                <td className="px-5 py-4 border font-bold">
                  Puesto institucional
                </td>
                <td className="px-5 py-4 border">
                  2
                </td>
                <td className="px-5 py-4 border">
                  string
                </td>
                <td className="px-5 py-4 border">
                </td>
              </tr>
              <tr className="bg-gray-200 text-sm border">
                <td className="px-5 py-4 border font-bold">
                  Régimen laboral al que pertenece	
                </td>
                <td className="px-5 py-4 border">
                  3
                </td>
                <td className="px-5 py-4 border">
                  string
                </td>
                <td className="px-5 py-4 border">
                </td>
              </tr>
              <tr className="text-sm border">
                <td className="px-5 py-4 border font-bold">
                  Número de partida presupuestaria
                </td>
                <td className="px-5 py-4 border">
                  4
                </td>
                <td className="px-5 py-4 border">
                  string
                </td>
                <td className="px-5 py-4 border">
                </td>
              </tr>
              <tr className="bg-gray-200 text-sm border">
                <td className="px-5 py-4 border font-bold">
                  Grado jerárquico o escala al que pertenece el puesto	
                </td>
                <td className="px-5 py-4 border">
                  5
                </td>
                <td className="px-5 py-4 border">
                  any
                </td>
                <td className="px-5 py-4 border">
                </td>
              </tr>
              <tr className="text-sm border">
                <td className="px-5 py-4 border font-bold">
                  Remuneración mensual unificacada	
                </td>
                <td className="px-5 py-4 border">
                  6
                </td>
                <td className="px-5 py-4 border">
                  any
                </td>
                <td className="px-5 py-4 border">
                </td>
              </tr>
            </tbody>
          </table>
          <a href="/@myorg/myDataset" className="text-orange-600 underline">Go back</a>
        </div>
      </div>
    </div>
  )
}
