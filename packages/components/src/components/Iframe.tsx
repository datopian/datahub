import { CSSProperties } from "react";

export interface IframeProps {
  url: string;
  style?: CSSProperties;
}

export function Iframe({
  url, style
}: IframeProps) {
  return (
    <iframe src={url} style={style ?? { width: `100%`, height: `100%` }}></iframe>
  );
}
