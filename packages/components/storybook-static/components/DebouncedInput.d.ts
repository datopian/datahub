/// <reference types="react" />
declare const DebouncedInput: ({ value: initialValue, onChange, debounce, ...props }: {
    [x: string]: any;
    value: any;
    onChange: any;
    debounce?: number;
}) => JSX.Element;
export default DebouncedInput;
