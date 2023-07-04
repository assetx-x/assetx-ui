import React from "react";
import { CombinedLinearChart } from "./CombinatedLinearChart.jsx";
import ReactStars from "react-stars/dist/react-stars.js";
import { NormalizedStackedAreaChart } from "./NormalizedStackedAreaChart.jsx";
import { useMain } from "../store/context/MainContext.jsx";

const CardChart = ({ config }) => {
  const { description, data, type, rates } = config;
  const context = useMain()

  const chartSwitch = (type) => ({
    "CombinedLinearChart": <CombinedLinearChart
      data={data}
    />,
    "HistoricalExplainerChart": <NormalizedStackedAreaChart
      data={data}
    />,
  })[type] || chartSwitch("LinearChart");

  function getRateNumber(rate){
    const rates = {'A+':5,
      'A':5,
      'A-':4.5,
      'B+':4,
      'B':4,
      'B-':3,
      'C+':3,
      'C':3,
      'C-':2.5,
      'D+':2,
      'D':2,
      'D-':1.5,
      'F':1}
    return rates[rate]
  }

  const handleClick = (key) => {
    context.setSelectedRatingData(key)
  }

  return (
    <div>
      <div className="px-5 pb-9">
        <p className="text-xl">{description}</p>
      </div>
      <div className="grid grid-cols-7 gap-8 px-5">
        {Object.entries(rates).map(([key, rate]) => (
          <div key={key} onClick={()=>handleClick(key)}>
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
      </div>
      <div>
        <div className="px-5 pb-5">
          {chartSwitch(type)}
        </div>

      </div>
    </div>
  );
};

export default CardChart;