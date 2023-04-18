import { VegaLite } from "react-vega";

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
    width: "container" as "container",
    height: 300,
    mark: {
      type: "line" as "line",
      color: "black",
      strokeWidth: 1,
      tooltip: true,
    },
    data: {
      name: "table",
    },
    selection: {
      grid: {
        type: "interval" as "interval",
        bind: "scales",
      },
    },
    encoding: {
      x: {
        field: "x",
        timeUnit: "year",
        type: "temporal" as "temporal",
      },
      y: {
        field: "y",
        type: "quantitative" as "temporal",
      },
    },
  };

  return <VegaLite data={vegaData} spec={spec} />;
}
