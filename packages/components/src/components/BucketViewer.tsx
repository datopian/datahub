import { CSSProperties, ReactNode, useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

export interface BucketViewerFilterSearchedDataEvent { 
  startDate?: Date;
  endDate?: Date; 
}

export interface BucketViewerProps {
  onLoadTotalNumberOfItems?: (total: number) => void;
  domain: string;
  suffix?: string;
  className?: string;
  downloadComponent?: ReactNode;
  paginationConfig?: BucketViewerPaginationConfig;
  filterState?: BucketViewerFilterSearchedDataEvent;
  dataMapperFn: (rawData: Response) => Promise<BucketViewerData[]>;
}

export interface BucketViewerPaginationConfig {
  containerClassName?: string;
  containerStyles?: CSSProperties;
  itemsPerPage: number;
}

export interface BucketViewerData {
  fileName: string;
  downloadFileUri: string;
  dateProps?: {
    date: Date;
    dateFormatter?: (date: Date) => string;
  };
}

export function BucketViewer({
  domain,
  downloadComponent,
  suffix,
  dataMapperFn,
  className,
  filterState,
  paginationConfig,
  onLoadTotalNumberOfItems
}: BucketViewerProps) {

  suffix = suffix ?? '/';
  downloadComponent = downloadComponent ?? <></>;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDownloadComponentOnLine, setShowDownloadComponentOnLine] = useState(-1);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [lastPage, setLastPage] = useState<number>(0);
  const [bucketFiles, setBucketFiles] = useState<BucketViewerData[]>([]);
  const [paginatedData, setPaginatedData] = useState<BucketViewerData[]>([]);
  const [filteredData, setFilteredData] = useState<BucketViewerData[]>([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${domain}${suffix}`)
      .then((res) => dataMapperFn(res))
      .then((data) => {
        setBucketFiles(data);
        setFilteredData(data);
      })
      .finally(() => setIsLoading(false));
  }, [domain, suffix]);

  useEffect(
    () => {
      if(paginationConfig) {
        const startIndex = paginationConfig
          ? currentPage * paginationConfig.itemsPerPage
          : 0;

        const endIndex = paginationConfig
          ? startIndex + paginationConfig.itemsPerPage
          : 0;

        setLastPage(Math.ceil(filteredData.length / paginationConfig.itemsPerPage) - 1);
        setPaginatedData(filteredData.slice(startIndex, endIndex));
      }
    }, 
    [currentPage, filteredData]
  );

  useEffect(
    () => {
      if(onLoadTotalNumberOfItems) onLoadTotalNumberOfItems(filteredData.length);
    }, 
    [filteredData]
  )

  useEffect(() => {
      if(!filterState) return;

      if (filterState.startDate && filterState.endDate) {
        setFilteredData(bucketFiles.filter(({ dateProps }) => 
          dateProps 
            ? 
              dateProps.date.getTime() >= filterState.startDate.getTime() 
              && dateProps.date.getTime() <= filterState.endDate.getTime() 
            : true
        ));
      } else if(filterState.startDate) {
        setFilteredData(bucketFiles.filter(({ dateProps }) => 
          dateProps ? dateProps.date.getTime() >= filterState.startDate.getTime() : true
        ));
      } else if(filterState.endDate) {
        setFilteredData(bucketFiles.filter(({ dateProps }) => 
          dateProps ? dateProps.date.getTime() <= filterState.endDate.getTime() : true
        ));
      } else {
        setFilteredData(bucketFiles);
      }
    }, 
    [filterState]
  )

  return isLoading ? (
    <div className="w-full flex items-center justify-center h-[300px]">
      <LoadingSpinner />
    </div>
  ) : bucketFiles ? (
    <>
      {...(paginationConfig && bucketFiles
        ? paginatedData
        : filteredData
      )?.map((data, i) => (
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
          onMouseEnter={() => setShowDownloadComponentOnLine(i)}
          onMouseLeave={() => setShowDownloadComponentOnLine(undefined)}
          className={`${
            className ??
            'mb-2 border-b-[2px] border-b-[red] hover:cursor-pointer'
          }`}
        >
          {
            downloadComponent && showDownloadComponentOnLine === i 
              ? downloadComponent
              : <></>
          }
          <div>
            <li>{data.fileName}</li>
            {data.dateProps && data.dateProps.dateFormatter ? (
              <li>{data.dateProps.dateFormatter(data.dateProps.date)}</li>
            ) : (
              <></>
            )}
          </div>
        </ul>
      ))}
      {paginationConfig ? (
        <ul className={
            paginationConfig.containerClassName 
              ? paginationConfig.containerClassName 
              : "flex justify-end gap-x-[0.5rem] w-full"
            }
            style={paginationConfig.containerStyles ?? {}}
          >
          <li>
            <button 
              className="hover:cursor-pointer hover:disabled:cursor-not-allowed"
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(0)}>First</button>
          </li>
          <li>
            <button
              className="hover:cursor-pointer hover:disabled:cursor-not-allowed"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Previous
            </button>
          </li>
          <label>
            {currentPage + 1}
          </label>

          <li>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage >= lastPage}
              className="hover:cursor-pointer hover:disabled:cursor-not-allowed"
            >
              Next
            </button>
          </li>

          <li>
            <button
              onClick={() => setCurrentPage(lastPage)}
              disabled={currentPage >= lastPage}
              className="hover:cursor-pointer hover:disabled:cursor-not-allowed"
            >
              Last
            </button>
          </li>
        </ul>
      ) : (
        <></>
      )}
    </>
  ) : null;
}
