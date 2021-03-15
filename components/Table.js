/* eslint-disable max-len */
import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
/*
 * @param schema: Frictionless Table Schmea
 * @param data: an array of data objects e.g. [ {a: 1, b: 2}, {a: 5, b: 7} ]
 */
const Table = ({ schema, data }) => {
  const columns = schema.fields.map((field) => (
    {
      field: field.title || field.name,
      headerName: field.name,
      width: 300
    }
  ))
  data = data.map((item, index)=>{
    item.id = index //Datagrid requires every row to have an ID
    return item
  })
  
  return (
    <div data-testid="tableGrid" style={{ height: 400, width: '100%' }}>
      <DataGrid rows={data} columns={columns} pageSize={5} />
    </div>
  );
}

export default Table
