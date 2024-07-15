import React from "react";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const Filter = () => {
  return <div></div>;
};

const ColumnHead = ({ children, width }) => {
  return (
    <div
      className={`group w-[${
        width ?? 100
      }px] flex relative bg-white items-center text-xs justify-center uppercase text-gray-500 border border-gray-100 shrink-0 grow-0 hover:bg-slate-100`}
      style={{ flexBasis: width ?? 100 }}
    >
      {children}
      <Filter />
      <div className="absolute right-0 top-0 h-full hidden group-hover:flex p-1 border-l border-gray-200 justify-center items-center hover:bg-slate-200">
        <FontAwesomeIcon
          icon={faFilter}
          className="h-fulltext-gray-500 text-xs"
        />
      </div>
    </div>
  );
};

function Table({ columns, rows }) {
  return (
    <PerfectScrollbar>
      <div className="flex flex-col w-full grow relative text-xs">
        {/* Head */}
        <div className="flex sticky top-0 left-0 z-30">
          <div className="w-full bg-white min-w-[250px] text-gray-500 border border-gray-100">
            <div className="flex">
              <div className="px-2 flex flex-col gap-0 text-xs">
                <span className="uppercase">Ticket</span>
                <span className="uppercase">{rows.length} Matches</span>
                <span className="uppercase text-blue-600">3 Items</span>
              </div>
            </div>
          </div>
          {columns.map((column, index) => (
            <ColumnHead key={index} width={column.width}>
              {column.name}
            </ColumnHead>
          ))}
        </div>
        {/* Body */}
        <div className="grow w-full">
          {rows.map((row, index) => (
            <div
              className="flex flex-row w-full items-center border-b border-gray-100"
              key={index}
            >
              <div className="w-full min-w-[250px] p-2">
                <div className="flex items-center">
                  <div className="w-[30px] h-[30px] rounded-full bg-slate-500" />
                  <div className="px-2 flex flex-col gap-0 text-xs">
                    <span className="uppercase font-semibold">Microsoft</span>
                    <span className="uppercase font-light text-[10px]">
                      3 Items
                    </span>
                  </div>
                </div>
              </div>
              {columns.map((column, index) => (
                <div
                  className={`w-[${
                    column.width ?? 100
                  }px] h-full flex gap-1 items-center justify-center shrink-0 grow-0 px-2`}
                  style={{ flexBasis: column.width ?? 100 }}
                  key={index}
                >
                  {row[column.key]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </PerfectScrollbar>
  );
}

export default Table;

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      width: PropTypes.number,
    })
  ).isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
};
