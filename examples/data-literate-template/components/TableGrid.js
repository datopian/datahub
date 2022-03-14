import axios from 'axios'
import React, { useEffect } from 'react'
import { Table } from 'portal'

const papa = require("papaparse")

/*
  Portaljs Table Grid
  usage: <TableGrid url="" data={data} cols={cols} csv="" />
*/
export default function TableGrid({ data = [], cols = [], csv = '', url = '' }) {

  if (csv) {
    const out = parseCsv(csv)
    data = prepareRowsForPortalJsTable(out.rows)
    cols = out.fields
  }

  if (cols) {
    cols = prepareColsForPortalJsTable(cols)
  }

  const [ourdata, setData] = React.useState(data)
  const [ourcols, setCols] = React.useState(cols)

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
      setCols(prepareColsForPortalJsTable(fields))
    })
  }
  return (
    <div>
      <Table columns={ourcols} data={ourdata} height={"400px"} />
    </div>
  )
}

function prepareColsForPortalJsTable(cols) {
  return cols.map((col) => {
    return {
      field: col.key,
      headerName: col.name,
      flex: true
    }
  })
}

function prepareRowsForPortalJsTable(rows) {
  return rows.map((r) => {
    return {
      ...r,
      id: r.id || r.key
    }
  })
}

function parseCsv(csv) {
  csv = csv.trim()
  const rawdata = papa.parse(csv, { header: true })
  const cols = rawdata.meta.fields.map((r, i) => {
    return { key: r, name: r }
  })
  return {
    rows: rawdata.data,
    fields: cols
  }
}
