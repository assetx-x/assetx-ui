import React, { useMemo, useState } from "react";
import { Header } from "../../components/Header.jsx";
import { Container } from "../../components/Container.jsx";
import { RecommendationPill } from "../../components/Table.jsx";
import ResultsTable from "./components/ResultsTable.jsx";
import { useMain } from "../../store/context/MainContext.jsx";
import { AsymmetricErrorBarsWithConstantOffsetChart } from "../../components/AsymmetricErrorBarsWithConstantOffsetChart.jsx";
import { BetaChart } from "../../components/BetaChart.jsx";
import Tabs from "../../components/Tabs.jsx";
import {
  faChartLine,
  faChartSimple,
  faEye,
  faLightbulb,
  faMoneyBillTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import { RelativeFactorChart } from "../../components/RelativeFactorChart.jsx";
import AISelectedComparablesMarket from "./components/AISelectedComparables.jsx";
import FactorHackChart from "./components/FactorHackChart.jsx";
import { getFactorHack } from "../../store/api/details.jsx";
import RiskAnalysis from "./components/RiskAnalysis.jsx";
import RecommendedHedgeBasket from "./components/RecommendedHedgeBasket.jsx";
import ConditionalForecastPerformance from "./components/ConditionalForecastPerformance.jsx";

const NewPortfolioAnalysisResults = ({ portfolio, id }) => {
  if (!id) setPortfolioData(context.predictionData?.holdings);
  const keys = [
    "Overall",
    "Growth",
    "Quality",
    "Macro",
    "Momentum Fast",
    "Momentum Slow",
    "Trend Following",
    "Value",
    "Other Factors",
  ];
  const context = useMain();
  const [portfolioData, setPortfolioData] = useState(portfolio?.holdings);
  const [factorHackData, setFactorHackData] = useState({});
  const [featureImportance, setFeatureImportance] =
    useState("feature_importance");
  const [selectedKey, setSelectedKey] = useState(keys[0]);
  const [selectedTickers, setSelectedTickers] = useState([]);
  const [loadingFactorHack, setLoadingFactorHack] = useState(false);

  const handleFactorHack = () => {
    setLoadingFactorHack(true);
    getFactorHack(selectedKey, selectedTickers.join(","))
      .then((res) => {
        if (res && res.data) {
          setFactorHackData(res.data);
        }
      })
      .finally(() => {
        setLoadingFactorHack(false);
      });
  };

  const handleTickers = (ticker) => {
    const index = selectedTickers.indexOf(ticker);
    const selected = [...selectedTickers];
    if (index > -1) {
      selected.splice(index, 1);
    } else {
      selected.push(ticker);
    }
    setSelectedTickers(selected);
  };

  const resultColumns = useMemo(
    () => [
      {
        Header: "Ticker",
        accessor: "ticker",
        Cell: ({ row }) => {
          return (
            <div
              className="flex items-center"
              onClick={() => console.log}
              title={row.original.company_name}
            >
              <img
                className="w-10 h-10 rounded-full"
                src={
                  row.original.company_logo ||
                  "https://www.ortodonciasyv.cl/wp-content/uploads/2016/10/orionthemes-placeholder-image-2.png"
                }
                alt={row.original.company_name + " image"}
              />
              <div className="pl-3">
                <div className="text-base font-semibold">
                  {row.original.symbol}
                </div>
                <div className="font-normal text-gray-500">
                  {row.original.ticker}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        Header: "Weight",
        accessor: "weight",
      },
      {
        Header: "AssetX Signal",
        accessor: "AssetX Signal",
        Cell: ({ row }) => {
          return <RecommendationPill value={row.original.assetx_weight} />;
        },
      },
    ],
    []
  );

  const tabsConfig = {
    type: "underline",
    isCentered: true,
    tabs: [
      {
        icon: faMoneyBillTrendUp,
        desc: "Trading Book",
        content: (
          <>
            <ResultsTable
              columns={resultColumns}
              data={portfolioData?.current_trading_book}
            />
          </>
        ),
      },
      {
        icon: faEye,
        desc: "A.I Selected Comparables",
        content: (
          <AISelectedComparablesMarket
            data={portfolioData?.portfolio_comparison}
          />
        ),
      },
      {
        icon: faChartSimple,
        desc: "Values Summary",
        content: <RiskAnalysis data={portfolioData?.factor_comparison} />,
      },
    ],
  };

  const tabs2Config = {
    type: "underline",
    isCentered: true,
    tabs: [
      {
        icon: faLightbulb,
        desc: "A.I Recommended Hedge Basket",
        content: (
          <>
            <RecommendedHedgeBasket
              datas={portfolioData?.recommendations?.[selectedKey]}
              selectedTickers={selectedTickers}
              onClickItem={handleTickers}
            />
          </>
        ),
      },
      {
        icon: faChartLine,
        desc: "A.I Selected Comparables",
        content: (
          <ConditionalForecastPerformance
            datas={
              factorHackData && factorHackData.performance_metrics
                ? Object.keys(factorHackData.performance_metrics).map(
                    (key) => ({
                      metric: key,
                      value: factorHackData.performance_metrics[key],
                    })
                  )
                : []
            }
            loading={loadingFactorHack}
          />
        ),
      },
    ],
  };

  const handleRowClick = (ticker) => {
    window.open(`/us/ticker/${ticker}`, "_blank", "noreferrer");
  };

  React.useEffect(() => {
    if (portfolioData && portfolioData.recommendations) {
      const keys = Object.keys(portfolioData.recommendations);
      portfolioData.recommendations && setSelectedKey(keys[0]);
    }
  }, [portfolioData]);

  React.useEffect(() => {
    setSelectedTickers([]);
  }, [selectedKey]);

  return (
    <>
      <Header />
      <main>
        <Container>
          <header className="flex">
            <h1 className="text-4xl font-semibold pl-4">
              Active Portfolio Management
            </h1>
          </header>
          {/*Content  */}
          <div className="grid grid-cols-9 gap-4 mb-6">
            <section className="col-span-6 md:col-span-3 lg:grid-cols-6 xl:col-span-7">
              <div
                className="mt-10 "
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h3 className="text-3xl font-semibold">
                    Historical Price Performance
                  </h3>
                  <p className="text-gray-500 font-light mt-4 mb-4">
                    Below is a comparison of your portfolio's performance along
                    with the re-weighted portfolio by AssetX. For a deeper dive
                    into the weights and performance, look to my sidebar on the
                    right.
                  </p>
                </div>

                {/*End Objective Function*/}
              </div>
              <AsymmetricErrorBarsWithConstantOffsetChart
                data={
                  portfolioData?.portfolio_and_benchmark
                    ? {
                        pnl_: {
                          index: portfolioData?.portfolio_and_benchmark?.pnl?.y,
                          series:
                            portfolioData?.portfolio_and_benchmark?.pnl?.x,
                        },
                        benchmark: {
                          index:
                            portfolioData?.portfolio_and_benchmark?.benchmark
                              ?.y,
                          series:
                            portfolioData?.portfolio_and_benchmark?.benchmark
                              ?.x,
                        },
                      }
                    : undefined
                }
              />
            </section>
            <div className="col-span-6 md:col-span-3 lg:grid-cols-6 xl:col-span-2">
              <Tabs config={tabsConfig} />
            </div>
          </div>
          <div className="grid grid-cols-9 gap-4 mb-6">
            <section className="col-span-6 md:col-span-3 lg:grid-cols-6 xl:col-span-7">
              {/*Selectable options*/}
              <div className="pl-[10px] pr-[10px]">
                <div
                  className="mt-10 mb-3"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 20,
                  }}
                >
                  <div>
                    <h3 className="text-3xl font-semibold">Risk Analysis</h3>
                  </div>

                  <div>
                    <button type="button">
                      <input
                        className="hidden"
                        type="radio"
                        name="feature_importance_historical"
                        id="feature_importance_historical"
                        value="feature_importance_historical"
                        checked={
                          featureImportance === "feature_importance_historical"
                        }
                        onChange={() =>
                          setFeatureImportance("feature_importance_historical")
                        }
                      />
                      <label
                        className={`
                              px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 
                              hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 
                              focus:text-blue-700 rounded-l-lg`}
                        htmlFor="feature_importance_historical"
                      >
                        Absolute Analysis
                      </label>
                    </button>
                    <button type="button">
                      <input
                        className="hidden"
                        type="radio"
                        name="feature_importance"
                        id="feature_importance"
                        value="feature_importance"
                        checked={featureImportance === "feature_importance"}
                        onChange={() =>
                          setFeatureImportance("feature_importance")
                        }
                      />
                      <label
                        className={`
                              px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 
                              hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 
                              focus:text-blue-700 rounded-r-md`}
                        htmlFor="feature_importance"
                      >
                        Relative Analysis
                      </label>
                    </button>
                  </div>
                </div>
              </div>
              {/*End Selectable options*/}
              {featureImportance === "feature_importance" && (
                <RelativeFactorChart
                  data={portfolioData?.factor_contribution?.relative}
                  key={selectedKey}
                />
              )}
              {featureImportance === "feature_importance_historical" && (
                <BetaChart
                  data={portfolioData?.factor_contribution?.absolute}
                  key={selectedKey}
                  layoutParameters={{ legend: { orientation: "h" } }}
                />
              )}
            </section>
          </div>
          <div className="grid grid-cols-9 gap-4">
            <div className="col-span-6 md:col-span-3 lg:grid-cols-6 xl:col-span-7">
              <FactorHackChart
                data={factorHackData}
                tabs={
                  portfolioData?.recommendations
                    ? Object.keys(portfolioData.recommendations)
                    : []
                }
                loading={loadingFactorHack}
                currentTab={selectedKey}
                onSelectTab={setSelectedKey}
                handleFactorHack={handleFactorHack}
              />
            </div>
            <div className="col-span-6 md:col-span-3 lg:grid-cols-6 xl:col-span-2 mb-8">
              <Tabs config={tabs2Config} />
            </div>
          </div>
        </Container>
      </main>
    </>
  );
};

export default NewPortfolioAnalysisResults;
