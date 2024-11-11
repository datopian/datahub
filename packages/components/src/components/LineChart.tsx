import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { VegaLite } from './VegaLite';
import loadData from '../lib/loadData';
import { Data } from '../types/properties';

type AxisType = 'quantitative' | 'temporal';
type TimeUnit = 'year' | 'yearmonth' | undefined; // or ...

export type LineChartProps = {
  data: Omit<Data, 'csv'>;
  title?: string;
  xAxis: string;
  xAxisType?: AxisType;
  xAxisTimeUnit?: TimeUnit;
  yAxis: string | string[];
  yAxisType?: AxisType;
  fullWidth?: boolean;
  symbol?: string;
};

export function LineChart({
  data,
  title = '',
  xAxis,
  xAxisType = 'temporal',
  xAxisTimeUnit = 'year', //  TODO: defaults to undefined would probably work better... keeping it as it's for compatibility purposes
  yAxis,
  yAxisType = 'quantitative',
  symbol,
}: LineChartProps) {
  const url = data.url;
  const values = data.values;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //  By default, assumes data is an Array...
  const [specData, setSpecData] = useState<any>({ name: 'table' });
  const isMultiYAxis = Array.isArray(yAxis);

  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    title,
    width: 'container',
    height: 300,
    mark: {
      type: 'line',
      color: 'black',
      strokeWidth: 1,
      tooltip: true,
    },
    data: specData,
    ...(isMultiYAxis
      ? {
          transform: [{ fold: yAxis, as: ['key', 'value'] }],
        }
      : {}),
    selection: {
      grid: {
        type: 'interval',
        bind: 'scales',
      },
    },
    encoding: {
      x: {
        field: xAxis,
        timeUnit: xAxisTimeUnit,
        type: xAxisType,
      },
      y: {
        field: isMultiYAxis ? 'value' : yAxis,
        type: yAxisType,
      },
      ...(symbol
        ? {
            color: {
              field: symbol,
              type: 'nominal',
            },
          }
        : {}),
      ...(isMultiYAxis
        ? {
            color: {
              field: 'key',
              type: 'nominal',
            },
          }
        : {}),
    },
  } as any;

  useEffect(() => {
    if (url) {
      setIsLoading(true);

      //  Manualy loading the data allows us to do other kinds
      //  of stuff later e.g. load a file partially
      loadData(url).then((res: any) => {
        setSpecData({ values: res, format: { type: 'csv' } });
        setIsLoading(false);
      });
    }
  }, []);

  var vegaData = {};
  if (values) {
    vegaData = { table: values };
  }

  return isLoading ? (
    <div className="w-full flex items-center justify-center w-[600px] h-[300px]">
      <LoadingSpinner />
    </div>
  ) : (
    <VegaLite data={vegaData} spec={spec} />
  );
}
