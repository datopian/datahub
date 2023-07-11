import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { read, utils } from 'xlsx';
import DataGrid, { Column, textEditor } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';

export type ExcelProps = {
  url: string;
};

export function Excel({ url }: ExcelProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeSheetName, setActiveSheetName] = useState<string>();
  const [workbook, setWorkbook] = useState<any>();
  const [rows, setRows] = useState<any>();
  const [cols, setCols] = useState<any>();

  const loadSpreadsheet = (wb: any, name: string) => {
    console.log(name)
    setActiveSheetName(name);
    const ws = wb.Sheets[name];
    const rows = utils.sheet_to_json(ws, { header: 1 });

    const range = utils.decode_range(ws['!ref'] || 'A1');
    const columns = Array.from({ length: range.e.c + 1 }, (_, i) => ({
      key: String(i),
      name: utils.encode_col(i),
      editor: textEditor,
    }));
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
          <DataGrid columns={cols} rows={rows} onRowsChange={setRows} />
          <div className="border-t">
            {workbook.SheetNames.map((name: string, idx: number) => {
              return (
                <button
                  className={`px-3 pb-1 pt-2 border-b border-l border-r ${
                    name == activeSheetName ? 'font-bold' : ''
                  }`}
                  onClick={() => loadSpreadsheet(workbook, name)}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
