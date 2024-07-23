import React from "react";
import Button, { ButtonSelect } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faStar,
  faTableColumns,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { BottomScreenActions, FILTERTABS } from "../../../../constants/holding";
import { useHolding } from "../../../../store/context/HoldingProvider";
import FavoriteTabs from "./FavoriteTabs";

function TabSelect({}) {
  const { state, dispatch } = useHolding();
  const [favoriteTabs, setFavoriteTabs] = React.useState(FILTERTABS.stock);
  const [tabs, setTabs] = React.useState(FILTERTABS.stock);

  const handleClickFavorite = (e, t) => {
    e.stopPropagation();
    handleFavoriteTabs(t);
  };

  const handleTab = (tab) => {
    dispatch({
      type: BottomScreenActions.SET_BOTTOM_STATE,
      payload: {
        filterTab: tab,
      },
    });
  };

  const handleFavoriteTabs = (_tab) => {
    if (favoriteTabs.includes(_tab)) {
      setFavoriteTabs(favoriteTabs.filter((tab) => tab !== _tab));
    } else {
      setFavoriteTabs([...favoriteTabs, _tab]);
    }
  };

  React.useEffect(() => {
    let _tabs = FILTERTABS.stock;
    if (state.bottomState.screener === "forex") {
      _tabs = FILTERTABS.forex;
    } else if (state.bottomState.screener === "crypto pairs") {
      _tabs = FILTERTABS.crypto_pairs;
    }
    handleTab(_tabs[0]);
    setFavoriteTabs(_tabs);
    setTabs(_tabs);
  }, [state.bottomState.screener]);

  return (
    <>
      <ButtonSelect
        value={state.bottomState.filterTab}
        className="rounded-r-none border-r-0 w-[100px]"
      >
        <ul className="min-w-[250px] py-2">
          <li>
            <button className="flex gap-1 items-center w-full px-3 py-2 text-gray-600 text-sm hover:bg-gray-100 hover:text-gray-800 transition-colors whitespace-nowrap border-b border-gray-200">
              <FontAwesomeIcon icon={faDownload} />
              <span>Save Columns As...</span>
            </button>
          </li>

          <li>
            <ul className="py-2">
              {tabs.map((_tab, i) => (
                <li key={i}>
                  <button
                    className={`flex gap-2 items-center cursor-default justify-between w-full px-3 py-2 text-gray-600 text-sm hover:bg-gray-100 hover:text-gray-800 transition-colors whitespace-nowrap ${
                      _tab === state.bottomState.filterTab ? "bg-slate-200" : ""
                    }`}
                    onClick={() => {
                      handleTab(_tab);
                    }}
                  >
                    <span>{_tab}</span>
                    <span className="block">
                      <FontAwesomeIcon
                        onClick={(e) => handleClickFavorite(e, _tab)}
                        icon={favoriteTabs.includes(_tab) ? faStar : farStar}
                        className={`${
                          favoriteTabs.includes(_tab)
                            ? "text-yellow-500"
                            : "text-gray-500"
                        } hover:text-orange-400 cursor-pointer`}
                      />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </ButtonSelect>
      <Button className="rounded-l-none mr-3">
        <FontAwesomeIcon icon={faTableColumns} />
      </Button>
      <FavoriteTabs tabs={favoriteTabs} handleTab={handleTab} />
    </>
  );
}

export default TabSelect;
