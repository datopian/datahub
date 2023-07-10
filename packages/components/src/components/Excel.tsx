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
  const [rows, setRows] = useState<any>();
  const [cols, setCols] = useState<any>();

  useEffect(() => {
    setIsLoading(true);

    fetch(url)
      .then((res) => res.arrayBuffer())
      .then((f) => {
        const wb = read(f);
        const ws = wb.Sheets[wb.SheetNames[0]];

        const rows = utils.sheet_to_json(ws, { header: 1 });

        const range = utils.decode_range(ws['!ref'] || 'A1');
        const columns = Array.from({ length: range.e.c + 1 }, (_, i) => ({
          key: String(i),
          name: utils.encode_col(i),
          editor: textEditor,
        }));


        setRows(rows);
        setCols(columns);

        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <div className="w-full flex items-center justify-center w-[600px] h-[300px]">
      <LoadingSpinner />
    </div>
  ) : (
    <>
      {cols && rows && (
        <DataGrid columns={cols} rows={rows} onRowsChange={setRows} />
      )}
    </>
  );
}
