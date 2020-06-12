export default function About({ datapackage }) {
  return (
    <>
      <h1 className="text-4xl font-semibold text-primary">{ datapackage.title || datapackage.name }</h1>
      <table className="table info no-left-padding">
        <thead>
          <tr>
            <th>Files</th>
            <th>Size</th>
            <th>Format</th>
            <th>Created</th>
            <th>Updated</th>
            <th>License</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="col-xs-1">{ datapackage.resources.length }</td>
            <td className="col-xs-1">{ datapackage.size || 'N\A' }</td>
            <td className="col-xs-2 format-list">
            
            </td>
            <td className="col-xs-2">{ datapackage.created }</td>
            <td className="col-xs-2">{ datapackage.modified }</td>
            <td className="col-xs-2">

            </td>
            <td className="col-xs-2">

            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
