export function convertSimpleToVegaLite(view, resource) {
  const x = resource.schema.fields.find((f) => f.name === view.spec.group);
  const y = resource.schema.fields.find((f) => f.name === view.spec.series[0]);

  const xType = inferVegaType(x.type);
  const yType = inferVegaType(y.type);

  let vegaLiteSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    mark: {
      type: view.spec.type,
      color: "black",
      strokeWidth: 1,
      tooltip: true,
    },
    title: view.title,
    width: 500,
    height: 300,
    selection: {
      grid: {
        type: "interval",
        bind: "scales",
      },
    },
    encoding: {
      x: {
        field: x.name,
        type: xType,
      },
      y: {
        field: y.name,
        type: yType,
      },
    },
  };

  return vegaLiteSpec;
}

const inferVegaType = (fieldType) => {
  switch (fieldType) {
    case "date":
      return "Temporal";
    case "number":
      return "Quantitative";
  }
};
