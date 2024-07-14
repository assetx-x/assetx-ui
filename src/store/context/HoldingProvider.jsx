import React from "react";
import {
  BottomScreenActions,
  FILTERTABS,
  SCREENERS,
  SCREENS,
  TIMEINTERVALS,
} from "../../constants/holding";

const defaultState = {
  bottomState: {
    tab: 0,
    autoRefresh: true,
    filterTab: FILTERTABS.stock[0],
    screener: SCREENERS[0],
    screen: SCREENS[0],
    timeInterval: TIMEINTERVALS.stock[0],
    groups: [],
  },
};

const defaultContext = {
  state: defaultState,
  dispatch: () => {},
};

const HoldingContext = React.createContext(defaultContext);

const reducer = (state, action) => {
  switch (action.type) {
    case BottomScreenActions.SET_BOTTOM_STATE:
      return {
        ...state,
        bottomState: { ...state.bottomState, ...action.payload },
      };
    default:
      return state;
  }
};

function HoldingProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, defaultState);

  return (
    <HoldingContext.Provider value={{ state, dispatch }}>
      {props.children}
    </HoldingContext.Provider>
  );
}

const useHolding = () => React.useContext(HoldingContext);

export { HoldingProvider, useHolding };
