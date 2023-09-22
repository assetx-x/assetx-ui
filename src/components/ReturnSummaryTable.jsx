import { useTable } from "react-table";
import React from "react";

const ReturnSummaryTable = ({data}) => {

  const columns = React.useMemo(
    () => [
      {
        Header: 'Metric',
        accessor: 'metric', // accessor is the "key" in the data object
      },
      {
        Header: '1 Week',
        accessor: 'week',
      },
      {
        Header: '1 Month',
        accessor: 'month',
      },
      {
        Header: '1 Quarter',
        accessor: 'quarter',
      },
    ],
    []
  );

  const tableData = React.useMemo(() => {
    return Object.keys(data).map((metric) => {
      return {
        metric,
        week: data[metric]['1 Week'],
        month: data[metric]['1 Month'],
        quarter: data[metric]['1 Quarter'],
      };
    });
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: tableData });

  return (
    <table {...getTableProps()} className="w-full text-sm text-left text-gray-500">
      <thead className=" sticky  text-xs text-gray-700 uppercase bg-gray-50  ">
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()} className="bg-white border-b  hover:bg-gray-50 " >
          {headerGroup.headers.map(column => (
            <th {...column.getHeaderProps()} className="px-6 py-4">{column.render('Header')}</th>
          ))}
        </tr>
      ))}
      </thead>
      <tbody {...getTableBodyProps()}>
      {rows.map(row => {
        prepareRow(row);
        return (
          <tr {...row.getRowProps()} className="bg-white border-b  hover:bg-gray-50 ">
            {row.cells.map(cell => (
              <td {...cell.getCellProps()} className="px-6 py-4">{cell.render('Cell')}</td>
            ))}
          </tr>
        );
      })}
      </tbody>
    </table>
  );
};

export default ReturnSummaryTable;