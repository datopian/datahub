import axios from 'axios'
import React, { useEffect, useState } from 'react'

const papa = require("papaparse")

/*
  Simple HTML Table
  usage: <OutTable data={data} cols={cols} />
    data:Array<Array<any> >;
    cols:Array<{name:string, key:number|string}>;
*/
export default function Table({ data=[], cols=[], csv='', url='' }) {
  if (csv) {
    const out = parseCsv(csv)
    data = out.rows
    cols = out.cols
  }

	const [ourdata, setData] = React.useState(data)
	const [ourcols, setCols] = React.useState(cols)
	const [error, setError] = React.useState('')

  useEffect(() => {
    if (url) {
      loadUrl(url)
    }
  }, [url])

  function loadUrl(path) {
    // HACK: duplicate of Excel code - maybe refactor
    // if url is external may have CORS issue so we proxy it ...
    if (url.startsWith('http')) {
      const PROXY_URL = window.location.origin + '/api/proxy'
      url = PROXY_URL + '?url=' + encodeURIComponent(url)
    }
    axios.get(url).then((res) => {
      const { rows, fields } = parseCsv(res.data)      
      setData(rows)
      setCols(fields)
    })
  }

	return (
    <>
      <SimpleTable data={ourdata} cols={ourcols} />
    </>
	)
}

/*
  Simple HTML Table
  usage: <OutTable data={data} cols={cols} />
    data:Array<Array<any> >;
    cols:Array<{name:string, key:number|string}>;
*/
function SimpleTable({ data=[], cols=[] }) {
	return (
		<div className="table-responsive">
			<table className="table table-striped">
				<thead>
					<tr>{cols.map((c) => <th key={c.key}>{c.name}</th>)}</tr>
				</thead>
				<tbody>
					{data.map((r,i) => <tr key={i}>
						{cols.map(c => <td key={c.key}>{ r[c.key] }</td>)}
					</tr>)}
				</tbody>
			</table>
		</div>
	)
}

function parseCsv(csv) {
  csv = csv.trim()
  const rawdata = papa.parse(csv, {header: true})
  const cols = rawdata.meta.fields.map((r,i) => {
    return { key: r, name: r }
  })
  return {
    rows: rawdata.data,
    fields: cols
  }
}
