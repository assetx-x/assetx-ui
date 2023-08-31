import React, { useContext, useEffect, useMemo, useState } from "react";
import { Header } from "../../components/Header.jsx";
import { Container } from "../../components/Container.jsx";
import Placeholder01 from "../../assets/images/placeholder-01.png";
import usFlag from "../../assets/images/us.png";
import Tabs from "../../components/Tabs.jsx";
import { RecommendationPill } from "../../components/Table.jsx";
import MiniChart from "../../assets/images/mini-chart.png";
import TwoColumnCharts from "./components/TwoColumnCharts.jsx";
import ResultsTable from "./components/ResultsTable.jsx";
import { useMain } from "../../store/context/MainContext.jsx";
import { Button } from "../../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import { formatDataForResultsTable, formatDataForTickerTable, formatDateToDashFormat } from "../../utils/index.js";
import {
  AsymmetricErrorBarsWithConstantOffsetChart
} from "../../components/AsymmetricErrorBarsWithConstantOffsetChart.jsx";
import { BasicWaterfallChart } from "../../components/BasicWaterfallChart.jsx";
import Dropdown from "../../components/Dropdown.jsx";

// function formatPortfoliPnlData(obj) {
//   const result = [];
//
//   for (const [key, value] of Object.entries(obj)) {
//     result.push({
//       "time": key,
//       "value": value
//     });
//   }
//
//   return result;
// }
//
// function formatRiskAllocationData(obj) {
//   const result = [];
//
//   for (const [key, value] of Object.entries(obj)) {
//     if (key !== "date") {
//       // Set groupnorm to 'percent' only for the first element
//       const groupnorm = result.length === 0 ? "percent" : undefined;
//
//       result.push(
//         { x: obj["date"], y: value, name: key, stackgroup: "one", groupnorm }
//       );
//     }
//   }
//
//
//   return result;
// }
//
// function formatFactorContributionData(obj) {
//   const result = [];
//
//   for (const [key, value] of Object.entries(obj)) {
//     if (key !== "dates") {
//       // Set groupnorm to 'percent' only for the first element
//       const groupnorm = result.length === 0 ? "percent" : undefined;
//
//       result.push(
//         { x: obj["dates"], y: value, name: key, stackgroup: "one", groupnorm }
//       );
//     }
//   }
//
//
//   return result;
// }
//
// function formatBeta(obj, decimals = 1) {
//   for (const [key, value] of Object.entries(obj)) {
//     obj[key] = value.toFixed(decimals);
//   }
//
//   return obj;
//
// }
//
// function formatPercentage(num, decimals = 2, type) {
//   if (!num) return (0).toFixed(decimals) + "%";
//   if (type === "sharpe") return (num).toFixed(decimals);
//   if (type === "ret") return (num * 100).toFixed(decimals) + "%";
//   return (num).toFixed(decimals) + "%";
// }

const NewPortfolioAnalysisResults = ({ portfolio }) => {
    const context = useMain();
    const navigate = useNavigate();
    console.log("-> context", context.predictionData);

    // const tabsConfig = {
    //   isMain: true,
    //   type: "underline",
    //   tabs: [
    //     { name: "A.I. Driven insights" ,
    //       // onClickHandler: () => navigate("/us/ai-driven-insights")
    //     },
    //     { name: "Regime Analysis" },
    //     { name: "Portfolio Analysis", onClickHandler: () => {} },
    //   ]
    // };
    // const performanceChartConfig = {
    //   charts: [
    //     {
    //       name: "Your portfolio allocation",
    //       description: `${portfolio?.[0]?.holdings?.client?.sentences?.portfolio_pnl}`,
    //       type: "LinearChart",
    //       chartSubtitle: `Sharpe (${formatPercentage(portfolio?.[0]?.holdings?.client?.optimizer_stats?.["Sharpe ratio"], 2, "sharpe")})`,
    //       chartTitle: `Annualized Ret (${formatPercentage(portfolio?.[0]?.holdings?.client?.optimizer_stats?.["Annual return"], 2, "ret")})`,
    //       chartLegend: `Annualized Vol (${formatPercentage(portfolio?.[0]?.holdings?.client?.optimizer_stats?.["Annual volatility"])})`,
    //       data:
    //         formatPortfoliPnlData(portfolio?.[0]?.holdings?.client?.portfolio_pnl)
    //     },
    //     {
    //       name: "Risk Constrained Allocation",
    //       type: "LinearChart",
    //       useLogo: true,
    //       description: `${portfolio?.[0]?.holdings?.asset_x?.sentences?.portfolio_pnl}`,
    //       chartSubtitle: `Sharpe (${formatPercentage(portfolio?.[0]?.holdings?.asset_x?.optimizer_stats?.["Sharpe ratio"], 2, "sharpe")})`,
    //       chartTitle: `Annualized Ret (${formatPercentage(portfolio?.[0]?.holdings?.asset_x?.optimizer_stats?.["Annual return"], 2, "ret")})`,
    //       chartLegend: `Annualized Vol (${formatPercentage(portfolio?.[0]?.holdings?.asset_x?.optimizer_stats?.["Annual volatility"])})`,
    //       data:
    //         formatPortfoliPnlData(portfolio?.[0]?.holdings?.asset_x?.portfolio_pnl)
    //     }
    //   ]
    // };
    // const riskAllocationChartConfig = {
    //   charts: [
    //     {
    //       name: "Your portfolio allocation",
    //       type: "NormalizedStackedAreaChart",
    //       description: `${portfolio?.[0]?.holdings?.client?.sentences.optimal_weights}`,
    //       data:
    //         formatRiskAllocationData(portfolio?.[0]?.holdings?.client?.optimal_weights_historical[0])
    //     },
    //     {
    //       name: "Dynamic Rebalancing",
    //       useLogo: true,
    //       type: "NormalizedStackedAreaChart",
    //       description: `${portfolio?.[0]?.holdings?.asset_x?.sentences?.optimal_weights}`,
    //       data:
    //         formatRiskAllocationData(portfolio?.[0]?.holdings?.asset_x?.optimal_weights_historical?.[0])
    //     }
    //   ]
    // };
    //
    // const factorContributionChartConfig = {
    //   charts: [
    //     {
    //       name: "Your portfolio allocation",
    //       type: "NormalizedStackedAreaChart",
    //       description: `${portfolio?.[0]?.holdings?.client?.sentences.factor_contribution}`,
    //       data:
    //         formatFactorContributionData(portfolio?.[0]?.holdings?.client?.factor_contribution)
    //     },
    //     {
    //       name: "Dynamic Rebalancing",
    //       useLogo: true,
    //       type: "NormalizedStackedAreaChart",
    //       description: `${portfolio?.[0]?.holdings?.asset_x?.sentences?.factor_contribution}`,
    //       data:
    //         formatFactorContributionData(portfolio?.[0]?.holdings?.asset_x?.factor_contribution)
    //     }
    //   ]
    // };
    // const last5SellOffsChartConfig = {
    //   charts: [
    //     {
    //       name: "Your historical drawdowns",
    //       type: "BoxPlot",
    //       description: `${portfolio?.[0]?.holdings?.client?.sentences?.drawdown
    //       }`,
    //       data:
    //         [
    //           {
    //             y: portfolio?.[0]?.holdings?.client?.drawdown_dates,
    //             boxpoints: "all",
    //             jitter: 0.3,
    //             pointpos: -1.8,
    //             type: "box",
    //             name: "Top Drawdowns",
    //             marker: {
    //               color: "#1E8FCC"
    //             }
    //           }
    //         ]
    //     },
    //     {
    //       name: "AssetX",
    //       useLogo: true,
    //       type: "BoxPlot",
    //       description: `${portfolio?.[0]?.holdings?.asset_x?.sentences?.drawdown
    //       }`,
    //       data:
    //         [
    //           {
    //             y: portfolio?.[0]?.holdings?.asset_x?.drawdown_dates,
    //             boxpoints: "all",
    //             jitter: 0.3,
    //             pointpos: -1.8,
    //             type: "box",
    //             name: "Top Drawdowns",
    //             marker: {
    //               color: "#1E8FCC"
    //             }
    //           }
    //         ]
    //     }
    //   ]
    // };
    // const betaChartConfig = {
    //   charts: [
    //     {
    //       name: "Your portfolio allocation",
    //       type: "BetaChart",
    //       description: `${portfolio?.[0]?.holdings?.client?.sentences?.beta}`,
    //       data:
    //         [{
    //           type: "bar",
    //           marker: {
    //             color: "#1E8FCC",
    //             opacity: 0.7
    //           },
    //           y: Object.keys(portfolio?.[0]?.holdings?.client?.beta),
    //           x: Object.values(portfolio?.[0]?.holdings?.client?.beta),
    //           text: formatBeta(Object.values(portfolio?.[0]?.holdings?.client?.beta)),
    //           textposition: "auto",
    //           orientation: "h"
    //
    //         }]
    //     },
    //     {
    //       name: "Dynamic Rebalancing",
    //       useLogo: true,
    //       type: "BetaChart",
    //       description: `${portfolio?.[0]?.holdings?.asset_x?.sentences?.beta}`,
    //       data:
    //         [{
    //           type: "bar",
    //           marker: {
    //             color: "#1E8FCC",
    //             opacity: 0.7
    //           },
    //           y: Object.keys(portfolio?.[0]?.holdings?.asset_x?.beta),
    //           x: Object.values(portfolio?.[0]?.holdings?.asset_x?.beta),
    //           text: formatBeta(Object.values(portfolio?.[0]?.holdings?.asset_x?.beta)),
    //           textposition: "auto",
    //           orientation: "h"
    //         }]
    //     }
    //   ]
    // };
    // const resultTabsConfig = {
    //   type: "pills",
    //   tabs: [
    //     { name: "Performance", "content": <TwoColumnCharts config={performanceChartConfig} key={0} /> },
    //     { name: "Portfolio Beta", "content": <TwoColumnCharts config={betaChartConfig} key={1} /> },
    //     { name: "Last 5 Sell Offs", "content": <TwoColumnCharts config={last5SellOffsChartConfig} key={2} /> },
    //     { name: "Risk Allocation", "content": <TwoColumnCharts config={riskAllocationChartConfig} key={3} /> },
    //     { name: "Factor Contribution", "content": <TwoColumnCharts config={factorContributionChartConfig} key={4} /> }
    //   ]
    // };
    // const handleRowClick = (ticker) => {
    //   window.open(`/us/ticker/${ticker}`, "_blank", "noreferrer");
    // };


    const resultColumns = useMemo(
      () => [
        {
          Header: "Ticker",
          accessor: "ticker",
          Cell: ({ row }) => (
            <div className="flex items-center" onClick={() => handleRowClick(row.original.ticker)}>
              <img
                className="w-10 h-10 rounded-full"
                src={row.original.company_logo || "https://www.ortodonciasyv.cl/wp-content/uploads/2016/10/orionthemes-placeholder-image-2.png"}
                alt={row.original.company_name + " image"}
              />
              <div className="pl-3">
                <div className="text-base font-semibold">{row.original.company_name}</div>
                <div className="font-normal text-gray-500">{row.original.ticker}</div>
              </div>
            </div>
          )
        },
        {
          Header: "Weigh",
          accessor: "weight"
        },

        {
          Header: "AssetX Signal",
          accessor: "AssetX Signal"
        }
      ],
      []
    );

  const subCategoriesColumns = useMemo(
    () => [
      {
        Header: "Ticker",
        accessor: "ticker",
        Cell: ({ row }) => (
          <div className="flex items-center" onClick={() => handleRowClick(row.original.ticker)}>
            <img
              className="w-10 h-10 rounded-full"
              src={row.original.company_logo || "https://www.ortodonciasyv.cl/wp-content/uploads/2016/10/orionthemes-placeholder-image-2.png"}
              alt={row.original.company_name + " image"}
            />
            <div className="pl-3">
              <div className="text-base font-semibold">{row.original.company_name}</div>
              <div className="font-normal text-gray-500">{row.original.ticker}</div>
            </div>
          </div>
        )
      },
      {
        Header: "Weigh",
        accessor: "weight"
      },

      {
        Header: "AssetX Signal",
        accessor: "AssetX Signal"
      }
    ],
    []
  );

    const keys = ["Growth", "Quality", "Macro", "Momentum Fast", "Momentum Slow", "Trend Following", "Value", "Other Factors", "Overall"];
    const [selectedKey, setSelectedKey] = useState(keys[0]);


    return (
      <>
        <Header />
        <main>
          <Container>
            <header className="flex">
              <h1 className="text-4xl font-semibold pl-4">Your Portfolio</h1>
            </header>
            <div className="grid grid-cols-6 gap-4 sm:col">
              <div className="col-span-6 md:col-span-3 lg:grid-cols-6 xl:col-span-4">
                <section>
                  <img width={"100%"} src={Placeholder01} alt="" />
                </section>
                <section>
                  <div className="mt-10 " style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <div >
                      <h3 className="text-3xl font-semibold">Historical Price Performance</h3>
                    </div>
                    <div>
                        <span
                          className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Value</span>
                      <span
                        className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Growth</span>

                    </div>
                    <div>
                      <span className="text-xs font-medium">Show history for:</span>
                      <span
                        className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">1Y</span>
                      <span
                        className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">3Y</span>
                      <span
                        className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">5Y</span>
                    </div>

                    {/*End Objective Function*/}
                  </div>
                  <AsymmetricErrorBarsWithConstantOffsetChart data={context.predictionData?.["1M"]?.portfolio} />
                </section>
                <section>
                  {/*Selectable options*/}
                  <div className="pl-[10px] pr-[10px]">

                    <div className="mt-10 " style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      <div >
                        <h3 className="text-3xl font-semibold">Details</h3>
                      </div>
                      <div>
                        <span className="text-xs font-medium">View by:</span>
                        <span
                          className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Categories</span>
                        <span
                          className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Individual</span>
                      </div>
                      <div>
                        <span
                          className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Historical</span>
                        <span
                          className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Current</span>

                      </div>
                      {/*End Objective Function*/}
                    </div>
                    <div className="mt-10" style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center"
                    }}>
                      {/*Investment Horizon*/}
                      <div>
                        {keys.map((key) => (
                          <button
                            className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
                            key={key}
                            onClick={() => setSelectedKey(key)}
                          >
                            {key}
                          </button>
                        ))}
                      </div>
                      {/*End Investment Horizon*/}
                    </div>
                  </div>
                  {/*End Selectable options*/}
                  <BasicWaterfallChart data={context.predictionData?.["1M"]?.feature_importance?.[selectedKey]} key={selectedKey} />
                </section>
                <section>
                  <h3 className="text-3xl font-semibold">Fundamental Sub Catgories</h3>
                  <ResultsTable columns={resultColumns} data={context.predictionData?.current_trading_book} />

                </section>
              </div>
              <div className="col-span-6 md:col-span-3 lg:grid-cols-6 xl:col-span-2">
                <h3 className="text-3xl font-semibold">Current Trading Book</h3>
                <ResultsTable columns={subCategoriesColumns} data={context.predictionData?.current_trading_book} />
              </div>
            </div>


            <footer>
              {/*card*/}
              <div className="m-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img className="rounded-t-lg" src="https://e3.365dm.com/23/08/2048x1152/skynews-apple-logo_6267788.jpg?20230830122917" alt="" />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </div>
              </div>
              {/*End card*/}
              {/*card*/}
              <div className="m-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img className="rounded-t-lg" src="https://e3.365dm.com/23/08/2048x1152/skynews-apple-logo_6267788.jpg?20230830122917" alt="" />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </div>
              </div>
              {/*End card*/}
              {/*card*/}
              <div className="m-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img className="rounded-t-lg" src="https://e3.365dm.com/23/08/2048x1152/skynews-apple-logo_6267788.jpg?20230830122917" alt="" />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </div>
              </div>
              {/*End card*/}
              {/*card*/}
              <div className="m-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img className="rounded-t-lg" src="https://e3.365dm.com/23/08/2048x1152/skynews-apple-logo_6267788.jpg?20230830122917" alt="" />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </div>
              </div>
              {/*End card*/}



            </footer>
          </Container>
        </main>
      </>
    );
  }
;

export default NewPortfolioAnalysisResults;