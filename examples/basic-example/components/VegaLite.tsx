//  Wrapper for the Vega Lite component
import { VegaLite as VegaLiteOg } from "react-vega";
import applyFullWidthDirective from "../lib/applyFullWidthDirective";

export default function VegaLite(props) {
  const Component = applyFullWidthDirective({ Component: VegaLiteOg });

  return <Component {...props} />;
}
