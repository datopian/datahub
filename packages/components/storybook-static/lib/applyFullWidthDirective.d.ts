/// <reference types="react" />
export default function applyFullWidthDirective({ Component, defaultWFull, }: {
    Component: any;
    defaultWFull?: boolean;
}): (props: any) => JSX.Element;
