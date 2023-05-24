/// <reference types="react" />
export type TableProps = {
    data?: Array<{
        [key: string]: number | string;
    }>;
    cols?: Array<{
        [key: string]: string;
    }>;
    csv?: string;
    url?: string;
    fullWidth?: boolean;
};
export declare const Table: ({ data: ogData, cols: ogCols, csv, url, fullWidth, }: TableProps) => JSX.Element;
