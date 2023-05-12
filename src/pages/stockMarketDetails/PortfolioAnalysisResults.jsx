import React, { useContext, useMemo, useState } from "react";
import { Header } from "../../components/Header.jsx";
import { Container } from "../../components/Container.jsx";
import usFlag from "../../assets/images/us.png";
import Tabs from "../../components/Tabs.jsx";
import { RecommendationPill } from "../../components/Table.jsx";
import MiniChart from "../../assets/images/mini-chart.png";
import TwoColumnCharts from "./components/TwoColumnCharts.jsx";
import ResultsTable from "./components/ResultsTable.jsx";
import { MainContext } from "../../store/context/MainContext.jsx";

function formatPortfoliPnlData(obj) {
  const result = [];

  for (const [key, value] of Object.entries(obj)) {
    result.push({
      "time": key,
      "value": value
    });
  }

  return result;
}


function formatRiskAllocationData(obj) {
  const result = [];

  for (const [key, value] of Object.entries(obj)) {
    if (key !== "date") {
      // Set groupnorm to 'percent' only for the first element
      const groupnorm = result.length === 0 ? "percent" : undefined;

      result.push(
        { x: obj["date"], y: value, name: key, stackgroup: "one", groupnorm }
      );
    }
  }


  return result;
}

function formatBeta (obj, decimals=1) {
  for(const [key, value] of Object.entries(obj)) {
    obj[key] = value.toFixed(decimals);
  }

  return obj;

}

function formatPercentage(num, decimals = 2) {
  return (num).toFixed(decimals) + "%";
}

const PortfolioAnalysisResults = (props) => {
    const context = useContext(MainContext);
    const [jsonResultData, setJsonResultData] = useState([
      {
        "ticker": "AAPL",
        "company_name": "Apple Inc.",
        "company_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiHtmcXWWWDYHXOQHeNfPkdA2OJYBuDxGU0G4_6eaJcGWr6G-gNNmGSXczyBbgEnE&usqp=CAU&ec=48665698",
        "recommendation": "Increase weight",
        "weight": "30.45",
        "dmc_weight": "52.00",
        "data": {}
      },
      {
        "ticker": "GOOG",
        "company_name": "Alphabet Inc.",
        "recommendation": "Decrease weight",
        "company_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQDox4hPrVW6XsKsGSXE2iCxi_YZo3UtXD5BgVet7W-jtYhCedQU4Dkw8&usqp=CAU",
        "weight": "52.00",
        "dmc_weight": "30.45",
        "data": {}
      },
      {
        "ticker": "JUAN",
        "company_name": "N/A",
        "company_logo": "",
        "recommendation": "None",
        "weight": "0.00",
        "dmc_weight": "0.00",
        "data": {}
      },
      {
        "ticker": "AAPL",
        "company_name": "Apple Inc.",
        "company_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiHtmcXWWWDYHXOQHeNfPkdA2OJYBuDxGU0G4_6eaJcGWr6G-gNNmGSXczyBbgEnE&usqp=CAU&ec=48665698",
        "recommendation": "Increase weight",
        "weight": "30.45",
        "dmc_weight": "52.00",
        "data": {}
      },
      {
        "ticker": "GOOG",
        "company_name": "Alphabet Inc.",
        "recommendation": "Decrease weight",
        "company_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQDox4hPrVW6XsKsGSXE2iCxi_YZo3UtXD5BgVet7W-jtYhCedQU4Dkw8&usqp=CAU",
        "weight": "52.00",
        "dmc_weight": "30.45",
        "data": {}
      },
      {
        "ticker": "JUAN",
        "company_name": "N/A",
        "company_logo": "",
        "recommendation": "None",
        "weight": "0.00",
        "dmc_weight": "0.00",
        "data": {}
      },
      {
        "ticker": "AAPL",
        "company_name": "Apple Inc.",
        "company_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiHtmcXWWWDYHXOQHeNfPkdA2OJYBuDxGU0G4_6eaJcGWr6G-gNNmGSXczyBbgEnE&usqp=CAU&ec=48665698",
        "recommendation": "Increase weight",
        "weight": "30.45",
        "dmc_weight": "52.00",
        "data": {}
      },
      {
        "ticker": "GOOG",
        "company_name": "Alphabet Inc.",
        "recommendation": "Decrease weight",
        "company_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQDox4hPrVW6XsKsGSXE2iCxi_YZo3UtXD5BgVet7W-jtYhCedQU4Dkw8&usqp=CAU",
        "weight": "52.00",
        "dmc_weight": "30.45",
        "data": {}
      },
      {
        "ticker": "JUAN",
        "company_name": "N/A",
        "company_logo": "",
        "recommendation": "None",
        "weight": "0.00",
        "dmc_weight": "0.00",
        "data": {}
      }
    ]);
    const tabsConfig = {
      type: "underline",
      tabs: [
        { name: "A.I. Driven insights" },
        { name: "Regime Analysis" },
        { name: "Portfolio Analysis", selected: true }
      ]
    };
    const performanceChartConfig = {
      charts: [
        {
          name: "Your portfolio allocation",
          type: "LinearChart",
          description: `${context.predictionData.client.sentences.portfolio_pnl}`,
          chartTitle: `Sharpe (${formatPercentage(context.predictionData.client.optimizer_stats?.["Sharpe ratio"])})`,
          chartLegend: `AnnualizedRet (${formatPercentage(context.predictionData.client.optimizer_stats?.["Annual return"])})`,
          chartSubtitle: `AnnualizedVol (${formatPercentage(context.predictionData.client.optimizer_stats?.["Annual volatility"])})`,
          data:
            formatPortfoliPnlData(context.predictionData.client?.portfolio_pnl)
        },
        {
          name: "Risk Constrained Allocation",
          type: "LinearChart",
          useLogo: true,
          description: `${context.predictionData.asset_x.sentences.portfolio_pnl}`,
          chartTitle: `Sharpe (${formatPercentage(context.predictionData.asset_x.optimizer_stats?.["Sharpe ratio"])})`,
          chartLegend: `AnnualizedRet (${formatPercentage(context.predictionData.asset_x.optimizer_stats?.["Annual return"])})`,
          chartSubtitle: `AnnualizedVol (${formatPercentage(context.predictionData.asset_x.optimizer_stats?.["Annual volatility"])})`,
          data:
            formatPortfoliPnlData(context.predictionData.asset_x?.portfolio_pnl)
        }
      ]
    };
    // TODO: add the data to the chart
    const riskAllocationChartConfig = {
      charts: [
        {
          name: "Your portfolio allocation",
          type: "NormalizedStackedAreaChart",
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam cumque ducimus eius esse eveniet excepturi laboriosam nobis obcaecati perspiciatis sit sunt tempore, ut voluptatem? Culpa explicabo fugiat odio possimus sit.",
          data:
            formatRiskAllocationData(context.predictionData.client.optimal_weights_historical[0])
        },
        {
          name: "Dynamic Rebalancing",
          useLogo: true,
          type: "NormalizedStackedAreaChart",
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam cumque ducimus eius esse eveniet excepturi laboriosam nobis obcaecati perspiciatis sit sunt tempore, ut voluptatem? Culpa explicabo fugiat odio possimus sit.",
          data:
            formatRiskAllocationData(context.predictionData.asset_x.optimal_weights_historical[0])
        }
      ]
    };
    const last5SellOffsChartConfig = {
      charts: [
        {
          name: "Your historical drawdowns",
          type: "BoxPlot",
          description: `${context.predictionData.client.sentences.drawdown
          }`,
          data:
            [
              {
                y: context.predictionData.client?.drawdown_dates,
                boxpoints: "all",
                jitter: 0.3,
                pointpos: -1.8,
                type: "box",
                name: "Top Drawdowns",
                marker: {
                  color: "#1E8FCC"
                }
              }
            ]
        },
        {
          name: "AssetX",
          useLogo: true,
          type: "BoxPlot",
          description: `${context.predictionData.asset_x.sentences.drawdown
          }`,
          data:
            [
              {
                y: context.predictionData.asset_x?.drawdown_dates,
                boxpoints: "all",
                jitter: 0.3,
                pointpos: -1.8,
                type: "box",
                name: "Top Drawdowns",
                marker: {
                  color: "#1E8FCC"
                }
              }
            ]
        }
      ]
    };
    const betaChartConfig = {
      charts: [
        {
          name: "Your portfolio allocation",
          type: "BetaChart",
          description: `${context.predictionData.client.sentences.beta}`,
          data:
            [{
              type: "bar",
              marker: {
                color: "#1E8FCC",
                opacity: 0.7
              },
              y: Object.keys(context.predictionData.client?.beta),
              x: Object.values(context.predictionData.client?.beta),
              text: formatBeta(Object.values(context.predictionData.client?.beta)),
              textposition: "auto",
              orientation: "h"

            }]
        },
        {
          name: "Dynamic Rebalancing",
          useLogo: true,
          type: "BetaChart",
          description: `${context.predictionData.asset_x.sentences.beta}`,
          data:
            [{
              type: "bar",
              marker: {
                color: "#1E8FCC",
                opacity: 0.7
              },
              y: Object.keys(context.predictionData.asset_x?.beta),
              x: Object.values(context.predictionData.asset_x?.beta),
              text: formatBeta(Object.values(context.predictionData.asset_x?.beta)),
              textposition: "auto",
              orientation: "h"
            }]
        }
      ]
    };
    const resultTabsConfig = {
      type: "pills",
      tabs: [
        { name: "Portfolio Beta", "content": <TwoColumnCharts config={betaChartConfig} key={0} /> },
        { name: "Last 5 Sell Offs", "content": <TwoColumnCharts config={last5SellOffsChartConfig} key={1} /> },
        { name: "Performance", "content": <TwoColumnCharts config={performanceChartConfig} key={2} /> },
        { name: "Risk Allocation", "content": <TwoColumnCharts config={riskAllocationChartConfig} key={3} /> }
      ]
    };
    const resultColumns = useMemo(
      () => [
        {
          Header: "Ticker",
          accessor: "ticker",
          Cell: ({ row }) => (
            <div className="flex items-center">
              <img
                className="w-10 h-10 rounded-full"
                src={row.original.company_logo || "https://www.ortodonciasyv.cl/wp-content/uploads/2016/10/orionthemes-placeholder-image-2.png"}
                alt={row.original.company_name + " image"}
              />
              <div className="pl-3">
                <div className="text-base font-semibold">{row.original.company_name}</div>
                <div className="font-normal text-gray-500">BCBA: {row.original.ticker}</div>
              </div>
            </div>
          )
        },
        // {
        //   Header: "",
        //   accessor: "data",
        //   Cell: ({ row }) => (
        //     <div className="flex items-center">
        //       <img
        //         className="min-w-[60px] w-[60px]"
        //         src={MiniChart}
        //         alt="Mini Chart"
        //       />
        //
        //     </div>
        //   )
        // },
        {
          Header: "Recommendation",
          accessor: "difference",
          Cell: RecommendationPill
        },

        {
          Header: "%",
          accessor: "client_weights",
          Cell: props => (props.value * 100).toFixed(2) + "%"
        },
        {
          Header: "Asset X Weight %",
          accessor: "asset_x_weights",
          Cell: props => (props.value * 100).toFixed(2) + "%",
          width: 60
        }
      ],
      []
    );


    return (
      <>
        <Header />
        <main>
          <Container>
            {/*Title*/}
            <div className="flex">
              <img
                className="w-10 h-10 rounded-full"
                src={usFlag}
                alt="Rounded avatar"
              />
              <h1 className="text-4xl font-semibold pl-4	uppercase">US Stock Market</h1>
            </div>
            {/*End Title*/}
            {/*Tabs*/}
            <Tabs config={tabsConfig} />
            {/*End Tabs*/}
            {/*Results Table*/}
            <div className="mt-4">
              {/*Title*/}
              <div>
                <h3 className="text-3xl font-semibold">Portfolio Analysis Results</h3>
              </div>
              <div className={"mt-6"}>
                <Tabs config={resultTabsConfig} />
              </div>
              {/*End Title*/}
              {/*Second Row (charts)*/}
              <ResultsTable columns={resultColumns} data={context.predictionData.summary_table} />
              {/*End Second Row (charts)*/}
            </div>
            {/*End Results Table*/}
          </Container>
        </main>
      </>
    );
  }
;

export default PortfolioAnalysisResults;