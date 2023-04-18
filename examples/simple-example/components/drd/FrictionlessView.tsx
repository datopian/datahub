// FrictionlessView is a factory because we have to
// set the views and resources lists before using it

import { convertSimpleToVegaLite } from "../../lib/viewSpecConversion";
import VegaLite from "./VegaLite";

export default function FrictionlessViewFactory({
  views = [],
  resources = [],
}): ({
  viewId,
  fullWidth,
}: {
  viewId: number;
  fullWidth?: boolean;
}) => JSX.Element {
  return ({ viewId, fullWidth = false }) => {
    if (!(viewId in views)) {
      console.error(`View ${viewId} not found`);
      return <></>;
    }
    const view = views[viewId];

    let resource;
    if (resources.length > 1) {
      resource = resources.find((r) => r.name === view.resourceName);
    } else {
      resource = resources[0];
    }

    if (!resource) {
      console.error(`Resource not found for view id ${viewId}`);
      return <></>;
    }

    let vegaSpec;
    switch (view.specType) {
      case "simple":
        vegaSpec = convertSimpleToVegaLite(view, resource);
        break;
      // ... other conversions
    }

    vegaSpec.data = { url: resource.path };

    return (
      <VegaLite
        fullWidth={fullWidth}
        spec={vegaSpec}
        actions={{ editor: false }}
        downloadFileName={resource.name}
      />
    );
  };
}
