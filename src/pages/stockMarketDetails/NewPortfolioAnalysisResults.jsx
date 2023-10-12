import React, { useMemo, useState } from "react";
import { Header } from "../../components/Header.jsx";
import { Container } from "../../components/Container.jsx";
import { RecommendationPill } from "../../components/Table.jsx";
import ResultsTable from "./components/ResultsTable.jsx";
import { useMain } from "../../store/context/MainContext.jsx";
import { formatDateToDashFormat } from "../../utils/index.js";
import { AsymmetricErrorBarsWithConstantOffsetChart } from "../../components/AsymmetricErrorBarsWithConstantOffsetChart.jsx";
import { BasicWaterfallChart } from "../../components/BasicWaterfallChart.jsx";
import { BetaChart } from "../../components/BetaChart.jsx";

const NewPortfolioAnalysisResults = ({ portfolio, id }) => {
  const context = useMain();
  const [portfolioData, setPortfolioData] = useState(portfolio?.holdings);
  const [featureImportance, setFeatureImportance] = useState('feature_importance');

  
  if (!id) setPortfolioData(context.predictionData?.holdings)
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
  const [selectedKey, setSelectedKey] = useState(keys[0]);
  const [scope, setScope] = useState("categories");
  const [timeScope, setTimeScope] = useState("historical");

  const resultColumns = useMemo(
    () => [
      {
        Header: "Ticker",
        accessor: "ticker",
        Cell: ({ row }) => {
          return (
            <div className="flex items-center" onClick={() => console.log}>
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
                  {row.original.company_name}
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
        Cell: RecommendationPill,
      },
    ],
    []
  );

  const subCategoriesColumns = useMemo(
    () => [
      {
        Header: "Ticker",
        accessor: "ticker",
        Cell: ({ row }) => (
          <div
            className="flex items-center"
            onClick={() => handleRowClick(row.original.ticker)}
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
                {row.original.company_name}
              </div>
              <div className="font-normal text-gray-500">
                {row.original.ticker}
              </div>
            </div>
          </div>
        ),
      },
      {
        Header: "Growth",
        accessor: "Growth",
      },
      {
        Header: "Macro",
        accessor: "Macro",
      },
      {
        Header: "Momentum Fast",
        accessor: "Momentum Fast",
      },
      {
        Header: "Momentum Slow",
        accessor: "Momentum Slow",
      },
      {
        Header: "Quality",
        accessor: "Quality",
      },
      {
        Header: "Trend Following",
        accessor: "Trend Following",
      },
      {
        Header: "Value",
        accessor: "Value",
      },
    ],
    []
  );

  const renderTableHeader = () => {
    const headers = ["Attribution", "Current", "Average"];
    return headers.map((header, index) => (
      <th key={index} className="px-6 py-4">
        {header}
      </th>
    ));
  };

  const renderTableRows = () => {
    const factorContribution =
      portfolioData?.["1M"]?.factor_contribution;
    if (!factorContribution) {
      return null;
    }

    const { current_contribution, average_contribution } = factorContribution;
    const keys = Object.keys(current_contribution);

    return keys.map((key, index) => (
      <tr
        key={index}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <td className="px-6 py-4">{key}</td>
        <td className="px-6 py-4">{current_contribution[key]}</td>
        <td className="px-6 py-4">{average_contribution[key]}</td>
      </tr>
    ));
  };

  const getLastMonthDate = () => {
    const today = new Date();
    const lastMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate()
    );
    return formatDateToDashFormat(lastMonth);
  };

  const handleRowClick = (ticker) => {
    window.open(`/us/ticker/${ticker}`, "_blank", "noreferrer");
  };

  const handleSetScope = (event) => {
    setScope(event.target.value);
  };

  const handleTimeScope = (event) => {
    setTimeScope(event.target.value);
  };

  return (
    <>
      <Header />
      <main>
        <Container>
          <header className="flex">
            <h1 className="text-4xl font-semibold pl-4">Your Portfolio</h1>
          </header>
          {/*Content  */}
          <div className="grid grid-cols-6 gap-4 sm:col">
            <div className="col-span-6 md:col-span-3 lg:grid-cols-6 xl:col-span-4">
              <section>
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
                  </div>
                  <div>
                    <span className="text-gray-500 font-light mt-4 mr-2">
                      Forecast Horizon:
                    </span>

                    <div
                      className="inline-flex rounded-md shadow-sm"
                      role="group"
                    >
                      <button type="button">
                        <input
                          className="hidden"
                          type="radio"
                          id="1D"
                          name="investingHorizons"
                          value="1D"
                        />
                        <label
                          className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                          htmlFor="1D"
                        >
                          Weekly
                        </label>
                      </button>
                      <button type="button">
                        <input
                          className="hidden"
                          type="radio"
                          id="21D"
                          name="investingHorizons"
                          value="21D"
                        />
                        <label
                          className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 "
                          htmlFor="21D"
                        >
                          Monthly
                        </label>
                      </button>
                      <button type="button">
                        <input
                          className="hidden"
                          type="radio"
                          id="42D"
                          name="investingHorizons"
                          value="42D"
                        />
                        <label
                          className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 "
                          htmlFor="42D"
                        >
                          Yearly
                        </label>
                      </button>
                    </div>
                  </div>

                  {/*End Objective Function*/}
                </div>
                <AsymmetricErrorBarsWithConstantOffsetChart
                  data={portfolioData?.["1M"]?.portfolio}
                />
              </section>
              
              <section>
                {/*Selectable options*/}
                <div className="pl-[10px] pr-[10px]">
                  <div
                    className="mt-10 mb-3"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap:'wrap',
                      gap: 20
                    }}
                  >
                    <div>
                      <h3 className="text-3xl font-semibold">Details</h3>
                    </div>

                    <div>
                      <button type="button">
                        <input
                          className="hidden"
                          type="radio"
                          name="feature_importance_historical" 
                          id="feature_importance_historical" 
                          value="feature_importance_historical"
                          checked={featureImportance === "feature_importance_historical"}
                          onChange={() => setFeatureImportance("feature_importance_historical")}
                        />
                        <label
                            className={`
                              px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 
                              hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 
                              focus:text-blue-700 rounded-l-lg`}
                            htmlFor="feature_importance_historical"
                          >
                            Historical Analysis
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
                          onChange={() => setFeatureImportance("feature_importance")}
                        />
                        <label
                            className={`
                              px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 
                              hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 
                              focus:text-blue-700 rounded-r-md`}
                            htmlFor="feature_importance"
                          >
                            Current Analysis
                          </label>
                      </button>
                    </div>

                    <div>
                      {keys.map((key, index) => (
                        <button type="button" key={key}>
                          <input
                            className="hidden"
                            type="radio"
                            id={`id_${key}_${index}`}
                            name="detailsKeywords"
                            value={key}
                            checked={selectedKey === key}
                            onChange={() => setSelectedKey(key)}
                          />

                          <label
                            className={` px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 ${
                              index === 0 ? "rounded-l-lg" : ""
                            } ${
                              index === keys?.length - 1 ? "rounded-r-md" : ""
                            } `}
                            htmlFor={`id_${key}_${index}`}
                          >
                            {key}
                          </label>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {/*End Selectable options*/}
                {featureImportance === 'feature_importance' &&
                  <BasicWaterfallChart
                    data={
                      portfolioData?.["1M"]?.[featureImportance]?.[
                        selectedKey
                      ]
                    }
                    key={selectedKey}
                  />
                }
                {featureImportance === 'feature_importance_historical' && 
                  <BetaChart data={
                      portfolioData?.["1M"]?.[featureImportance]?.[
                        selectedKey
                      ]
                    } key={selectedKey} layoutParameters={{legend: {"orientation": "h"}}} />
                }
              </section>

              <section>
                <h3 className="text-3xl font-semibold">Factor Contribution</h3>

                <p className="text-gray-500 font-light mt-4 mb-4">
                  Here is a breakdown of current factor attribution and based on
                  the selected forecast horizon.
                </p>

                <ResultsTable
                  columns={subCategoriesColumns}
                  data={portfolioData?.["1M"]?.ticker_contribution}
                />
              </section>
            </div>

            <div className="col-span-6 md:col-span-3 lg:grid-cols-6 xl:col-span-2">
              <section>
                <h3 className="text-3xl font-semibold">Current Trading Book</h3>

                <p className="text-gray-500 font-light mt-4 mb-4">
                  Here is your current trading book and my current outlook on
                  each individual ticker.
                </p>

                <ResultsTable
                  columns={resultColumns}
                  data={portfolioData?.current_trading_book}
                />
              </section>

              <section className="mb-20">
                <h3 className="text-3xl font-semibold">
                  AI Selected Comparables
                </h3>

                <p className="text-gray-500 font-light mt-4 mb-4">
                  Here are some other names to consider in your portfolio that I
                  am currently bullish on based on your selected forecast
                  horizon.
                </p>

                <div className="mt-10">
                  <div className="relative overflow-x">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-3 h-{600}">
                      <table className="w-full text-sm text-left text-gray-500">
                        <thead className=" sticky  text-xs text-gray-700 uppercase bg-gray-50 "></thead>
                        <tbody>
                          {portfolioData?.["1M"]?.ai_alternatives.map(
                            ([symbol, company]) => (
                              <tr
                                key={symbol}
                                className="bg-white border-b  hover:bg-gray-50 "
                              >
                                <td className="px-6 py-4">
                                  <div
                                    className="flex items-center"
                                    onClick={() => console.log}
                                  >
                                    <img
                                      className="w-10 h-10 rounded-full"
                                      src={
                                        company.company_logo ||
                                        "https://www.ortodonciasyv.cl/wp-content/uploads/2016/10/orionthemes-placeholder-image-2.png"
                                      }
                                      alt={company.company_name + " image"}
                                    />
                                    <div className="pl-3">
                                      <div className="text-base font-semibold">
                                        {company.company_name}
                                      </div>
                                      <div className="font-normal text-gray-500">
                                        {company.sector}
                                      </div>
                                    </div>
                                  </div>
                                  {/*<th  scope="col" className="px-6 py-4">*/}
                                  {/*  <p>{symbol}</p>*/}
                                  {/*  <p>{company.company_name}</p>*/}
                                  {/*  <p>{company.sector}</p>*/}
                                  {/*  <img src={company.company_logo} alt="Company Logo" />*/}
                                  {/*</th>*/}
                                  {/*<td className="px-6 py-4">*/}
                                  {/*  {company.ticker}*/}
                                  {/*</td>*/}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>
              
              <section>
                <h3 className="text-3xl font-semibold">
                  Performance Attribution
                </h3>

                <p className="text-gray-500 font-light mt-4 mb-4">
                  Here is a breakdown of current factor attribution and based on
                  the selected forecast horizon.
                </p>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      {renderTableHeader()}
                    </thead>
                    <tbody>{renderTableRows()}</tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
          {/*End Content*/}
          {/*Footer*/}
          {/*<section className="flex">*/}
          {/*  /!*card*!/*/}
          {/*  <div*/}
          {/*    className="m-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">*/}
          {/*    <a href="#">*/}
          {/*      <img className="rounded-t-lg"*/}
          {/*           src="https://e3.365dm.com/23/08/2048x1152/skynews-apple-logo_6267788.jpg?20230830122917"*/}
          {/*           alt="" />*/}
          {/*    </a>*/}
          {/*    <div className="p-5">*/}
          {/*      <a href="#">*/}
          {/*        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy*/}
          {/*          technology acquisitions 2021</h5>*/}
          {/*      </a>*/}
          {/*      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise*/}
          {/*        technology acquisitions of 2021 so far, in reverse chronological order.</p>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  /!*End card*!/*/}
          {/*  /!*card*!/*/}
          {/*  <div*/}
          {/*    className="m-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">*/}
          {/*    <a href="#">*/}
          {/*      <img className="rounded-t-lg"*/}
          {/*           src="https://e3.365dm.com/23/08/2048x1152/skynews-apple-logo_6267788.jpg?20230830122917"*/}
          {/*           alt="" />*/}
          {/*    </a>*/}
          {/*    <div className="p-5">*/}
          {/*      <a href="#">*/}
          {/*        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy*/}
          {/*          technology acquisitions 2021</h5>*/}
          {/*      </a>*/}
          {/*      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise*/}
          {/*        technology acquisitions of 2021 so far, in reverse chronological order.</p>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  /!*End card*!/*/}
          {/*  /!*card*!/*/}
          {/*  <div*/}
          {/*    className="m-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">*/}
          {/*    <a href="#">*/}
          {/*      <img className="rounded-t-lg"*/}
          {/*           src="https://e3.365dm.com/23/08/2048x1152/skynews-apple-logo_6267788.jpg?20230830122917"*/}
          {/*           alt="" />*/}
          {/*    </a>*/}
          {/*    <div className="p-5">*/}
          {/*      <a href="#">*/}
          {/*        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy*/}
          {/*          technology acquisitions 2021</h5>*/}
          {/*      </a>*/}
          {/*      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise*/}
          {/*        technology acquisitions of 2021 so far, in reverse chronological order.</p>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  /!*End card*!/*/}
          {/*  /!*card*!/*/}
          {/*  <div*/}
          {/*    className="m-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">*/}
          {/*    <a href="#">*/}
          {/*      <img className="rounded-t-lg"*/}
          {/*           src="https://e3.365dm.com/23/08/2048x1152/skynews-apple-logo_6267788.jpg?20230830122917"*/}
          {/*           alt="" />*/}
          {/*    </a>*/}
          {/*    <div className="p-5">*/}
          {/*      <a href="#">*/}
          {/*        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy*/}
          {/*          technology acquisitions 2021</h5>*/}
          {/*      </a>*/}
          {/*      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise*/}
          {/*        technology acquisitions of 2021 so far, in reverse chronological order.</p>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  /!*End card*!/*/}
          {/*  /!*card*!/*/}
          {/*  <div*/}
          {/*    className="m-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">*/}
          {/*    <a href="#">*/}
          {/*      <img className="rounded-t-lg"*/}
          {/*           src="https://e3.365dm.com/23/08/2048x1152/skynews-apple-logo_6267788.jpg?20230830122917"*/}
          {/*           alt="" />*/}
          {/*    </a>*/}
          {/*    <div className="p-5">*/}
          {/*      <a href="#">*/}
          {/*        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy*/}
          {/*          technology acquisitions 2021</h5>*/}
          {/*      </a>*/}
          {/*      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise*/}
          {/*        technology acquisitions of 2021 so far, in reverse chronological order.</p>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  /!*End card*!/*/}
          {/*  /!*card*!/*/}
          {/*  <div*/}
          {/*    className="m-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">*/}
          {/*    <a href="#">*/}
          {/*      <img className="rounded-t-lg"*/}
          {/*           src="https://e3.365dm.com/23/08/2048x1152/skynews-apple-logo_6267788.jpg?20230830122917"*/}
          {/*           alt="" />*/}
          {/*    </a>*/}
          {/*    <div className="p-5">*/}
          {/*      <a href="#">*/}
          {/*        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy*/}
          {/*          technology acquisitions 2021</h5>*/}
          {/*      </a>*/}
          {/*      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise*/}
          {/*        technology acquisitions of 2021 so far, in reverse chronological order.</p>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  /!*End card*!/*/}

          {/*</section>*/}
          {/*End Footer*/}
        </Container>
      </main>
    </>
  );
};

export default NewPortfolioAnalysisResults;
