export default function About({ datapackage }) {
  return (
    <>
      <table className="table-auto w-full text-sm text-left my-6">
        <thead>
          <tr>
            <th className="px-4 py-2">Files</th>
            <th className="px-4 py-2">Size</th>
            <th className="px-4 py-2">Format</th>
            <th className="px-4 py-2">Created</th>
            <th className="px-4 py-2">Updated</th>
            <th className="px-4 py-2">License</th>
            <th className="px-4 py-2">Source</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2">{ datapackage.resources.length }</td>
            <td className="px-4 py-2">{ datapackage.size || 'N\A' }</td>
            <td className="px-4 py-2">

            </td>
            <td className="px-4 py-2">{ datapackage.created }</td>
            <td className="px-4 py-2">{ datapackage.modified }</td>
            <td className="px-4 py-2">

            </td>
            <td className="px-4 py-2">

            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
