//  Wrapper for the Vega Lite component
import { VegaLite as VegaLiteOg } from "react-vega";

export default function VegaLite(props) {
  return <VegaLiteOg {...props} />;
}
