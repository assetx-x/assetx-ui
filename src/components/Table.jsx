import React  from 'react';
import { useTable } from 'react-table';
import { classNames } from "../utils/index.js";

export function StatusPill({ value }) {
  const status = value ? value.toLowerCase() : "unknown";

  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        status.startsWith("active") ? "bg-green-100 text-green-700" : null,
        status.startsWith("inactive") ? "bg-red-100 text-red-700" : null,
        status.startsWith("offline") ? "bg-red-100 text-gray-700" : null
      )}
    >
      {status}
    </span>
  );
}

export function RecommendationPill({ value }) {
  const status = value ? value.toLowerCase() : "unknown";

  return (
    <span
      className={classNames(
        "px-1 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        status.startsWith("increase weight") ? "bg-green-100 text-green-700" : null,
        status.startsWith("decrease weight") ? "bg-red-100 text-red-700" : null,
        status.startsWith("none") ? "bg-gray-100 text-gray-700" : null
      )}
    >
      {status}
    </span>
  );
}
const Table = ({ data, columns }) => {



  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <div className="mt-10">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-3">
        <table {...getTableProps()} className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, i) => (
                <th {...column.getHeaderProps()} scope="col" className="px-6 py-3" key={i}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
          </thead>
          <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={i}
              >
                {row.cells.map((cell, i) => {
                  return (
                    <td {...cell.getCellProps()} className="px-6 py-4" key={i}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Table;