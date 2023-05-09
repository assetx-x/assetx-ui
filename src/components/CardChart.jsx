import React from "react";
import { LinearChart } from "./LinearChart.jsx";
const initialData = [
  { time: '2018-12-22', value: 32.51 },
  { time: '2018-12-23', value: 31.11 },
  { time: '2018-12-24', value: 27.02 },
  { time: '2018-12-25', value: 27.32 },
  { time: '2018-12-26', value: 25.17 },
  { time: '2018-12-27', value: 28.89 },
  { time: '2018-12-28', value: 25.46 },
  { time: '2018-12-29', value: 23.92 },
  { time: '2018-12-30', value: 22.68 },
  { time: '2018-12-31', value: 22.67 },
];
const CardChart = ({config}) => {
  const {name, description, data} = config;

  return (
    <div className="flex flex-wrap justify-center">
      <div
        className="w-full max-w-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="px-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        </div>
        <div className="px-5 pb-5">
          <LinearChart data={data}/>
        </div>
        <div className="px-5 pb-5">
          <p><span>{description}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardChart;