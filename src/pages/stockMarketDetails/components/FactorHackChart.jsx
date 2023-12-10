import React from "react";
import BlockUi from "@availity/block-ui";
import { Loader } from "react-loaders";
import { Button } from "../../../components/Button";
import ConditionalFactor from "./ConditionalFactor";

function FactorHackChart({
  data,
  currentTab,
  tabs,
  loading,
  onSelectTab,
  handleFactorHack,
}) {
  return (
    <section className="pl-[10px] pr-[10px]">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-3xl font-semibold">Conditional Risk Forecast</h3>
          <p className="text-gray-500 font-light mt-4 mb-4">
            Based on your underlying risk exposure, let's see how my
            recommendations would impact your portfolio. Click any of the risk
            theme's you'd like to find hedge options against and see how their
            presence in your portfolio would impact your portfolio.
          </p>
        </div>
        <div className="flex">
          <Button
            onClick={() => handleFactorHack()}
            className="mr-4"
            color="blue"
          >
            Hedge
          </Button>
          {tabs?.map((tab, index) => {
            return (
              <button type="button" key={index}>
                <input
                  className="hidden"
                  type="radio"
                  name={`tab-${index}-name`}
                  id={`tab-${index}`}
                  value={tab}
                  checked={currentTab === tab}
                  onChange={() => onSelectTab(tab)}
                />
                <label
                  className={`
                              px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 
                              hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 
                              focus:text-blue-700 ${
                                index === 0 ? "rounded-l-lg" : ""
                              } ${
                    index === tabs.length - 1 ? "rounded-r-lg" : ""
                  }`}
                  htmlFor={`tab-${index}`}
                >
                  {tab}
                </label>
              </button>
            );
          })}
        </div>
      </div>

      <BlockUi
        className="flex gap-4"
        blocking={loading}
        message="Fetching data, please wait"
        loader={<Loader active type="ball-scale" color="#0248C7" />}
      >
        <div className="w-1/2">
          {data && (
            <ConditionalFactor
              data={data.conditional_factor_example}
              terminal_date={data.terminal_date}
            />
          )}
          <p className="text-sm text-gray-500">
            This graph represents how your risk exposure would have changed if
            you had added one (or more) of our recommendations to your portfolio
            during your most recent rebalancing date{" "}
            {data.terminal_date ? `(${data.terminal_date})` : ""}
          </p>
        </div>
        <div className="w-1/2">
          {data && (
            <ConditionalFactor
              data={data.conditional_forecast}
              terminal_date={data.terminal_date}
              yaxisLabel="Cumulative Return"
            />
          )}
          <p className="text-sm text-gray-500">
            Given the additions you selected to your portfolio, we have assigned
            optimal weights to them and this graph represents the cumulative
            return difference of the conditional portfolio vs your portfolio if
            you had added them at your most recent rebalancing period{" "}
            {data.terminal_date ? `(${data.terminal_date})` : ""}
          </p>
        </div>
      </BlockUi>
    </section>
  );
}

export default FactorHackChart;
