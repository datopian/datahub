import VegaLite from "./VegaLite";

export default function LineChart({
  data = [],
  fullWidth = false,
  title = "",
  xAxis = "x",
  yAxis = "y",
}) {
  var tmp = data;
  if (Array.isArray(data)) {
    tmp = data.map((r, i) => {
      return { x: r[0], y: r[1] };
    });
  }
  const vegaData = { table: tmp };
  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    title,
    width: "container",
    height: 300,
    mark: {
      type: "line",
      color: "black",
      strokeWidth: 1,
      tooltip: true,
    },
    data: {
      name: "table",
    },
    selection: {
      grid: {
        type: "interval",
        bind: "scales",
      },
    },
    encoding: {
      x: {
        field: xAxis,
        timeUnit: "year",
        type: "temporal",
      },
      y: {
        field: yAxis,
        type: "quantitative",
      },
    },
  };
  if (typeof data === 'string') {
    spec.data = { "url": data } as any
    return <VegaLite fullWidth={fullWidth} spec={spec} />;
  }

  return <VegaLite fullWidth={fullWidth} data={vegaData} spec={spec} />;
}
