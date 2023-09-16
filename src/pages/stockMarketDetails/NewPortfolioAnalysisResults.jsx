import React, { useMemo, useState } from "react";
import { Header } from "../../components/Header.jsx";
import { Container } from "../../components/Container.jsx";
import Placeholder01 from "../../assets/images/placeholder-01.png";
import { RecommendationPill } from "../../components/Table.jsx";
import ResultsTable from "./components/ResultsTable.jsx";
import { useMain } from "../../store/context/MainContext.jsx";
import { formatDateToDashFormat } from "../../utils/index.js";
import {
  AsymmetricErrorBarsWithConstantOffsetChart
} from "../../components/AsymmetricErrorBarsWithConstantOffsetChart.jsx";
import { BasicWaterfallChart } from "../../components/BasicWaterfallChart.jsx";

const NewPortfolioAnalysisResults = () => {
    const context = useMain();
    const keys = ["Growth", "Quality", "Macro", "Momentum Fast", "Momentum Slow", "Trend Following", "Value", "Other Factors", "Overall"];
    const [selectedKey, setSelectedKey] = useState(keys[0]);
    const [scope, setScope] = useState("categories");
    const [timeScope, setTimeScope] = useState("historical");

    const resultColumns = useMemo(
      () => [
        {
          Header: "Ticker",
          accessor: "ticker",
          Cell: ({ row }) => (
            <div className="flex items-center" onClick={() => console.log}>
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
          Header: "Weight",
          accessor: "weight"
        },

        {
          Header: "AssetX Signal",
          accessor: "AssetX Signal",
          Cell: RecommendationPill
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
          Header: "Growth",
          accessor: "Growth"
        },
        {
          Header: "Macro",
          accessor: "Macro"
        },
        {
          Header: "Momentum Fast",
          accessor: "Momentum Fast"
        },
        {
          Header: "Momentum Slow",
          accessor: "Momentum Slow"
        },
        {
          Header: "Quality",
          accessor: "Quality"
        },
        {
          Header: "Trend Following",
          accessor: "Trend Following"
        },
        {
          Header: "Value",
          accessor: "Value"
        }
      ],
      []
    );

    const renderTableHeader = () => {
      const headers = ["Attribution", "Current", "Average"];
      return headers.map((header, index) => <th key={index} className="px-6 py-4">{header}</th>);
    };

    console.log(context.predictionData?.["1M"]);
    const renderTableRows = () => {
      const factorContribution = context.predictionData?.["1M"]?.factor_contribution;
      if (!factorContribution) {
        return null;
      }

      const { current_contribution, average_contribution } = factorContribution;
      const keys = Object.keys(current_contribution);

      return keys.map((key, index) => (
        <tr key={index}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td className="px-6 py-4">{key}</td>
          <td className="px-6 py-4">{current_contribution[key]}</td>
          <td className="px-6 py-4">{average_contribution[key]}</td>
        </tr>
      ));
    };

    const getLastMonthDate = () => {
      const today = new Date();
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
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
                  <div className="mt-10 " style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <div>
                      <h3 className="text-3xl font-semibold">Historical Price Performance</h3>
                    </div>
                    <div>
                        <span
                          className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Value</span>
                      <span
                        className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Growth</span>

                    </div>
                    <div>
                      <span className="text-xs font-medium">Forecast Horizon</span>
                      <span
                        className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">1W</span>
                      <span
                        className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">1M</span>
                      <span
                        className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">1Y</span>
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
                      <div>
                        <h3 className="text-3xl font-semibold">Details</h3>
                      </div>
                      <span className="text-xs pr-4">View by:</span>
                      <div>
                        <div className="" role="group">
                          <button type="button">
                            <input
                              className="hidden"
                              type="radio"
                              id="categories"
                              name="scope"
                              value="categories"
                              checked={scope === "categories"}
                              onChange={handleSetScope}
                            />
                            <label
                              className="px-1 py-1 text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 "
                              htmlFor="categories">
                              Categories
                            </label>
                          </button>
                          <button type="button"
                                  className="">
                            <input
                              className="hidden"
                              type="radio"
                              id="individual"
                              name="scope"
                              value="individual"
                            />
                            <label
                              className="px-1 py-1 text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                              htmlFor="individual">
                              Individual
                            </label>
                          </button>
                        </div>

                      </div>
                      <div>
                        <div className="inline-flex rounded-md shadow-sm" role="group">
                          <button type="button">
                            <input
                              className="hidden"
                              type="radio"
                              id="historical"
                              name="timeScope"
                              value="historical"
                              checked={timeScope === "historical"}
                              onChange={handleTimeScope}
                            />
                            <label
                              className="px-1 py-1 text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 "
                              htmlFor="historical">
                              Historical
                            </label>
                          </button>
                          <button type="button"
                                  className="">
                            <input
                              className="hidden"
                              type="radio"
                              id="current"
                              name="timeScope"
                              value="current"
                            />
                            <label
                              className="px-1 py-1 text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                              htmlFor="current">
                              Current
                            </label>
                          </button>
                        </div>

                      </div>
                      <div>
                        {keys.map((key) => (
                          <button
                            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-xs px-3 py-1.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                            key={key}
                            onClick={() => setSelectedKey(key)}
                          >
                            {key}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/*End Selectable options*/}
                  <BasicWaterfallChart
                    data={context.predictionData?.["1M"]?.feature_importance?.[selectedKey]}
                    key={selectedKey}
                  />
                </section>

                <section>
                  <h3 className="text-3xl font-semibold">Factor Contribution</h3>
                  <ResultsTable
                    columns={subCategoriesColumns}
                    data={context.predictionData?.["1M"]?.ticker_contribution}
                  />
                </section>


              </div>
              <div className="col-span-6 md:col-span-3 lg:grid-cols-6 xl:col-span-2">
                <section>
                  <h3 className="text-3xl font-semibold">Current Trading Book</h3>
                  <ResultsTable
                    columns={resultColumns}
                    data={context.predictionData?.current_trading_book}
                  />
                </section>
                <section className="mb-20">
                  <h3 className="text-3xl font-semibold">AI Selected Comparables</h3>
                  <p className="text-gray-500 font-light mt-4">
                    as of {getLastMonthDate()}
                  </p>
                  <div className="mt-10">
                    <div className="relative overflow-x">
                      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-3 h-{600}">
                        <table className="w-full text-sm text-left text-gray-500">
                          <thead className=" sticky  text-xs text-gray-700 uppercase bg-gray-50 ">
                          </thead>
                          <tbody>
                          {context.predictionData?.["1M"].ai_alternatives.map(([symbol, company]) => (
                            <tr key={symbol} className="bg-white border-b  hover:bg-gray-50 ">
                              <td className="px-6 py-4">
                                <div className="flex items-center" onClick={() => console.log}>
                                  <img
                                    className="w-10 h-10 rounded-full"
                                    src={company.company_logo || "https://www.ortodonciasyv.cl/wp-content/uploads/2016/10/orionthemes-placeholder-image-2.png"}
                                    alt={company.company_name + " image"}
                                  />
                                  <div className="pl-3">
                                    <div className="text-base font-semibold">{company.company_name}</div>
                                    <div className="font-normal text-gray-500">{company.sector}</div>
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
                          ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </section>
                <section>
                  <h3 className="text-3xl font-semibold">Performance Attribution</h3>

                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      {renderTableHeader()}
                      </thead>
                      <tbody>
                      {renderTableRows()}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            </div>
            {/*End Content*/}
            {/*Footer*/}
            <section className="flex">
              {/*card*/}
              <div
                className="m-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img className="rounded-t-lg"
                       src="https://e3.365dm.com/23/08/2048x1152/skynews-apple-logo_6267788.jpg?20230830122917"
                       alt="" />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy
                      technology acquisitions 2021</h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise
                    technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </div>
              </div>
              {/*End card*/}
              {/*card*/}
              <div
                className="m-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img className="rounded-t-lg"
                       src="https://e3.365dm.com/23/08/2048x1152/skynews-apple-logo_6267788.jpg?20230830122917"
                       alt="" />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy
                      technology acquisitions 2021</h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise
                    technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </div>
              </div>
              {/*End card*/}
              {/*card*/}
              <div
                className="m-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img className="rounded-t-lg"
                       src="https://e3.365dm.com/23/08/2048x1152/skynews-apple-logo_6267788.jpg?20230830122917"
                       alt="" />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy
                      technology acquisitions 2021</h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise
                    technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </div>
              </div>
              {/*End card*/}
              {/*card*/}
              <div
                className="m-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img className="rounded-t-lg"
                       src="https://e3.365dm.com/23/08/2048x1152/skynews-apple-logo_6267788.jpg?20230830122917"
                       alt="" />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy
                      technology acquisitions 2021</h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise
                    technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </div>
              </div>
              {/*End card*/}
              {/*card*/}
              <div
                className="m-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img className="rounded-t-lg"
                       src="https://e3.365dm.com/23/08/2048x1152/skynews-apple-logo_6267788.jpg?20230830122917"
                       alt="" />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy
                      technology acquisitions 2021</h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise
                    technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </div>
              </div>
              {/*End card*/}
              {/*card*/}
              <div
                className="m-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img className="rounded-t-lg"
                       src="https://e3.365dm.com/23/08/2048x1152/skynews-apple-logo_6267788.jpg?20230830122917"
                       alt="" />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy
                      technology acquisitions 2021</h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise
                    technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </div>
              </div>
              {/*End card*/}


            </section>
            {/*End Footer*/}
          </Container>
        </main>
      </>
    );
  }
;

export default NewPortfolioAnalysisResults;