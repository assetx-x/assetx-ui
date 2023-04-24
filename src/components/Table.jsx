import React, { useState } from "react";
import { useTable } from "react-table";
import { classNames } from "../utils/index.js";
import ReactPaginate from "react-paginate";


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

const Table = ({ data, columns, paginated }) => {

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;


  const currentItems = rows.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <>
      <div className="mt-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-3 h-{600}">
          <table {...getTableProps()} className="w-full text-sm text-left text-gray-500">
            <thead className=" sticky  text-xs text-gray-700 uppercase bg-gray-50 ">
            {headerGroups.map((headerGroup, i) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                {headerGroup.headers.map((column, i) => (
                  <th {...column.getHeaderProps()} scope="col" className="px-6 py-3" key={i}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {currentItems.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="bg-white border-b  hover:bg-gray-50 "
                  key={i}
                >
                  {row.cells.map((cell, i) => {
                    return (
                      <td {...cell.getCellProps()} className="px-6 py-4" key={i}>
                        {cell.render("Cell")}
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
      {paginated && (<nav className="mt-5 flex flex-row-reverse">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(rows.length / itemsPerPage)}
          onPageChange={handlePageClick}
          containerClassName={"inline-flex -space-x-px"}
          previousLinkClassName={"px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}
          nextLinkClassName={"px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}
          disabledLinkClassName={"px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"}
          activeLinkClassName={"px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"}
          pageLinkClassName={"px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}
        />
      </nav>)}
    </>

  );
};
export default Table;