import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { VegaLite } from './VegaLite';
import loadData from '../lib/loadData';

type AxisType = 'quantitative' | 'temporal';
type TimeUnit = 'year' | undefined; // or ...

export type LineChartProps = {
  data: Array<Array<string | number>> | string | { x: string; y: number }[];
  title?: string;
  xAxis?: string;
  xAxisType?: AxisType;
  xAxisTimeUnit: TimeUnit;
  yAxis?: string;
  yAxisType?: AxisType;
  fullWidth?: boolean;
};

export function LineChart({
  data = [],
  fullWidth = false,
  title = '',
  xAxis = 'x',
  xAxisType = 'temporal',
  xAxisTimeUnit = 'year', //  TODO: defaults to undefined would probably work better... keeping it as it's for compatibility purposes
  yAxis = 'y',
  yAxisType = 'quantitative',
}: LineChartProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //  By default, assumes data is an Array...
  const [specData, setSpecData] = useState<any>({ name: 'table' });

  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    title,
    width: 600,
    height: 300,
    mark: {
      type: 'line',
      color: 'black',
      strokeWidth: 1,
      tooltip: true,
    },
    data: specData,
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
        field: yAxis,
        type: yAxisType,
      },
    },
  } as any;

  useEffect(() => {
    //  If data is string, assume it's a URL
    if (typeof data === 'string') {
      setIsLoading(true);

      //  Manualy loading the data allows us to do other kinds
      //  of stuff later e.g. load a file partially
      loadData(data).then((res: any) => {
        setSpecData({ values: res, format: { type: 'csv' } });
        setIsLoading(false);
      });
    }
  }, []);

  var vegaData = {};
  if (Array.isArray(data)) {
    var dataObj;
    dataObj = data.map((r) => {
      return { x: r[0], y: r[1] };
    });
    vegaData = { table: dataObj };
  }

  return isLoading ? (
    <div className="w-full flex items-center justify-center w-[600px] h-[300px]">
      <LoadingSpinner />
    </div>
  ) : (
    <VegaLite fullWidth={fullWidth} data={vegaData} spec={spec} />
  );
}
