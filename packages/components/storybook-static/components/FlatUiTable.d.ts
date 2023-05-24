/// <reference types="react" />
export declare function getCsv(url: string): Promise<string>;
export declare function parseCsv(file: string): Promise<any>;
export interface FlatUiTableProps {
    url?: string;
    data?: {
        [key: string]: number | string;
    }[];
    rawCsv?: string;
}
export declare const FlatUiTable: React.FC<FlatUiTableProps>;
