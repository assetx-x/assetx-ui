import React from 'react';
import { useTable } from 'react-table';



const PerformanceAttributionTable = ({data}) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Factor',
        accessor: 'factor',
      },
      {
        Header: 'Current',
        accessor: 'current',
      },
      {
        Header: 'Historical',
        accessor: 'historical',
      },
    ],
    []
  );

  const tableData = React.useMemo(() => {
    const factors = Object.keys(data.current);
    return factors.map(factor => ({
      factor,
      current: data.current[factor],
      historical: data.historical[factor],
    }));
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
        <tr {...headerGroup.getHeaderGroupProps()} className="bg-white border-b  hover:bg-gray-50 ">
          {headerGroup.headers.map(column => (
            <th  {...column.getHeaderProps()} className="px-6 py-4">
              {column.render('Header')}
            </th>
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
              <td {...cell.getCellProps()} className="px-6 py-4">
                {cell.render('Cell')}
              </td>
            ))}
          </tr>
        );
      })}
      </tbody>
    </table>
  );
};

export default PerformanceAttributionTable;