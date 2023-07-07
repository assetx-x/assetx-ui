import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header.jsx";
import { Container } from "../../components/Container.jsx";
import Tabs from "../../components/Tabs.jsx";
import DetailView from "../stockMarketDetails/components/DetailView.jsx";
import BlockUi from "@availity/block-ui";
import { useMain } from "../../store/context/MainContext.jsx";
import { useQuery } from "react-query";
import fetchTickerDetails from "../../store/models/details/fetchTickerDetails.jsx";
import StackedView from "../stockMarketDetails/components/StackedView.jsx";
import { WaterfallChart } from "../../components/WaterfallChart.jsx";
import { Loader } from "react-loaders";

const TickerDetail = () => {
    const context = useMain();
    const { ticker } = useParams();
    const [investingHorizonOption, setInvestingHorizonsOption] = useState("21D");
    const {
      data,
      error,
      isLoading
    } = useQuery(["details", { ticker }], fetchTickerDetails);

    // Handle Errors
    useEffect(() => {
      if (error) {
        console.log("details error ", error);
      }

    }, [error]);

    // TODO: Add skeleton
    if (!data) return (
      <>
        <Header />
        <BlockUi blocking={isLoading}   loader={<Loader active type="ball-scale" color="#0248C7" />}>
          <Container />
          <div className="flex items-center justify-center h-screen">
          </div>
        </BlockUi>
      </>
    );

    function formatRates(obj) {
      return {
        "composite": {
          name: "All",
          value: obj.graphing_data?.composite?.rating
        },
        "fundamental_balance_sheet": {
          name: "Balance Sheet",
          value: obj.graphing_data?.fundamental_balance_sheet?.rating
        },
        "fundamental_ratios": { name: "Ratios", value: obj.graphing_data?.fundamental_ratios?.rating },
        "fundamental_cash_flow": { name: "Cash Flow", value: obj.graphing_data?.fundamental_cash_flow?.rating },
        "macro": { name: "Macro", value: obj.graphing_data?.macro?.rating },
        "momentum_fast": { name: "Fast", value: obj.graphing_data?.momentum_fast?.rating },
        "trend_following": { name: "Trend Following", value: obj.graphing_data?.trend_following?.rating }
      };
    }

    function formatHistoricalExplainingData(key = context.selectedRatingData) {
      const result = [];
      const obj = data.graphing_data?.[key]?.historical_importance;
      const xAxis = data.graphing_data?.composite?.["historical_dates"];

      for (const [key, value] of Object.entries(obj)) {
        if (key !== "date") {
          // Set groupnorm to 'percent' only for the first element
          const groupnorm = result.length === 0 ? "percent" : undefined;
          result.push(
            { x: xAxis, y: value, name: key, stackgroup: "one", groupnorm }
          );
        }
      }

      return result;
    }

    function formatRelativeHistoricalExplainingData(key = context.selectedRatingData) {
      const obj = data.relative?.[key];

      const result = [
        {
          type: "waterfall",
          orientation: "v",
          ...obj,
          "increasing": { "marker": { "color": "#537FA0" } },


          connector: {
            line: {
              color: "rgba(0, 0,0, 0)"
            }
          }
        }
      ];
      return result;
    }

    const historicalExplainerConfig = {
      charts:
        [
          {
            subtitle: "Relative",
            description: data.graphing_data?.composite?.forecast_information?.sentence,
            type: "WaterfallChart",
            rates: formatRates(data),
            data:
              formatRelativeHistoricalExplainingData(context.selectedRatingData)
          },
          {
            subtitle: "Absolute",
            type: "HistoricalExplainerChart",
            data:
              formatHistoricalExplainingData(context.selectedRatingData)
          }
        ]
    };

    const forecastChartConfig = {
      chart:
        {
          description: data.graphing_data?.composite?.forecast_information?.sentence,
          rates: formatRates(data),
          type: "CombinedLinearChart",
          data:
          data.graphing_data?.composite?.forecast_information
        }
    };
    const tabsConfig = {
      type: "underline",
      tabs: [
        { name: "Forecast", content: <DetailView config={forecastChartConfig} /> },
        { name: "Historical Explainer", content: <StackedView config={historicalExplainerConfig} /> }
      ]
    };

    return (
      <>
        <Header />
        <BlockUi blocking={isLoading} loader={<Loader active type="ball-scale" color="#0248C7" />}>
          <main>
            <Container>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex items-center justify-center w-168 h-168 mb-4 md:mb-0 md:mr-4">
                    <img src={data?.header_information?.company_logo} alt={data?.header_information?.company_name}
                         className="rounded-full" width={168}
                         height={168} />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-4xl pl-6">{data?.header_information?.company_name}</h1>
                    <div className="p-4 flex justify-between ">
                      {/*Investment Horizon*/}
                      <div className="ml-6">
                        <div className="inline-flex rounded-md shadow-sm" role="group">
                          <button type="button">
                            <input
                              className="hidden"
                              type="radio"
                              id="1D"
                              name="investingHorizons"
                              value="1D"
                              checked={investingHorizonOption === "1D"}
                              // onChange={handleInvestingHorizonsChange}
                            />
                            <label
                              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                              htmlFor="1D">
                              Daily
                            </label>
                          </button>
                          <button type="button">
                            <input
                              className="hidden"
                              type="radio"
                              id="21D"
                              name="investingHorizons"
                              value="21D"
                              checked={investingHorizonOption === "21D"}
                              // onChange={handleInvestingHorizonsChange}
                            />
                            <label
                              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 "
                              htmlFor="21D">
                              Monthly
                            </label>
                          </button>
                          <button type="button"
                                  className="">
                            <input
                              className="hidden"
                              type="radio"
                              id="42D"
                              name="investingHorizons"
                              value="42D"
                              checked={investingHorizonOption === "42D"}
                              // onChange={handleInvestingHorizonsChange}
                            />
                            <label
                              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 "
                              htmlFor="42D">
                              Bi-Monthly
                            </label>
                          </button>
                        </div>
                      </div>
                      {/*End Investment Horizon*/}
                      {/*TODO: this should be hidden on forecast tab*/}
                      {/*Objective Function*/}
                      <div className="ml-2 hidden">
                        <div className="inline-flex rounded-md shadow-sm" role="group">
                          <button type="button">
                            <input
                              className="hidden"
                              type="radio"
                              id="min_variance"
                              name="objectiveFunction"
                              value="min_variance"
                              // checked={objectiveFunctionOption === "min_variance"}
                              // onChange={handleObjectiveFunctionChange}
                            />
                            <label
                              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 "
                              htmlFor="min_variance">
                              Relative
                            </label>
                          </button>
                          <button type="button"
                                  className="">
                            <input
                              className="hidden"
                              type="radio"
                              id="max_sharpe"
                              name="objectiveFunction"
                              value="max_sharpe"
                              // checked={objectiveFunctionOption === "max_sharpe"}
                              // onChange={handleObjectiveFunctionChange}
                            />
                            <label
                              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                              htmlFor="max_sharpe">
                              Absolute
                            </label>
                          </button>
                        </div>

                      </div>
                      {/*End Objective Function*/}
                    </div>
                    <h2 className="pl-6"><span
                      className="text-5xl font-bold">{data?.header_information?.last_price}</span>
                      <span
                        className="ml-1 text-l">USD</span>
                      <span className="ml-4 text-xl text-green-600">{data?.header_information?.percent_change} </span>
                      {/*TODO: color should change based on the value*/}
                      <span className="text-xl text-red-600">%</span>
                    </h2>
                    {/*<h3 className="text-sm text-gray-400 pl-6">Last update at Apr 27, 11:16 EDT</h3>*/}
                  </div>
                </div>
              </div>
              {/*Tabs*/}
              <div className={"mt-6"}>
                <Tabs config={tabsConfig} />
              </div>
              {/*End Tabs*/}
            </Container>
          </main>
        </ BlockUi>
      </>
    );
  }
;

export default TickerDetail;