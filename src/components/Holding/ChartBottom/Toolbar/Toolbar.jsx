import React from "react";
import {
  faArrowsRotate,
  faDownload,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button, { ButtonSelect } from "../Button";
import TabSelect from "./TabSelect";
import { TIMEINTERVALS } from "../../../../constants/holding";
import { useHolding } from "../../../../store/context/HoldingProvider";
import Filters from "./Filters";

function Toolbar({}) {
  const { state } = useHolding();
  const [timeInterval, setTimeInterval] = React.useState(
    TIMEINTERVALS.stock[0]
  );
  const [intervals, setIntervals] = React.useState(TIMEINTERVALS.stock);

  React.useEffect(() => {
    let _intervals = TIMEINTERVALS.stock;
    if (state.bottomState.screener === "forex") {
      _intervals = TIMEINTERVALS.forex;
    } else if (state.bottomState.screener === "crypto pairs") {
      _intervals = TIMEINTERVALS.crypto_pairs;
    }
    setTimeInterval(_intervals[0]);
    setIntervals(_intervals);
  }, [state.bottomState.screener]);

  return (
    <div className="flex justify-between items-center w-full gap-2 py-2 px-4 border-b-gray-200 border-b">
      <div className="flex items-center w-full">
        <Button className="rounded-r-none border-r-0">
          <FontAwesomeIcon
            icon={faArrowsRotate}
            className={
              state.bottomState.autoRefresh ? "text-blue-500" : "text-gray-500"
            }
          />
        </Button>
        <Button className="rounded-l-none mr-3">
          <FontAwesomeIcon icon={faEllipsisV} />
        </Button>
        <TabSelect />
        <Button className="mr-3">
          <FontAwesomeIcon icon={faDownload} />
        </Button>
        <ButtonSelect
          value={
            <span className="font-medium">
              {timeInterval.match(/\d+/g).join("")}
              <sup className="text-[9px]">
                {timeInterval.match(/[a-zA-Z]+/g).join("")}
              </sup>
            </span>
          }
          className="w-[60px] mr-3"
        >
          <ul className="py-2">
            {intervals.map((t, index) => (
              <li key={index}>
                <button
                  className="w-full px-3 py-2 text-gray-600 text-sm hover:bg-gray-100 hover:text-gray-800 transition-colors whitespace-nowrap"
                  onClick={() => setTimeInterval(t)}
                >
                  <span
                    className={`font-medium text-xs${
                      t === timeInterval ? " text-blue-500" : ""
                    }`}
                  >
                    {t.match(/\d+/g).join("")}
                    <sup className="text-[9px]">
                      {t.match(/[a-zA-Z]+/g).join("")}
                    </sup>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </ButtonSelect>
        <Filters />
      </div>
    </div>
  );
}

export default Toolbar;
