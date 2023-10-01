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
  console.log("-> status", status);

  return (
    <span
      className={classNames(
        "px-1 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        status.startsWith("strong buy") ? "bg-green-100 text-green-700" : null,
        status.startsWith("weak buy") ? "bg-green-100 text-green-700" : null,
        status.startsWith("strong sell") ? "bg-red-100 text-red-700" : null,
        status.startsWith("weak sell") ? "bg-red-100 text-red-700" : null,
        status.startsWith("neutral")
          ? "bg-yellow-100-100 text-yellow-700"
          : null,
        status.startsWith("none") ? "bg-gray-100 text-gray-700" : null
      )}
    >
      {status}
    </span>
  );
}

const Table = ({ data, columns, paginated, itemsPerPage, handleRowClick }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const currentItems = rows.slice(
    currentPage * +itemsPerPage,
    (currentPage + 1) * +itemsPerPage
  );

  return (
    <>
      <div className="mt-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-3 h-{600}">
          <table
            {...getTableProps()}
            className="w-full text-sm text-left text-gray-500"
          >
            <thead className=" sticky  text-xs text-gray-700 uppercase bg-gray-50 ">
              {headerGroups.map((headerGroup, i) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                  {headerGroup.headers.map((column, i) => (
                    <th
                      {...column.getHeaderProps()}
                      scope="col"
                      className="px-6 py-3"
                      key={i}
                    >
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
                        <td
                          {...cell.getCellProps()}
                          className="px-6 py-4"
                          key={i}
                          onClick={() =>
                            handleRowClick?.(cell.row?.original?.id)
                          }
                        >
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
      {paginated && (
        <nav className="mt-5 flex flex-row-reverse pb-20">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={Math.ceil(rows.length / itemsPerPage)}
            onPageChange={handlePageClick}
            containerClassName={"inline-flex -space-x-px"}
            pageLinkClassName={
              "px-3 py-2 border border-gray-300 text-gray-500 hover:text-gray-700 leading-tight hover:bg-gray-100"
            }
            activeLinkClassName={"text-white bg-blue-500 hover:bg-blue-600"}
            previousLinkClassName={
              "px-3 py-2 leading-tight text-gray-500 border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
            }
            nextLinkClassName={
              "px-3 py-2 leading-tight text-gray-500 border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 "
            }
            disabledClassName={" hover:cursor-not-allowed"}
            disabledLinkClassName={
              "px-3 py-2 text-gray-500 border border-gray-300 bg-gray-100 hover:cursor-not-allowed"
            }
          />
        </nav>
      )}
    </>
  );
};
export default Table;
