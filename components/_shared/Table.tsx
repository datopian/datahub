interface TableProps {
  columns: Array<any>;
  data: Array<any>;
  className?: string;
}

const Table: React.FC<TableProps> = ({ columns, data, className }) => {
  return (
    <table className={`table-auto w-full text-sm text-left my-6 ${className}`}>
      <thead>
        <tr>
          {columns.map(({ key, name }) => (
            <th key={key} className="px-4 py-2">
              {name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map(({ key, render }) => (
              <td key={key} className="px-4 py-2">
                {(render && typeof render === 'function' && render(item)) ||
                  item[key] ||
                  ''}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
