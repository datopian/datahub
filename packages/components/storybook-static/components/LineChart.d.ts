/// <reference types="react" />
export type LineChartProps = {
    data: Array<Array<string | number>> | string | {
        x: string;
        y: number;
    }[];
    title?: string;
    xAxis?: string;
    yAxis?: string;
    fullWidth?: boolean;
};
export declare function LineChart({ data, fullWidth, title, xAxis, yAxis, }: LineChartProps): JSX.Element;
