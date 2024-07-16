import React from "react";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faFilter } from "@fortawesome/free-solid-svg-icons";
import { ButtonSelect } from "../Button";

const Filter = ({ title, open, onClose }) => {
  const popoverRef = React.useRef(null);

  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      onClose && onClose();
    }
  };

  return (
    <div
      className={`absolute z-20 right-0 top-0 py-1 px-2 bg-white shadow ${
        open ? "block" : "hidden"
      }`}
      ref={popoverRef}
    >
      <h5>{title}</h5>
      <div className="flex">
        <ButtonSelect value={"Below"}>
          <></>
        </ButtonSelect>
      </div>
    </div>
  );
};

const ColumnHead = ({ children, width, onClose }) => {
  const [openFilter, setOpenFilter] = React.useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <div
      className={`group w-[${
        width ?? 100
      }px] flex relative px-4 text-center bg-white items-center text-xs justify-center uppercase text-gray-500 border border-gray-100 shrink-0 grow-0 hover:bg-slate-100`}
      style={{ flexBasis: width ?? 100 }}
    >
      {children}
      <Filter title={children} open={openFilter} onClose={handleCloseFilter} />
      <div
        className="absolute z-[11] right-0 top-0 h-full hidden group-hover:flex p-1 border-l border-gray-200 justify-center items-center hover:bg-slate-200"
        onClick={handleOpenFilter}
      >
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
        <div className="flex sticky top-0 left-0 z-10">
          <div className="w-full bg-white min-w-[250px] text-gray-500 border border-gray-100">
            <div className="flex">
              <div className="pt-1 pr-1 w-4">
                <FontAwesomeIcon
                  icon={faBookmark}
                  className="-rotate-90 -translate-x-1 text-gray-300 text-lg"
                />
              </div>
              <div className="px-2 flex flex-col gap-0 text-[11px] py-1">
                <span className="uppercase" style={{ lineHeight: "normal" }}>
                  Ticket
                </span>
                <span className="uppercase" style={{ lineHeight: "normal" }}>
                  {rows.length} Matches
                </span>
                <span
                  className="uppercase text-blue-600"
                  style={{ lineHeight: "normal" }}
                >
                  3 Items
                </span>
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
              className="group flex flex-row w-full items-center border-b border-gray-100 hover:bg-gray-50"
              key={index}
            >
              <div className="w-full min-w-[250px] p-2">
                <div className="flex items-center">
                  <div className="pt-1 pr-1 w-4">
                    <FontAwesomeIcon
                      icon={faBookmark}
                      className="-rotate-90 -translate-x-3 text-gray-300 text-lg hidden group-hover:inline-block"
                    />
                  </div>
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
  rows: PropTypes.arrayOf(PropTypes.any).isRequired,
};
