import {
  createColumnHelper,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Table as ReactTable,
  useReactTable,
} from '@tanstack/react-table';

import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid';

import React, { useEffect, useMemo, useState } from 'react';

import parseCsv from '../lib/parseCsv';
import DebouncedInput from './DebouncedInput';
import loadData from '../lib/loadData';
import LoadingSpinner from './LoadingSpinner';

export type TableData = { cols: {key: string, name: string}[]; data: any[]; total: number };

export type TableProps = {
  data?: Array<{ [key: string]: number | string }>;
  cols?: Array<{ [key: string]: string }>;
  csv?: string;
  url?: string;
  fullWidth?: boolean;
  datastoreConfig?: {
    dataStoreURI: string;
    rowsPerPage?: number;
    dataMapperFn: (data) => Promise<TableData> | TableData;
  };
};

export const Table = ({
  data: ogData = [],
  cols: ogCols = [],
  csv = '',
  url = '',
  fullWidth = false,
  datastoreConfig,
}: TableProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageMap, setPageMap] = useState(new Map<number, boolean>());
  const {
    dataMapperFn,
    dataStoreURI,
    rowsPerPage = 10,
  } = datastoreConfig ?? {};

  const [globalFilter, setGlobalFilter] = useState('');
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);
  const [totalOfRows, setTotalOfRows] = useState<number>(0);

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: rowsPerPage,
  });

  const [lastIndex, setLastIndex] = useState(pageSize);
  const [startIndex, setStartIndex] = useState(0);
  const [hasSorted, setHasSorted] = useState(false);

  if (csv) {
    const out = parseCsv(csv);
    ogData = out.rows;
    ogCols = out.fields;
  }

  const [data, setData] = React.useState(ogData);
  const [cols, setCols] = React.useState(ogCols);
  // const [error, setError] = React.useState(""); //  TODO: add error handling

  const tableCols = useMemo(() => {
    const columnHelper = createColumnHelper();
    return cols.map((c) =>
      columnHelper.accessor<any, string>(c.key, {
        header: () => c.name,
        cell: (info) => info.getValue(),
      })
    );
  }, [data, cols]);

  let table: ReactTable<unknown>;

  if (datastoreConfig) {
    useEffect(() => {
      setIsLoading(true);
      fetch(`${dataStoreURI}&limit=${rowsPerPage}&offset=0`)
        .then((res) => res.json())
        .then(async (res) => {
          const { data, cols, total } = await dataMapperFn(res);
          setData(data);
          setCols(cols);
          setTotalOfRows(Math.ceil(total / rowsPerPage));
          pageMap.set(0, true);
        })
        .finally(() => setIsLoading(false));
    }, [dataStoreURI]);

    table = useReactTable({
      data,
      pageCount: totalOfRows,
      columns: tableCols,
      getCoreRowModel: getCoreRowModel(),
      state: {
        pagination: { pageIndex, pageSize },
      },
      getFilteredRowModel: getFilteredRowModel(),
      manualPagination: true,
      onPaginationChange: setPagination,
      getSortedRowModel: getSortedRowModel(),
    });

    useEffect(() => {
      if (!hasSorted) return;
      queryDataByText(globalFilter);
    }, [table.getState().sorting]);
  } else {
    table = useReactTable({
      data,
      columns: tableCols,
      getCoreRowModel: getCoreRowModel(),
      state: {
        globalFilter,
      },
      globalFilterFn: globalFilterFn,
      onGlobalFilterChange: setGlobalFilter,
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
    });
  }

  useEffect(() => {
    if (url) {
      setIsLoading(true);
      //  TODO: exception handling. What if the file doesn't exist? What if fetching was not possible?
      loadData(url).then((data) => {
        const { rows, fields } = parseCsv(data);
        setData(rows);
        setCols(fields);
        setIsLoading(false);
      });
    }
  }, [url]);

  const queryDataByText = (filter) => {
    setIsLoadingPage(true);
    const sortedParam = getSortParam();
    fetch(
      `${dataStoreURI}&limit=${rowsPerPage}&offset=0&q=${filter}${sortedParam}`
    )
      .then((res) => res.json())
      .then(async (res) => {
        const { data, total = 0 } = await dataMapperFn(res);
        setTotalOfRows(Math.ceil(total / rowsPerPage));
        setData(data);
        const newMap = new Map();
        newMap.set(0, true);
        setPageMap(newMap);
        table.setPageIndex(0);
        setStartIndex(0);
        setLastIndex(pageSize);
      })
      .finally(() => setIsLoadingPage(false));
  };

  const getSortParam = () => {
    const sort = table.getState().sorting;
    return sort.length == 0
      ? ``
      : '&sort=' +
          sort
            .map(
              (x, i) =>
                `${x.id}${
                  i === sort.length - 1 ? (x.desc ? ` desc` : ` asc`) : `,`
                }`
            )
            .reduce((x1, x2) => x1 + x2);
  };

  const queryPaginatedData = (newPageIndex) => {
    let newStartIndex = newPageIndex * pageSize;
    setStartIndex(newStartIndex);
    setLastIndex(newStartIndex + pageSize);

    if (!pageMap.get(newPageIndex)) pageMap.set(newPageIndex, true);
    else return;

    const sortedParam = getSortParam();

    setIsLoadingPage(true);
    fetch(
      `${dataStoreURI}&limit=${rowsPerPage}&offset=${
        newStartIndex + pageSize
      }&q=${globalFilter}${sortedParam}`
    )
      .then((res) => res.json())
      .then(async (res) => {
        const { data: responseData } = await dataMapperFn(res);
        responseData.forEach((e) => {
          data[newStartIndex] = e;
          newStartIndex++;
        });
        setData([...data]);
      })
      .finally(() => setIsLoadingPage(false));
  };

  return isLoading ? (
    <div className="w-full h-full min-h-[500px] flex items-center justify-center">
      <LoadingSpinner />
    </div>
  ) : (
    <div className={`${fullWidth ? 'w-[90vw] ml-[calc(50%-45vw)]' : 'w-full'}`}>
      <DebouncedInput
        value={globalFilter ?? ''}
        onChange={(value: any) => {
          if (datastoreConfig) queryDataByText(String(value));
          setGlobalFilter(String(value));
        }}
        className="p-2 text-sm shadow border border-block"
        placeholder="Search all columns..."
      />
      <table className="w-full mt-10">
        <thead className="text-left border-b border-b-slate-300">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((h) => (
                <th key={h.id} className="pr-2 pb-2">
                  <div
                    {...{
                      className: h.column.getCanSort()
                        ? 'cursor-pointer select-none'
                        : '',
                      onClick: (v) => {
                        setHasSorted(true);
                        h.column.getToggleSortingHandler()(v);
                      },
                    }}
                  >
                    {flexRender(h.column.columnDef.header, h.getContext())}
                    {{
                      asc: (
                        <ArrowUpIcon className="inline-block ml-2 h-4 w-4" />
                      ),
                      desc: (
                        <ArrowDownIcon className="inline-block ml-2 h-4 w-4" />
                      ),
                    }[h.column.getIsSorted() as string] ?? (
                      <div className="inline-block ml-2 h-4 w-4" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {datastoreConfig && isLoadingPage ? (
            <tr>
              <td colSpan={cols.length} rowSpan={cols.length}>
                <div className="w-full h-full flex items-center justify-center pt-6">
                  <LoadingSpinner />
                </div>
              </td>
            </tr>
          ) : (
            (datastoreConfig
              ? table.getRowModel().rows.slice(startIndex, lastIndex)
              : table.getRowModel().rows
            ).map((r) => (
              <tr key={r.id} className="border-b border-b-slate-200">
                {r.getVisibleCells().map((c) => (
                  <td key={c.id} className="py-2">
                    {flexRender(c.column.columnDef.cell, c.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex gap-2 items-center justify-center mt-10">
        <button
          className={`w-6 h-6 ${
            !table.getCanPreviousPage() ? 'opacity-25' : 'opacity-100'
          }`}
          onClick={() => {
            if (datastoreConfig) queryPaginatedData(0);
            table.setPageIndex(0);
          }}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronDoubleLeftIcon />
        </button>
        <button
          className={`w-6 h-6 ${
            !table.getCanPreviousPage() ? 'opacity-25' : 'opacity-100'
          }`}
          onClick={() => {
            if (datastoreConfig) {
              queryPaginatedData(table.getState().pagination.pageIndex - 1);
            }
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeftIcon />
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <button
          className={`w-6 h-6 ${
            !table.getCanNextPage() ? 'opacity-25' : 'opacity-100'
          }`}
          onClick={() => {
            if (datastoreConfig)
              queryPaginatedData(table.getState().pagination.pageIndex + 1);
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRightIcon />
        </button>
        <button
          className={`w-6 h-6 ${
            !table.getCanNextPage() ? 'opacity-25' : 'opacity-100'
          }`}
          onClick={() => {
            const pageIndexToNavigate = table.getPageCount() - 1;
            if (datastoreConfig) queryPaginatedData(pageIndexToNavigate);
            table.setPageIndex(pageIndexToNavigate);
          }}
          disabled={!table.getCanNextPage()}
        >
          <ChevronDoubleRightIcon />
        </button>
      </div>
    </div>
  );
};

const globalFilterFn: FilterFn<any> = (row, columnId, filterValue: string) => {
  const search = filterValue.toLowerCase();

  let value = row.getValue(columnId) as string;
  if (typeof value === 'number') value = String(value);

  return value?.toLowerCase().includes(search);
};
