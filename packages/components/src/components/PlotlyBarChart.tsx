import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Plotly } from './Plotly';
import Papa, { ParseConfig } from 'papaparse';
import LoadingSpinner from './LoadingSpinner';
import { Data } from '../types/properties';

const queryClient = new QueryClient();

async function getCsv(url: string, bytes: number) {
  const response = await fetch(url, {
    headers: {
      Range: `bytes=0-${bytes}`,
    },
  });
  const data = await response.text();
  return data;
}

async function parseCsv(
  file: string,
  parsingConfig: ParseConfig
): Promise<any> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      ...parsingConfig,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transform: (value: string): string => {
        return value.trim();
      },
      complete: (results: any) => {
        return resolve(results);
      },
      error: (error: any) => {
        return reject(error);
      },
    });
  });
}

export interface PlotlyBarChartProps {
  data: Data;
  uniqueId?: number;
  bytes?: number;
  parsingConfig?: ParseConfig;
  xAxis: string;
  yAxis: string;
  // TODO: commented out because this doesn't work. I believe
  // this would only make any difference on charts with multiple
  // traces.
  // lineLabel?: string;
  title?: string;
}

export const PlotlyBarChart: React.FC<PlotlyBarChartProps> = ({
  data,
  bytes = 5132288,
  parsingConfig = {},
  xAxis,
  yAxis,
  // lineLabel,
  title = '',
}) => {
  const uniqueId = Math.random();
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <PlotlyBarChartInner
        data={data}
        uniqueId={uniqueId}
        bytes={bytes}
        parsingConfig={parsingConfig}
        xAxis={xAxis}
        yAxis={yAxis}
        // lineLabel={lineLabel ?? yAxis}
        title={title}
      />
    </QueryClientProvider>
  );
};

const PlotlyBarChartInner: React.FC<PlotlyBarChartProps> = ({
  data,
  uniqueId,
  bytes,
  parsingConfig,
  xAxis,
  yAxis,
  // lineLabel,
  title,
}) => {
  if (data.values) {
    return (
      <div className="w-full" style={{ height: '500px' }}>
        <Plotly
          layout={{
            title,
          }}
          data={[
            {
              x: data.values.map((d) => d[xAxis]),
              y: data.values.map((d) => d[yAxis]),
              type: 'bar',
              // name: lineLabel,
            },
          ]}
        />
      </div>
    );
  }
  const { data: csvString, isLoading: isDownloadingCSV } = useQuery(
    ['dataCsv', data.url, uniqueId],
    () => getCsv(data.url as string, bytes ?? 5132288),
    { enabled: !!data.url }
  );
  const { data: parsedData, isLoading: isParsing } = useQuery(
    ['dataPreview', csvString, uniqueId],
    () =>
      parseCsv(
        data.csv ? (data.csv as string) : (csvString as string),
        parsingConfig ?? {}
      ),
    { enabled: data.csv ? true : !!csvString }
  );
  if (isParsing || isDownloadingCSV)
    <div className="w-full flex justify-center items-center h-[500px]">
      <LoadingSpinner />
    </div>;
  if (parsedData)
    return (
      <div className="w-full" style={{ height: '500px' }}>
        <Plotly
          layout={{
            title,
          }}
          data={[
            {
              x: parsedData.data.map((d: any) => d[xAxis]),
              y: parsedData.data.map((d: any) => d[yAxis]),
              type: 'bar',
              // name: lineLabel, TODO: commented out because this doesn't work
            },
          ]}
        />
      </div>
    );
  return (
    <div className="w-full flex justify-center items-center h-[500px]">
      <LoadingSpinner />
    </div>
  );
};
