import React from "react";
import { LinearChart } from "./LinearChart.jsx";
import { NormalizedStackedAreaChart } from "./NormalizedStackedAreaChart.jsx";
import { BoxPlot } from "./BoxPlot.jsx";
import Logo from "../assets/images/corporate/logo.png";
import { BetaChart } from "./BetaChart.jsx";

const CardChart = ({ config }) => {
  const { name, description, data, chartTitle, chartSubtitle, chartLegend, type, useLogo } = config;

  const chartSwitch = (type) => ({
    "LinearChart": <LinearChart
      data={data}
      placeholderData={{ chartTitle, chartSubtitle, chartLegend }}
    />,
    "NormalizedStackedAreaChart": <NormalizedStackedAreaChart
      data={data}
      placeholderData={{ chartTitle, chartSubtitle, chartLegend }}
    />,
    "BoxPlot": <BoxPlot
      data={data}
      placeholderData={{ chartTitle, chartSubtitle, chartLegend }}
    />,
    "BetaChart": <BetaChart
      data={data}
      placeholderData={{ chartTitle, chartSubtitle, chartLegend }}
    />
  })[type] || chartSwitch("LinearChart");

  return (
    <div className="flex flex-wrap justify-center">
      <div
        className="w-full max-w-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="px-5 pb-5" style={{display: "flex", justifyContent: "center"}}>
          {useLogo ? (<img src={Logo} className=" h-16 w-auto pt-6" alt="logo" />) :
            <h5 className="pt-6 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{name}</h5>}
        </div>
        <div className="px-5 pb-5">
          {chartSwitch(type)}
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