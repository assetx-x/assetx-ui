import React from "react";
import { ButtonSelect } from "../Button";
import { BottomScreenActions, GROUPS } from "../../../../constants/holding";
import { useHolding } from "../../../../store/context/HoldingProvider";
import CheckBox from "../../CheckBox";

function GroupSelect({}) {
  const { state, dispatch } = useHolding();

  const handleGroup = (item) => {
    let _groups = state.bottomState.groups;
    if (_groups.includes(item)) {
      _groups = _groups.filter((_item) => _item !== item);
    } else {
      if (item === "All") {
        _groups = [item];
      } else {
        if (_groups.includes("All")) {
          _groups = _groups.filter((_item) => _item !== "All");
        }
        _groups.push(item);
      }
    }
    dispatch({
      type: BottomScreenActions.SET_BOTTOM_STATE,
      payload: {
        groups: _groups.length ? _groups : ["All"],
      },
    });
  };

  return (
    <ButtonSelect
      value={`${state.bottomState.groups.join(", ")} Pairs`}
      positionH="right"
    >
      <ul className="py-2">
        {GROUPS.map((group, i) => (
          <li key={i}>
            <button
              className={`flex gap-2 items-center cursor-default justify-between w-full px-3 py-2 text-gray-600 text-sm hover:bg-gray-100 hover:text-gray-800 transition-colors whitespace-nowrap ${
                group === state.bottomState.filterTab ? "bg-slate-200" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <CheckBox
                onChange={(value) => handleGroup(group)}
                label={group}
                value={state.bottomState.groups.includes(group)}
              />
            </button>
          </li>
        ))}
      </ul>
    </ButtonSelect>
  );
}

export default GroupSelect;
