import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header.jsx";
import { Container } from "../../components/Container.jsx";
import BlockUi from "@availity/block-ui";
import { useMain } from "../../store/context/MainContext.jsx";
import { useQuery } from "react-query";
import fetchTickerDetails from "../../store/models/details/fetchTickerDetails.jsx";
import fetchTickerPrice from "../../store/models/details/fetchTickerPrice.jsx";
import { Loader } from "react-loaders";
import { BasicWaterfallChart } from "../../components/BasicWaterfallChart.jsx";
import { formatDateToDashFormat } from "../../utils/index.js";
import { CombinedLinearChart } from "../../components/CombinatedLinearChart.jsx";
import fetchDeepInsightsDetails from "../../store/models/details/fetchDeepInsightsDetail.jsx";
import ReturnSummaryTable from "../../components/ReturnSummaryTable.jsx";
import { IsolationReturnChart } from "../../components/IsolationReturnChart.jsx";
import { ReactionChart } from "../../components/ReactionChart.jsx";

const DeepInsightDetails = () => {
  const navigate = useNavigate();
  const { ticker, x } = useParams();
  const keywords = [
    "Overall",
    "Macro",
    "Balance Sheet",
    "Income Statement",
    "Cash Flows",
  ];
  const [investingHorizonOption, setInvestingHorizonsOption] = useState("21D");
  const [selectedKey, setSelectedKey] = useState(keywords[0]);
  const [headerData, setHeaderData] = useState({});
  const [scope, setScope] = useState("categories");
  const [selector, setSelector] = useState("returns");
  const [timeScope, setTimeScope] = useState("historical");

  const { data, error, isLoading } = useQuery(
    ["details", { ticker }],
    fetchTickerDetails
  );

  const {
    data: priceData,
    error: priceError,
    isLoading: priceIsLoading,
  } = useQuery(["priceData", { ticker }], fetchTickerPrice);

  const {
    data: deepData,
    error: deepError,
    isLoading: deepIsLoading,
  } = useQuery(["deepInsightsData", { ticker, x }], fetchDeepInsightsDetails);

  // Handle Errors
  useEffect(() => {
    if (error) {
      console.log("details error ", error);
    }
  }, [error]);

  useEffect(() => {
    console.log({ ticker, x });
  }, [ticker, x]);

  // TODO: Add skeleton
  if (!data)
    return (
      <>
        <Header />
        <BlockUi
          blocking={isLoading}
          loader={<Loader active type="ball-scale" color="#0248C7" />}
        >
          <Container />
          <div className="flex items-center justify-center h-screen"></div>
        </BlockUi>
      </>
    );

  const getLastMonthDate = () => {
    const today = new Date();
    const lastMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate()
    );
    return formatDateToDashFormat(lastMonth);
  };

  function isNegativeNumber(number) {
    return number <= 0;
  }

  const renderTableHeader = () => {
    const headers = [
      "Factor",
      "Current Contribution",
      "Historical Contribution",
      "Sector Current Contribution",
      "Sector Historical Contribution",
    ];
    return headers.map((header, index) => (
      <th key={index} className="px-6 py-4">
        {header}
      </th>
    ));
  };
  const renderTableRows = () => {
    const factorContribution = data?.[selector]?.factor_contribution;
    if (!factorContribution) {
      return null;
    }

    const { current_contribution } = factorContribution;
    const keys = Object.keys(current_contribution);
    return keys.map((key, index) => (
      <tr
        key={index}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <td className="px-6 py-4">{key}</td>
        <td className="px-6 py-4">
          {factorContribution.current_contribution[key]}
        </td>
        <td className="px-6 py-4">
          {factorContribution.historical_contribution[key]}
        </td>
        <td className="px-6 py-4">
          {factorContribution.sector_current_contribution[key]}
        </td>
        <td className="px-6 py-4">
          {factorContribution.sector_historical_contribution[key]}
        </td>
      </tr>
    ));
  };

  const renderStatsTableHeader = () => {
    const headers = ["Factor", "1 Week", "1 Month", "1 Quarter"];
    return headers.map((header, index) => (
      <th key={index} className="px-6 py-4">
        {header}
      </th>
    ));
  };
  const renderStatsTableRows = () => {
    const statsInfo = deepData?.[selector]?.summary_stats.summary_table[0];
    if (!statsInfo) {
      return null;
    }

    const keys = Object.keys(statsInfo);
    return keys.map((key, index) => {
      return (
        <tr
          key={index}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <td className="px-6 py-4">{key}</td>
          <td className="px-6 py-4">{statsInfo[key]["1 Week"]}</td>
          <td className="px-6 py-4">{statsInfo[key]["1 Month"]}</td>
          <td className="px-6 py-4">{statsInfo[key]["1 Quarter"]}</td>
        </tr>
      );
    });
  };

  const handleSetScope = (event) => {
    setScope(event.target.value);
  };

  const handleTimeScope = (event) => {
    setTimeScope(event.target.value);
  };

  const extractString = (str) => {
    const parts = str.split("=");
    if (parts.length >= 2) {
      return parts[1].trim();
    }
    return null; // or any other default value you prefer
  };

  const handleDeepInsights = (data) => {
    let pts = "";
    for (let i = 0; i < data.points.length; i++) {
      pts = data.points[i].x;
    }
    console.log(pts);
  };

  console.log(deepData?.[0]);
  return (
    <>
      <Header />
      <BlockUi
        blocking={isLoading}
        loader={<Loader active type="ball-scale" color="#0248C7" />}
      >
        <main>
          <Container>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="flex items-center justify-center w-168 h-168 mb-4 md:mb-0 md:mr-4">
                  <img
                    src={data?.[selector]?.header_info.company_logo}
                    alt=""
                    className="rounded-full"
                    width={168}
                    height={168}
                  />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-4xl pl-6">
                    {data?.[selector]?.header_info.company_name}
                  </h1>
                  <div className="p-4 flex justify-between ">
                    {/*Investment Horizon*/}
                    <div className="ml-6">
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
                            checked={investingHorizonOption === "1D"}
                            // onChange={handleInvestingHorizonsChange}
                          />
                          <label
                            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                            htmlFor="1D"
                          >
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
                            htmlFor="21D"
                          >
                            Monthly
                          </label>
                        </button>
                        <button type="button" className="">
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
                            htmlFor="42D"
                          >
                            Bi-Monthly
                          </label>
                        </button>
                      </div>
                    </div>
                    {/*End Investment Horizon*/}
                    {/*TODO: this should be hidden on forecast tab*/}
                    {/*Objective Function*/}
                    <div className="ml-2 hidden">
                      <div
                        className="inline-flex rounded-md shadow-sm"
                        role="group"
                      >
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
                            htmlFor="min_variance"
                          >
                            Relative
                          </label>
                        </button>
                        <button type="button" className="">
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
                            htmlFor="max_sharpe"
                          >
                            Absolute
                          </label>
                        </button>
                      </div>
                    </div>
                    {/*End Objective Function*/}
                  </div>
                  <BlockUi
                    blocking={priceIsLoading}
                    loader={<Loader active type="ball-scale" color="#0248C7" />}
                  >
                    <h2 className="pl-6">
                      <span className="text-5xl font-bold">
                        {priceData?.current_price}
                      </span>
                      <span className="ml-1 text-l">USD</span>
                      <span className="ml-4 text-xl text-green-600">
                        {priceData?.ytd}{" "}
                      </span>
                      {/*TODO: color should change based on the value*/}
                      <span
                        className={
                          isNegativeNumber(priceData?.mtd)
                            ? "text-xl text-red-600 "
                            : "text-xl text-green-600 "
                        }
                      >
                        %
                      </span>
                    </h2>
                  </BlockUi>
                  {/*<h3 className="text-sm text-gray-400 pl-6">Last update at Apr 27, 11:16 EDT</h3>*/}
                </div>
              </div>
            </div>
            {/*Tabs*/}
            {/*Content  */}
            <div className="grid grid-cols-6 gap-4 sm:col">
              <div className="col-span-6 md:col-span-3 lg:grid-cols-6 xl:col-span-4">
                {/*Placeholder*/}
                <section className="mt-10">
                  <h1 className="text-2xl font-extrabold">
                    {deepData?.[0]?.["overall_sentence"]}
                  </h1>
                  <p className="text-lg text-gray-500 mt-6">
                    {deepData?.[0]?.["in_depth_sentence"]}
                  </p>
                </section>
                {/*End Placeholder*/}

                {/*Historical Price Performance*/}
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

                    {/*End Objective Function*/}
                  </div>
                  {deepData?.[0] && (
                    <CombinedLinearChart data={deepData?.[0]?.forecast} />
                  )}
                  {/*<AsymmetricErrorBarsWithConstantOffsetChart data={context.predictionData?.["1M"]?.portfolio} />*/}
                </section>

                <section>
                  <h3 className="text-3xl font-semibold">
                    Historical Event Dates in Isolation
                  </h3>
                  <p className="text-gray-500 font-light mt-4">
                    AssetX has detected a BUY signal X amount of times in the
                    past 10 years based on the current set of factors driving
                    the assets movement. Out of the X distinct times this signal
                    has been triggered, the median hit ratio across all time
                    horizons is X% and the median return is X.XX%
                  </p>
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    {deepData?.[0] && (
                      <ReactionChart data={deepData?.[0]?.reaction} />
                    )}
                  </div>
                </section>
                {/*Factor Contribution*/}
              </div>
              <div className="col-span-6 md:col-span-3 lg:grid-cols-6 xl:col-span-2">
                <section className="mb-20">
                  <h3 className="text-3xl font-semibold">Return Summary</h3>
                  <p className="text-gray-500 font-light mt-4">
                    {deepData?.[0]?.summary_stats?.summary_sentence}
                  </p>
                  <div className="mt-10">
                    <div className="relative overflow-x">
                      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-3 h-{600}">
                        {deepData?.[0] && (
                          <ReturnSummaryTable
                            data={
                              deepData?.[0]?.summary_stats?.summary_table?.[0]
                            }
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-3xl font-semibold">
                    Event Based Backtest
                  </h3>
                  <p className="text-gray-500 font-light mt-4">
                    Cumulative Return based on $1 according to a long-only
                    signal based on this factor
                  </p>
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    {deepData?.[0]?.isolation_return && (
                      <IsolationReturnChart
                        data={deepData?.[0]?.isolation_return}
                      />
                    )}
                  </div>
                </section>

                {deepData?.[0] && (
                  <section>
                    <div className="mt-10 h-[830px] overflow-scroll">
                      <h3 className="text-3xl font-semibold">
                        AI Selectable Comparables
                      </h3>
                      <div className="mt-10">
                        <div className="relative overflow-x">
                          <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-3 h-{600}">
                            <table className="w-full text-sm text-left text-gray-500">
                              <thead className=" sticky  text-xs text-gray-700 uppercase bg-gray-50 "></thead>
                              {deepData?.[0] && (
                                <tbody>
                                  {Object.entries(
                                    deepData?.[0].ai_comparables[0]
                                  ).map(([symbol, company]) => (
                                    <tr
                                      key={symbol}
                                      className="bg-white border-b  hover:bg-gray-50 "
                                    >
                                      <td className="px-6 py-4">
                                        <div className="flex items-center">
                                          <img
                                            className="w-10 h-10 rounded-full"
                                            src={
                                              company.company_logo ||
                                              "https://www.ortodonciasyv.cl/wp-content/uploads/2016/10/orionthemes-placeholder-image-2.png"
                                            }
                                            alt={
                                              company.company_name + " image"
                                            }
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
                                  ))}
                                </tbody>
                              )}
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}
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
            {/*End Tabs*/}
          </Container>
        </main>
      </BlockUi>
    </>
  );
};

export default DeepInsightDetails;
