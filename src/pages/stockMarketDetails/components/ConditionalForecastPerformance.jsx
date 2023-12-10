import React from "react";
import BlockUi from "@availity/block-ui";
import { Loader } from "react-loaders";

function ConditionalForecastPerformance({ datas, loading }) {
  return (
    <div className="relative overflow-x">
      <div className="relative overflow-x-hidden shadow-md sm:rounded-lg p-3 h-[650px]">
        <h3 className="text-xl font-semibold">
          Conditional Forecast Performance
        </h3>

        <p className="text-gray-500 font-light mt-4 mb-4">
          Here you can see summary statistics on how AssetX's optimal portfolio
          performed with the additions of the tickers you selected
        </p>
        <BlockUi
          blocking={loading}
          loader={<Loader active type="ball-scale" color="#0248C7" />}
        >
          <table className="w-full text-sm text-left text-gray-500">
            <thead className=" sticky  text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th className="px-6 py-3">Metric</th>
                <th className="px-6 py-3">Conditional Portfolio</th>
              </tr>
            </thead>
            <tbody>
              {datas?.map(({ metric, value }, index) => (
                <tr
                  key={index}
                  className={`bg-white border-b cursor-pointer hover:bg-gray-50`}
                  onClick={() => onClickItem(symbol)}
                >
                  <td className="px-6 py-4">
                    <strong>{metric}</strong>
                  </td>
                  <td className="px-6 py-4">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </BlockUi>
      </div>
    </div>
  );
}

export default ConditionalForecastPerformance;
