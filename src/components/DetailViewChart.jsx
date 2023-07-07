import React from "react";
import { CombinedLinearChart } from "./CombinatedLinearChart.jsx";
import ReactStars from "react-stars/dist/react-stars.js";
import { NormalizedStackedAreaChart } from "./NormalizedStackedAreaChart.jsx";
import { useMain } from "../store/context/MainContext.jsx";
import { WaterfallChart } from "./WaterfallChart.jsx";

const CardChart = ({ config }) => {
  const { description, data, type, rates, subtitle } = config;
  const context = useMain();

  const chartSwitch = (type) => ({
    "CombinedLinearChart": <CombinedLinearChart
      data={data}
    />,
    "HistoricalExplainerChart": <NormalizedStackedAreaChart
      data={data}
    />,
    "WaterfallChart": <WaterfallChart
      data={data}
    />
  })[type] || chartSwitch("LinearChart");

  function getRateNumber(rate) {
    const rates = {
      "A+": 5,
      "A": 5,
      "A-": 4.5,
      "B+": 4,
      "B": 4,
      "B-": 3,
      "C+": 3,
      "C": 3,
      "C-": 2.5,
      "D+": 2,
      "D": 2,
      "D-": 1.5,
      "F": 1
    };
    return rates[rate];
  }

  const handleClick = (key) => {
    context.setSelectedRatingData(key);
  };

  return (
    <div>
      <div className="px-5 pb-9">
        <p className="text-xl">{description}</p>
      </div>
      <hr />
      {rates && (<div className="grid grid-cols-7 gap-8 px-5 text-center m-4">
        {Object.entries(rates).map(([key, rate]) => (
          <div key={key} onClick={() => handleClick(key)}>
            <h3 className="font-bold">{rate.name}</h3>
            <ReactStars
              count={5}
              size={24}
              color1="#FFFFFF"
              color2="#0284C7"
              edit={false}
              value={getRateNumber(rate.value)}
            />
          </div>
        ))}
      </div>)}
      <hr />
      <div>
        <div className="px-5 m-4 ">
          {subtitle && (<h1 className="text-4xl font-extrabold ">
              <small
                className="ml-2 p-6 font-semibold text-gray-500 ">
                {subtitle}
              </small>
            </h1>
          )}
          {chartSwitch(type)}
        </div>

      </div>
    </div>
  );
};

export default CardChart;