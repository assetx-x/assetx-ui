import React from "react";
import { LinearChart } from "./LinearChart.jsx";
const CardChart = ({config}) => {
  const {name, description, data, chartTitle, chartSubtitle, chartLegend} = config;

  return (
    <div className="flex flex-wrap justify-center">
      <div
        className="w-full max-w-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="px-5 pb-5">
          <h5 className=" pt-6 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        </div>
        <div className="px-5 pb-5">
          <LinearChart
            data={data}
            placeholderData={{ chartTitle, chartSubtitle, chartLegend }}
          />
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