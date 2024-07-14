import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { BottomScreenActions, SCREENERS } from "../../../constants/holding";
import { useHolding } from "../../../store/context/HoldingProvider";

const Select = ({}) => {
  const { state, dispatch } = useHolding();

  const [open, setOpen] = React.useState(false);
  const popoverRef = React.useRef(null);

  const togglePopover = () => {
    setOpen(!open);
  };

  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const handleScreener = (screener) => {
    dispatch({
      type: BottomScreenActions.SET_BOTTOM_STATE,
      payload: { screener },
    });
  };

  const handleSelect = (_screener) => {
    handleScreener(_screener);
    setOpen(false);
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={popoverRef}>
      <button
        className={`px-1 py-1 rounded h-full hover:bg-gray-100${
          open ? " bg-gray-100" : ""
        }`}
        onClick={togglePopover}
      >
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`text-xs transition-transform${open ? " rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          className={`absolute top-full left-0 bg-white rounded shadow-md z-50`}
        >
          <ul>
            {SCREENERS.map((_screener, index) => (
              <li
                key={index}
                className={`whitespace-nowrap px-3 py-1 cursor-pointer text-sm transition-colors${
                  state.bottomState.screener === _screener
                    ? " bg-blue-600 text-white hover:bg-blue-700"
                    : " hover:bg-gray-100"
                }`}
                onClick={() => handleSelect(_screener)}
              >
                <span className="capitalize">{_screener}</span> Screener
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const NavButton = ({ isActive, label, onClick }) => (
  <button
    className={`text-sm px-3 py-1 rounded hover:bg-gray-100 capitalize transition-colors${
      isActive ? " text-blue-600" : ""
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

function NavBottom({}) {
  const { state, dispatch } = useHolding();

  const handleTab = (tab) => {
    dispatch({
      type: BottomScreenActions.SET_BOTTOM_STATE,
      payload: { tab },
    });
  };

  return (
    <div className="flex justify-between items-center w-full py-1 px-3 border-b-gray-200 border-b">
      <ul className="flex gap-1 items-center">
        <li className="flex items-center">
          <NavButton
            isActive={state.bottomState.tab == 0}
            label={`${state.bottomState.screener} Screener`}
            onClick={() => handleTab(0)}
          />
          <Select />
        </li>
        <li>
          <NavButton
            isActive={state.bottomState.tab == 1}
            label={`Pin Editor`}
            onClick={() => handleTab(1)}
          />
        </li>
        <li>
          <NavButton
            isActive={state.bottomState.tab == 2}
            label={`Strategy Tester`}
            onClick={() => handleTab(2)}
          />
        </li>
        <li>
          <NavButton
            isActive={state.bottomState.tab == 3}
            label={`Trading Panel`}
            onClick={() => handleTab(3)}
          />
        </li>
      </ul>
      <div>
        <button>Test</button>
      </div>
    </div>
  );
}

export default NavBottom;
