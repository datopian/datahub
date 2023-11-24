import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

export interface BucketViewerProps {
  domain: string;
  suffix?: string;
  className?: string;
  dataMapperFn: (rawData: Response) => Promise<BucketViewerData[]>;
}

export interface BucketViewerData {
  fileName: string;
  downloadFileUri: string;
  dateProps?: {
    date: Date;
    dateFormatter: (date: Date) => string;
  };
}

export function BucketViewer({
  domain,
  suffix,
  dataMapperFn,
  className,
}: BucketViewerProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bucketFiles, setBucketFiles] = useState<BucketViewerData[]>([]);
  suffix = suffix ?? '/';

  useEffect(() => {
    setIsLoading(true);
    fetch(`${domain}${suffix}`)
      .then((res) => dataMapperFn(res))
      .then((data) => setBucketFiles(data))
      .finally(() => setIsLoading(false));
  }, [domain, suffix]);
  return isLoading ? (
    <div className="w-full flex items-center justify-center h-[300px]">
      <LoadingSpinner />
    </div>
  ) : bucketFiles ? (
    <>
      {...bucketFiles?.map((data, i) => (
        <ul
          onClick={() => {
            const anchorId = `download_anchor_${i}`;
            const a: HTMLAnchorElement =
              (document.getElementById(anchorId) as HTMLAnchorElement | null) ??
              document.createElement('a');
            a.id = anchorId;
            if (a.download) a.click();
            else {
              setIsLoading(true);
              fetch(data.downloadFileUri)
                .then((res) => res.blob())
                .then((res) => {
                  a.href = URL.createObjectURL(res);
                  a.download = res.name ?? data.fileName;
                  document.body.appendChild(a);
                  a.click();
                })
                .finally(() => setIsLoading(false));
            }
          }}
          key={i}
          className={`${
            className ??
            'mb-2 border-b-[2px] border-b-[red] hover:cursor-pointer'
          }`}
        >
          <li>{data.fileName}</li>
          {data.dateProps ? (
            <li>{data.dateProps.dateFormatter(data.dateProps.date)}</li>
          ) : (
            <></>
          )}
        </ul>
      ))}
    </>
  ) : null;
}
