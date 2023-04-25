import VegaLite from "./VegaLite";

export default function LineChart({
  data = [],
  fullWidth = false,
  title = "",
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
        field: "x",
        timeUnit: "year",
        type: "temporal",
      },
      y: {
        field: "y",
        type: "quantitative",
      },
    },
  };

  return <VegaLite fullWidth={fullWidth} data={vegaData} spec={spec} />;
}
