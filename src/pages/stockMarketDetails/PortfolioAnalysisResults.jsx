import React, { useContext, useEffect, useMemo, useState } from "react";
import { Header } from "../../components/Header.jsx";
import { Container } from "../../components/Container.jsx";
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

  for (const [key, value] of Object.entries(obj)) {
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
  if (!num) return (0).toFixed(decimals) + "%";
  if (type === "sharpe") return (num).toFixed(decimals);
  if (type === "ret") return (num * 100).toFixed(decimals) + "%";
  return (num).toFixed(decimals) + "%";
}

const PortfolioAnalysisResults = ({portfolio}) => {
    const navigate = useNavigate();
    const tabsConfig = {
      isMain: true,
      type: "underline",
      tabs: [
        { name: "A.I. Driven insights" ,
          // onClickHandler: () => navigate("/us/ai-driven-insights")
        },
        { name: "Regime Analysis" },
        { name: "Portfolio Analysis", onClickHandler: () => {} },
      ]
    };
    const performanceChartConfig = {
      charts: [
        {
          name: "Your portfolio allocation",
          description: `${portfolio?.[0]?.holdings?.client?.sentences?.portfolio_pnl}`,
          type: "LinearChart",
          chartSubtitle: `Sharpe (${formatPercentage(portfolio?.[0]?.holdings?.client?.optimizer_stats?.["Sharpe ratio"], 2, "sharpe")})`,
          chartTitle: `Annualized Ret (${formatPercentage(portfolio?.[0]?.holdings?.client?.optimizer_stats?.["Annual return"], 2, "ret")})`,
          chartLegend: `Annualized Vol (${formatPercentage(portfolio?.[0]?.holdings?.client?.optimizer_stats?.["Annual volatility"])})`,
          data:
            formatPortfoliPnlData(portfolio?.[0]?.holdings?.client?.portfolio_pnl)
        },
        {
          name: "Risk Constrained Allocation",
          type: "LinearChart",
          useLogo: true,
          description: `${portfolio?.[0]?.holdings?.asset_x?.sentences?.portfolio_pnl}`,
          chartSubtitle: `Sharpe (${formatPercentage(portfolio?.[0]?.holdings?.asset_x?.optimizer_stats?.["Sharpe ratio"], 2, "sharpe")})`,
          chartTitle: `Annualized Ret (${formatPercentage(portfolio?.[0]?.holdings?.asset_x?.optimizer_stats?.["Annual return"], 2, "ret")})`,
          chartLegend: `Annualized Vol (${formatPercentage(portfolio?.[0]?.holdings?.asset_x?.optimizer_stats?.["Annual volatility"])})`,
          data:
            formatPortfoliPnlData(portfolio?.[0]?.holdings?.asset_x?.portfolio_pnl)
        }
      ]
    };
    const riskAllocationChartConfig = {
      charts: [
        {
          name: "Your portfolio allocation",
          type: "NormalizedStackedAreaChart",
          description: `${portfolio?.[0]?.holdings?.client?.sentences.optimal_weights}`,
          data:
            formatRiskAllocationData(portfolio?.[0]?.holdings?.client?.optimal_weights_historical[0])
        },
        {
          name: "Dynamic Rebalancing",
          useLogo: true,
          type: "NormalizedStackedAreaChart",
          description: `${portfolio?.[0]?.holdings?.asset_x?.sentences?.optimal_weights}`,
          data:
            formatRiskAllocationData(portfolio?.[0]?.holdings?.asset_x?.optimal_weights_historical?.[0])
        }
      ]
    };

    const factorContributionChartConfig = {
      charts: [
        {
          name: "Your portfolio allocation",
          type: "NormalizedStackedAreaChart",
          description: `${portfolio?.[0]?.holdings?.client?.sentences.factor_contribution}`,
          data:
            formatFactorContributionData(portfolio?.[0]?.holdings?.client?.factor_contribution)
        },
        {
          name: "Dynamic Rebalancing",
          useLogo: true,
          type: "NormalizedStackedAreaChart",
          description: `${portfolio?.[0]?.holdings?.asset_x?.sentences?.factor_contribution}`,
          data:
            formatFactorContributionData(portfolio?.[0]?.holdings?.asset_x?.factor_contribution)
        }
      ]
    };
    const last5SellOffsChartConfig = {
      charts: [
        {
          name: "Your historical drawdowns",
          type: "BoxPlot",
          description: `${portfolio?.[0]?.holdings?.client?.sentences?.drawdown
          }`,
          data:
            [
              {
                y: portfolio?.[0]?.holdings?.client?.drawdown_dates,
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
          description: `${portfolio?.[0]?.holdings?.asset_x?.sentences?.drawdown
          }`,
          data:
            [
              {
                y: portfolio?.[0]?.holdings?.asset_x?.drawdown_dates,
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
          description: `${portfolio?.[0]?.holdings?.client?.sentences?.beta}`,
          data:
            [{
              type: "bar",
              marker: {
                color: "#1E8FCC",
                opacity: 0.7
              },
              y: Object.keys(portfolio?.[0]?.holdings?.client?.beta),
              x: Object.values(portfolio?.[0]?.holdings?.client?.beta),
              text: formatBeta(Object.values(portfolio?.[0]?.holdings?.client?.beta)),
              textposition: "auto",
              orientation: "h"

            }]
        },
        {
          name: "Dynamic Rebalancing",
          useLogo: true,
          type: "BetaChart",
          description: `${portfolio?.[0]?.holdings?.asset_x?.sentences?.beta}`,
          data:
            [{
              type: "bar",
              marker: {
                color: "#1E8FCC",
                opacity: 0.7
              },
              y: Object.keys(portfolio?.[0]?.holdings?.asset_x?.beta),
              x: Object.values(portfolio?.[0]?.holdings?.asset_x?.beta),
              text: formatBeta(Object.values(portfolio?.[0]?.holdings?.asset_x?.beta)),
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
        },
        {
          Header: "Date",
          accessor: "date",
          Cell: ({ row }) => (formatDateToDashFormat(row.original.date))
        }
      ],
      []
    );

    const handleReset = () => {
      navigate("/us/portfolio-analysis", { replace: true });
    };

  function downloadCSV(data, filename) {
    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(convertToCSV(data));
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', filename);
    link.click();
  }

  function convertToCSV(data) {
    let csv = '';

    // Extracting the dates from the data object
    const dates = Object.keys(data);

    // Constructing the CSV header row
    csv += 'Date,Client Weight,AssetX Recommendation\n';

    // Constructing the CSV rows for each date
    dates.forEach(date => {
      const rowData = data[date];
      const clientWeight = rowData['Client Weight'];
      const assetXRecommendation = rowData['AssetX Recommendation'];

      Object.keys(clientWeight).forEach(stock => {
        csv += `${date},${clientWeight[stock]},${assetXRecommendation[stock]}\n`;
      });
    });

    return csv;
  }

    const handleDownloadCSV = () => {
      downloadCSV(portfolio?.[0]?.holdings?.csv_data, 'AssetX_recommendations.csv');
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
                <div>
                  <Button
                    variant="outline"
                    color="blue"
                    onClick={handleDownloadCSV}
                    className={"mr-4"}
                  >
                  Download CSV
                  </Button>
                  <Button
                    variant="outline"
                    color="blue"
                    onClick={handleReset}
                  >
                    Reset
                  </Button></div>

              </div>
              <div className={"mt-6"}>
                <Tabs config={resultTabsConfig} />
              </div>
              {/*End Title*/}
              {/*Second Row (charts)*/}
              <ResultsTable columns={resultColumns} data={formatDataForResultsTable(portfolio?.[0]?.holdings?.summary_table)} />
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