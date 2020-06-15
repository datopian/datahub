import Link from 'next/link'

export default function About({ resource }) {
  return (
    <>
      <table className="table-auto w-full text-sm text-left my-6">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Format</th>
            <th className="px-4 py-2">Size</th>
            <th className="px-4 py-2">Created</th>
            <th className="px-4 py-2">Updated</th>
            <th className="px-4 py-2">Download</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2">{ resource.name || resource.id }</td>
            <td className="px-4 py-2">{ resource.title || '' }</td>
            <td className="px-4 py-2">{ resource.description || '' }</td>
            <td className="px-4 py-2">{ resource.format }</td>
            <td className="px-4 py-2">{ resource.size }</td>
            <td className="px-4 py-2">{ resource.created }</td>
            <td className="px-4 py-2">{ resource.last_modified || '' }</td>
            <td className="px-4 py-2">
              <Link href={resource.path}>
                <a className="bg-white hover:bg-gray-200 border text-black font-semibold py-2 px-4 rounded">{ resource.format }</a>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
