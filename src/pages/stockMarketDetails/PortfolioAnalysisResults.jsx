import React, { useContext, useEffect, useMemo, useState } from "react";
import { Header } from "../../components/Header.jsx";
import { Container } from "../../components/Container.jsx";
import usFlag from "../../assets/images/us.png";
import Tabs from "../../components/Tabs.jsx";
import { RecommendationPill } from "../../components/Table.jsx";
import MiniChart from "../../assets/images/mini-chart.png";
import TwoColumnCharts from "./components/TwoColumnCharts.jsx";
import ResultsTable from "./components/ResultsTable.jsx";
import { MainContext } from "../../store/context/MainContext.jsx";
import { Button } from "../../components/Button.jsx";
import { useNavigate } from "react-router-dom";

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

function formatFactorContributionData(obj) {
  const result = [];

  for (const [key, value] of Object.entries(obj.data)) {
    if (key !== "dates") {
      // Set groupnorm to 'percent' only for the first element
      const groupnorm = result.length === 0 ? "percent" : undefined;

      result.push(
        { x: obj["dates"], y: value, name: key, stackgroup: "one", groupnorm }
      );
    }
  }


  return result;
}

function formatBeta(obj, decimals = 1) {
  for (const [key, value] of Object.entries(obj)) {
    obj[key] = value.toFixed(decimals);
  }

  return obj;

}

function formatPercentage(num, decimals = 2, type) {
  if (type === "sharpe") return (num).toFixed(decimals);
  if (type === "ret") return (num * 100).toFixed(decimals) + "%";
  return (num).toFixed(decimals) + "%";
}

const PortfolioAnalysisResults = (props) => {
    const navigate = useNavigate();
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
          description: `${context.predictionData?.client?.sentences?.portfolio_pnl}`,
          chartSubtitle: `Sharpe (${formatPercentage(context.predictionData?.client?.optimizer_stats?.["Sharpe ratio"], 2, "sharpe")})`,
          chartTitle: `Annualized Ret (${formatPercentage(context.predictionData?.client?.optimizer_stats?.["Annual return"], 2, "ret")})`,
          chartLegend: `Annualized Vol (${formatPercentage(context.predictionData?.client?.optimizer_stats?.["Annual volatility"])})`,
          data:
            formatPortfoliPnlData(context.predictionData.client?.portfolio_pnl)
        },
        {
          name: "Risk Constrained Allocation",
          type: "LinearChart",
          useLogo: true,
          description: `${context.predictionData?.asset_x?.sentences?.portfolio_pnl}`,
          chartSubtitle: `Sharpe (${formatPercentage(context.predictionData?.asset_x?.optimizer_stats?.["Sharpe ratio"], 2, "sharpe")})`,
          chartTitle: `Annualized Ret (${formatPercentage(context.predictionData?.asset_x?.optimizer_stats?.["Annual return"], 2, "ret")})`,
          chartLegend: `Annualized Vol (${formatPercentage(context.predictionData?.asset_x?.optimizer_stats?.["Annual volatility"])})`,
          data:
            formatPortfoliPnlData(context.predictionData?.asset_x?.portfolio_pnl)
        }
      ]
    };
    const riskAllocationChartConfig = {
      charts: [
        {
          name: "Your portfolio allocation",
          type: "NormalizedStackedAreaChart",
          description: `${context.predictionData?.client?.sentences.optimal_weights}`,
          data:
            formatRiskAllocationData(context.predictionData?.client?.optimal_weights_historical[0])
        },
        {
          name: "Dynamic Rebalancing",
          useLogo: true,
          type: "NormalizedStackedAreaChart",
          description: `${context.predictionData?.asset_x?.sentences?.optimal_weights}`,
          data:
            formatRiskAllocationData(context.predictionData?.asset_x?.optimal_weights_historical?.[0])
        }
      ]
    };
    const factorContributionChartConfig = {
      charts: [
        {
          name: "Your portfolio allocation",
          type: "NormalizedStackedAreaChart",
          description: `${context.predictionData?.client?.sentences.factor_contribution}`,
          data:
            formatFactorContributionData(context.predictionData?.client?.factor_contribution)
        },
        {
          name: "Dynamic Rebalancing",
          useLogo: true,
          type: "NormalizedStackedAreaChart",
          description: `${context.predictionData?.asset_x?.sentences?.factor_contribution}`,
          data:
            formatFactorContributionData(context.predictionData?.asset_x?.factor_contribution)
        }
      ]
    };
    const last5SellOffsChartConfig = {
      charts: [
        {
          name: "Your historical drawdowns",
          type: "BoxPlot",
          description: `${context.predictionData?.client?.sentences?.drawdown
          }`,
          data:
            [
              {
                y: context.predictionData?.client?.drawdown_dates,
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
          description: `${context.predictionData?.asset_x?.sentences?.drawdown
          }`,
          data:
            [
              {
                y: context.predictionData?.asset_x?.drawdown_dates,
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
          description: `${context.predictionData?.client?.sentences?.beta}`,
          data:
            [{
              type: "bar",
              marker: {
                color: "#1E8FCC",
                opacity: 0.7
              },
              y: Object.keys(context.predictionData?.client?.beta),
              x: Object.values(context.predictionData?.client?.beta),
              text: formatBeta(Object.values(context.predictionData?.client?.beta)),
              textposition: "auto",
              orientation: "h"

            }]
        },
        {
          name: "Dynamic Rebalancing",
          useLogo: true,
          type: "BetaChart",
          description: `${context.predictionData?.asset_x?.sentences?.beta}`,
          data:
            [{
              type: "bar",
              marker: {
                color: "#1E8FCC",
                opacity: 0.7
              },
              y: Object.keys(context.predictionData?.asset_x?.beta),
              x: Object.values(context.predictionData?.asset_x?.beta),
              text: formatBeta(Object.values(context.predictionData?.asset_x?.beta)),
              textposition: "auto",
              orientation: "h"
            }]
        }
      ]
    };
    const resultTabsConfig = {
      type: "pills",
      tabs: [
        { name: "Performance", "content": <TwoColumnCharts config={performanceChartConfig} key={0} /> },
        { name: "Portfolio Beta", "content": <TwoColumnCharts config={betaChartConfig} key={1} /> },
        { name: "Last 5 Sell Offs", "content": <TwoColumnCharts config={last5SellOffsChartConfig} key={2} /> },
        { name: "Risk Allocation", "content": <TwoColumnCharts config={riskAllocationChartConfig} key={3} /> },
        { name: "Factor Contribution", "content": <TwoColumnCharts config={factorContributionChartConfig} key={4} /> }
      ]
    };
    const handleRowClick = (ticker) => {
      window.open(`/us/ticker/${ticker}`, "_blank", "noreferrer");
    };

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
          Cell: props => (props.value !== "NaN") ? (props.value * 100).toFixed(2) + "%" : 0.00 + "%"
        },
        {
          Header: "Asset X Weight %",
          accessor: "asset_x_weights",
          Cell: props => (props.value !== "NaN") ? (props.value * 100).toFixed(2) + "%" : 0.00 + "%",
          width: 60
        }
      ],
      []
    );

    const handleReset = () => {
      navigate("/us/portfolio-analysis", { replace: true });
    };
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 className="text-3xl font-semibold">Portfolio Analysis Results</h3>
                <Button
                  variant="outline"
                  color="blue"
                  onClick={handleReset}
                >
                  Reset
                </Button>
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