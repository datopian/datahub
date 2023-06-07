import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Papa from 'papaparse';
import { Grid } from '@githubocto/flat-ui';
import LoadingSpinner from './LoadingSpinner';

const queryClient = new QueryClient();

export async function getCsv(url: string, corsProxy?: string) {
  if (corsProxy) {
    url = corsProxy + url;
  }
  const response = await fetch(url, {
    headers: {
      Range: 'bytes=0-5132288',
    },
  });
  const data = await response.text();
  return data;
}

export async function parseCsv(file: string): Promise<any> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
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
  corsProxy?: string;
}
export const FlatUiTable: React.FC<FlatUiTableProps> = ({
  url,
  data,
  rawCsv,
  corsProxy,
}) => {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <TableInner corsProxy={corsProxy} url={url} data={data} rawCsv={rawCsv} />
    </QueryClientProvider>
  );
};

const TableInner: React.FC<FlatUiTableProps> = ({
  url,
  data,
  rawCsv,
  corsProxy,
}) => {
  if (data) {
    return (
      <div className="w-full" style={{ height: '500px' }}>
        <Grid data={data} />
      </div>
    );
  }
  const { data: csvString, isLoading: isDownloadingCSV } = useQuery(
    ['dataCsv', url],
    () => getCsv(url as string, corsProxy),
    { enabled: !!url }
  );
  const { data: parsedData, isLoading: isParsing } = useQuery(
    ['dataPreview', csvString],
    () => parseCsv(rawCsv ? (rawCsv as string) : (csvString as string)),
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
