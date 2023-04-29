import papa from "papaparse";

const parseCsv = (csv) => {
  csv = csv.trim();
  const rawdata = papa.parse(csv, { header: true });
  const cols = rawdata.meta.fields.map((r, i) => {
    return { key: r, name: r };
  });

  return {
    rows: rawdata.data,
    fields: cols,
  };
};

export default parseCsv;
