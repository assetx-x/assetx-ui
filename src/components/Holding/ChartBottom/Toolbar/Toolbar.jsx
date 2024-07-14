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
import GroupSelect from "./GroupSelect";
import ScreenSelect from "./ScreenSelect";
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
    <div className="flex justify-between items-center w-full py-2 px-4 border-b-gray-200 border-b">
      <div className="flex gap-3 items-center">
        <div className="flex items-center">
          <Button className="rounded-r-none border-r-0">
            <FontAwesomeIcon
              icon={faArrowsRotate}
              className={
                state.bottomState.autoRefresh
                  ? "text-blue-500"
                  : "text-gray-500"
              }
            />
          </Button>
          <Button className="rounded-l-none">
            <FontAwesomeIcon icon={faEllipsisV} />
          </Button>
        </div>
        <TabSelect />
      </div>
      <div className="flex gap-2 items-center">
        <Button className="">
          <FontAwesomeIcon icon={faDownload} />
        </Button>
        <ButtonSelect
          value={
            <span className="font-semibold">
              {timeInterval.match(/\d+/g).join("")}
              <sup className="text-[9px]">
                {timeInterval.match(/[a-zA-Z]+/g).join("")}
              </sup>
            </span>
          }
          className="w-[60px]"
        >
          <ul className="py-2">
            {intervals.map((t, index) => (
              <li key={index}>
                <button
                  className="w-full px-3 py-2 text-gray-600 text-sm hover:bg-gray-100 hover:text-gray-800 transition-colors whitespace-nowrap"
                  onClick={() => setTimeInterval(t)}
                >
                  <span
                    className={`font-semibold${
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
        <GroupSelect />
        <div className="flex items-center">
          <ScreenSelect />
          <Filters />
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
