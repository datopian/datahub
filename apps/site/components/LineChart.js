import { Vega, VegaLite } from 'react-vega'

export default function LineChart( { data=[] }) {
  var tmp = data
  if (Array.isArray(data)) {
    tmp = data.map((r,i) => {
      return { x: r[0], y: r[1] }
    })
  }
  const vegaData = { "table": tmp }
  const spec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "mark": "line",
    "data": {
      "name": "table"
    },
    "encoding": {
      "x": {
        "field": "x",
        "timeUnit": "year",
        "type": "temporal"
      },
      "y": {
        "field": "y",
       "type": "quantitative"
      }
    }
  }

  return (
    <VegaLite data={ vegaData } spec={ spec } />
  )
}
