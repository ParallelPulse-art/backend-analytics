interface Column {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  maxRows?: number;
}

export default function DataTable({ columns, data, maxRows = 8 }: DataTableProps) {
  const displayData = data.slice(0, maxRows);

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100">
            {columns.map((col) => (
              <th 
                key={col.key}
                className={`py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider ${
                  col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                }`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayData.map((row, i) => (
            <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
              {columns.map((col) => (
                <td 
                  key={col.key}
                  className={`py-3 px-4 text-sm ${
                    col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                  }`}
                >
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
