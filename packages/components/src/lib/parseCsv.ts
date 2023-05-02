import papa from "papaparse";

const parseCsv = (csv: string) => {
  csv = csv.trim();
  const rawdata = papa.parse(csv, { header: true });

  let cols: any[] = [];
  if(rawdata.meta.fields) {
    cols = rawdata.meta.fields.map((r: string) => {
      return { key: r, name: r };
    });
  }

  return {
    rows: rawdata.data as any,
    fields: cols,
  };
};

export default parseCsv;
