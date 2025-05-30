
import React from 'react';

export interface DataTableProps<T> {
  data: T[];
  columns: any[];
}

export function DataTable<T>({ data, columns }: DataTableProps<T>) {
  return (
    <div className="rounded-md border">
      <table className="w-full">
        <thead>
          <tr>
            {columns.map((column, i) => (
              <th
                key={i}
                className="border-b px-4 py-2 text-left font-medium text-gray-500"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b">
              {columns.map((column, j) => (
                <td key={j} className="px-4 py-2">
                  {column.cell ? column.cell(row) : (row as any)[column.accessorKey]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
