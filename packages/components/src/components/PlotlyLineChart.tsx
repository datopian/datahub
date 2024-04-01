import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Plotly } from "./Plotly";
import Papa, { ParseConfig } from "papaparse";
import LoadingSpinner from "./LoadingSpinner";

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
  parsingConfig: ParseConfig,
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

export interface PlotlyLineChartProps {
  url?: string;
  data?: { [key: string]: number | string }[];
  rawCsv?: string;
  randomId?: number;
  bytes?: number;
  parsingConfig?: ParseConfig;
  xAxis: string;
  yAxis: string;
  lineLabel?: string;
  title?: string;
}

export const PlotlyLineChart: React.FC<PlotlyLineChartProps> = ({
  url,
  data,
  rawCsv,
  bytes = 5132288,
  parsingConfig = {},
  xAxis,
  yAxis,
  lineLabel,
  title = "",
}) => {
  const randomId = Math.random();
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <LineChartInner
        url={url}
        data={data}
        rawCsv={rawCsv}
        randomId={randomId}
        bytes={bytes}
        parsingConfig={parsingConfig}
        xAxis={xAxis}
        yAxis={yAxis}
        lineLabel={lineLabel ?? yAxis}
        title={title}
      />
    </QueryClientProvider>
  );
};

const LineChartInner: React.FC<PlotlyLineChartProps> = ({
  url,
  data,
  rawCsv,
  randomId,
  bytes,
  parsingConfig,
  xAxis,
  yAxis,
  lineLabel,
  title,
}) => {
  if (data) {
    return (
      <div className="w-full" style={{ height: "500px" }}>
        <Plotly
          layout={{
            title,
          }}
          data={[
            {
              x: data.map((d) => d[xAxis]),
              y: data.map((d) => d[yAxis]),
              mode: "lines",
              name: lineLabel,
            },
          ]}
        />
      </div>
    );
  }
  const { data: csvString, isLoading: isDownloadingCSV } = useQuery(
    ["dataCsv", url, randomId],
    () => getCsv(url as string, bytes ?? 5132288),
    { enabled: !!url },
  );
  const { data: parsedData, isLoading: isParsing } = useQuery(
    ["dataPreview", csvString, randomId],
    () =>
      parseCsv(
        rawCsv ? (rawCsv as string) : (csvString as string),
        parsingConfig ?? {},
      ),
    { enabled: rawCsv ? true : !!csvString },
  );
  if (isParsing || isDownloadingCSV)
    <div className="w-full flex justify-center items-center h-[500px]">
      <LoadingSpinner />
    </div>;
  if (parsedData)
    return (
      <div className="w-full" style={{ height: "500px" }}>
        <Plotly
          layout={{
            title,
          }}
          data={[
            {
              x: parsedData.data.map((d: any) => d[xAxis]),
              y: parsedData.data.map((d: any) => d[yAxis]),
              mode: "lines",
              name: lineLabel,
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
