import React from "react";
import { ButtonSelect } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { BottomScreenActions, SCREENS } from "../../../../constants/holding";
import { useHolding } from "../../../../store/context/HoldingProvider";

function ScreenSelect({}) {
  const { state, dispatch } = useHolding();

  const handleTab = (tab) => {
    dispatch({
      type: BottomScreenActions.SET_BOTTOM_STATE,
      payload: {
        screen: tab,
      },
    });
  };

  return (
    <ButtonSelect
      value={state.bottomState.screen}
      className="rounded-r-none border-r-0"
    >
      <ul className="min-w-[250px] py-2">
        <li>
          <button className="flex gap-1 items-center w-full px-3 py-2 text-gray-600 text-sm hover:bg-gray-100 hover:text-gray-800 transition-colors whitespace-nowrap border-b border-gray-200">
            <FontAwesomeIcon icon={faDownload} />
            <span>Save Columns As...</span>
          </button>
        </li>

        <li>
          <ul className="py-2 max-h-[200px] overflow-y-auto">
            {SCREENS.map((_screen, i) => (
              <li key={i}>
                <button
                  className={`flex gap-2 items-center cursor-default justify-between w-full px-3 py-2 text-gray-600 text-sm hover:bg-gray-100 hover:text-gray-800 transition-colors whitespace-nowrap ${
                    _screen === state.bottomState.screen ? "bg-slate-200" : ""
                  }`}
                  onClick={() => {
                    handleTab(_screen);
                  }}
                >
                  <span>{_screen}</span>
                </button>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </ButtonSelect>
  );
}

export default ScreenSelect;
