//  Wrapper for the Vega Lite component
import { VegaLite as VegaLiteOg } from 'react-vega';
import { VegaLiteProps } from 'react-vega/lib/VegaLite';
import applyFullWidthDirective from '../lib/applyFullWidthDirective';

export function VegaLite(props: VegaLiteProps) {
  const Component = applyFullWidthDirective({ Component: VegaLiteOg });

  return <Component {...props} />;
}
