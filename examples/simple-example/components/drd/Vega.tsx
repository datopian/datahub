import { Vega as VegaOg } from "react-vega";
export default function Vega(props) {
  console.log(props)
  return <VegaOg id="fsfd" className="w-full" {...props} />;
}
