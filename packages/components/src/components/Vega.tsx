//  Wrapper for the Vega component
import { Vega as VegaOg } from "react-vega";
import { VegaProps } from "react-vega/lib/Vega";

export function Vega(props: VegaProps) {
  return <VegaOg {...props} />;
}
