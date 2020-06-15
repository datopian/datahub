import Link from 'next/link'

export default function Resources({ datapackage }) {
  return (
    <>
      <h3 className="text-xl font-semibold">Data Files</h3>
      <table className="table-auto w-full text-sm text-left mb-6">
        <thead>
          <tr>
            <th className="px-4 py-2">File</th>
            <th className="px-4 py-2">Format</th>
            <th className="px-4 py-2">Created</th>
            <th className="px-4 py-2">Updated</th>
            <th className="px-4 py-2">Link</th>
          </tr>
        </thead>
        <tbody>
          {datapackage.resources.map((resource, index) => (
              <tr key={index}>
                <td className="px-4 py-2">
                  <Link href={`${datapackage.name}/r/${resource.name}`}>
                    <a className="underline">{ resource.title || resource.name }</a>
                  </Link>
                </td>
                <td className="px-4 py-2">{ resource.format }</td>
                <td className="px-4 py-2">{ resource.created }</td>
                <td className="px-4 py-2">{ resource.last_modified }</td>
                <td className="px-4 py-2">
                  <Link href={`${datapackage.name}/r/${resource.name}`}>
                    <a className="underline">Preview</a>
                  </Link>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  )
}
