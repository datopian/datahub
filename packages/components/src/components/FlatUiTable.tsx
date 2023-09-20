import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Papa from 'papaparse';
import { Grid } from '@githubocto/flat-ui';
import LoadingSpinner from './LoadingSpinner';

const queryClient = new QueryClient();

export async function getCsv(url: string, bytes) {
  const response = await fetch(url, {
    headers: {
      Range: `bytes=0-${bytes}`,
    },
  });
  const data = await response.text();
  return data;
}

export async function parseCsv(file: string, parsingConfig): Promise<any> {
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

export interface FlatUiTableProps {
  url?: string;
  data?: { [key: string]: number | string }[];
  rawCsv?: string;
  randomId?: number;
  bytes: number;
  parsingConfig: any;
}
export const FlatUiTable: React.FC<FlatUiTableProps> = ({
  url,
  data,
  rawCsv,
  bytes = 5132288,
  parsingConfig = {},
}) => {
  const randomId = Math.random();
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <TableInner
        bytes={bytes}
        url={url}
        data={data}
        rawCsv={rawCsv}
        randomId={randomId}
        parsingConfig={parsingConfig}
      />
    </QueryClientProvider>
  );
};

const TableInner: React.FC<FlatUiTableProps> = ({
  url,
  data,
  rawCsv,
  randomId,
  bytes,
  parsingConfig,
}) => {
  if (data) {
    return (
      <div className="w-full" style={{ height: '500px' }}>
        <Grid data={data} />
      </div>
    );
  }
  const { data: csvString, isLoading: isDownloadingCSV } = useQuery(
    ['dataCsv', url, randomId],
    () => getCsv(url as string, bytes),
    { enabled: !!url }
  );
  const { data: parsedData, isLoading: isParsing } = useQuery(
    ['dataPreview', csvString, randomId],
    () =>
      parseCsv(
        rawCsv ? (rawCsv as string) : (csvString as string),
        parsingConfig
      ),
    { enabled: rawCsv ? true : !!csvString }
  );
  if (isParsing || isDownloadingCSV)
    <div className="w-full flex justify-center items-center h-[500px]">
      <LoadingSpinner />
    </div>;
  if (parsedData)
    return (
      <div className="w-full" style={{ height: '500px' }}>
        <Grid data={parsedData.data} />
      </div>
    );
  return (
    <div className="w-full flex justify-center items-center h-[500px]">
      <LoadingSpinner />
    </div>
  );
};
