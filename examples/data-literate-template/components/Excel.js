import axios from 'axios'
import XLSX from 'xlsx'
import React, { useEffect, useState } from 'react'

import Table from './Table'

export default function Excel ({ src='' }) {
	const [data, setData] = React.useState([])
	const [cols, setCols] = React.useState([])
	const [workbook, setWorkbook] = React.useState(null)
	const [error, setError] = React.useState('')
  const [hasMounted, setHasMounted] = React.useState(0)

  // so this is here so we re-render this in the browser
  // and not just when we build the page statically in nextjs
  useEffect(() => {
    if (hasMounted==0) {
      handleUrl(src)
    }
    setHasMounted(1)
  })
  
  function handleUrl(url) {
    // if url is external may have CORS issue so we proxy it ...
    if (url.startsWith('http')) {
      const PROXY_URL = window.location.origin + '/api/proxy'
      url = PROXY_URL + '?url=' + encodeURIComponent(url)
    }
    axios.get(url, {
      responseType: 'arraybuffer'
    }).then((res) => {
      let out = new Uint8Array(res.data)
      let workbook = XLSX.read(out, {type: "array"})
      // Get first worksheet
      const wsname = workbook.SheetNames[0]
      const ws = workbook.Sheets[wsname]
      // Convert array of arrays
      const datatmp = XLSX.utils.sheet_to_json(ws, {header:1})
      const colstmp = make_cols(ws['!ref'])
      setData(datatmp)
      setCols(colstmp)
      setWorkbook(workbook)
    }).catch((e) => {
      setError(e.message)
    })
  }

  return (
    <>
      {error &&
        <div>
          There was an error loading the excel file at {src}:
          <p>{error}</p>
        </div>
      }
      {workbook &&
        <ul>
           {workbook.SheetNames.map((value, index) => {
            return <li key={index}>{value}</li>
        })}
        </ul>
      }
      <Table data={data} cols={cols} />
    </>
  )
}

/* generate an array of column objects */
const make_cols = refstr => {
	let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1
	for(var i = 0; i < C; ++i) o[i] = {name:XLSX.utils.encode_col(i), key:i}
	return o
}

