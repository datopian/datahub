import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { read, utils } from 'xlsx';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Data } from '../types/properties';

export type ExcelProps = {
  data: Required<Pick<Data, 'url'>>;
};

export function Excel({ data }: ExcelProps) {
  const url = data.url;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeSheetName, setActiveSheetName] = useState<string>();
  const [workbook, setWorkbook] = useState<any>();
  const [rows, setRows] = useState<any>();
  const [cols, setCols] = useState<any>();

  const loadSpreadsheet = (wb: any, name: string) => {
    setActiveSheetName(name);
    const ws = wb.Sheets[name];

    const range = utils.decode_range(ws['!ref'] || 'A1');
    const columns = Array.from({ length: range.e.c + 1 }, (_, i) => ({
      field: utils.encode_col(i),
    }));

    const rowsAr = utils.sheet_to_json(ws, { header: 1 });
    const rows = rowsAr.map((row) => {
      const obj = {};
      columns.forEach((col, i) => {
        obj[col.field] = row[i];
      });
      return obj;
    });

    setRows(rows);
    setCols(columns);
  };

  useEffect(() => {
    setIsLoading(true);

    fetch(url)
      .then((res) => res.arrayBuffer())
      .then((f) => {
        const wb = read(f);
        setWorkbook(wb);
        loadSpreadsheet(wb, wb.SheetNames[0]);
        setIsLoading(false);
      });
  }, [url]);

  return isLoading ? (
    <div className="w-full flex items-center justify-center w-[600px] h-[300px]">
      <LoadingSpinner />
    </div>
  ) : (
    <>
      {cols && rows && (
        <div>
          <div
            className="ag-theme-alpine"
            style={{ height: 400, width: '100%' }}
          >
            <AgGridReact
              rowData={rows}
              columnDefs={cols}
              defaultColDef={{
                resizable: true,
                minWidth: 200,
                flex: 1,
                sortable: true,
                filter: true,
              }}
            ></AgGridReact>
          </div>
          <div className="border-t">
            {workbook.SheetNames.map((name: string, idx: number) => {
              return (
                <>
                  <button
                    key={idx}
                    className={`text-sm px-3 pb-2 pt-4 border-b border-l border-r ${
                      name == activeSheetName ? 'font-semibold' : ''
                    }`}
                    onClick={() => loadSpreadsheet(workbook, name)}
                  >
                    {name}
                  </button>
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
