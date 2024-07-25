import React from "react";
import { graphTimespan } from "../../../constants/holding";
import { ChartComponent } from "./ChartComponent";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const initialData = [
  { time: "2018-12-22", value: 32.51 },
  { time: "2018-12-23", value: 31.11 },
  { time: "2018-12-24", value: 27.02 },
  { time: "2018-12-25", value: 27.32 },
  { time: "2018-12-26", value: 25.17 },
  { time: "2018-12-27", value: 28.89 },
  { time: "2018-12-28", value: 25.46 },
  { time: "2018-12-29", value: 23.92 },
  { time: "2018-12-30", value: 22.68 },
  { time: "2018-12-31", value: 22.67 },
];

function Graph(props) {
  const [currentTime, setCurrentTime] = React.useState("");

  React.useEffect(() => {
    const handleTime = () => {
      setCurrentTime(dayjs().utc().format("HH:mm:ss"));
    };
    setInterval(handleTime, 1000);

    return () => {
      clearInterval(handleTime);
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      <ChartComponent {...props} data={initialData}></ChartComponent>
      <div className="flex items-center justify-between gap-3 py-1 px-3 border-t border-gray-200">
        <div className="flex items-center gap-1">
          {graphTimespan.map((time, index) => (
            <button
              className="px-1 py-2 rounded text-xs font-semibold text-gray-700 hover:bg-gray-100"
              key={index}
            >
              {time.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <button className="px-1 py-2 rounded text-sm font-medium text-gray-700 hover:bg-gray-100">
            {currentTime} (UTC)
          </button>
        </div>
      </div>
    </div>
  );
}

export default Graph;
