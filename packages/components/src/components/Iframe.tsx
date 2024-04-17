import { CSSProperties } from 'react';
import { Data } from '../types/properties';

export interface IframeProps {
  data: Required<Pick<Data, 'url'>>;
  style?: CSSProperties;
}

export function Iframe({ data, style }: IframeProps) {
  const url = data.url;
  return (
    <iframe
      src={url}
      style={style ?? { width: `100%`, height: `100%` }}
    ></iframe>
  );
}
