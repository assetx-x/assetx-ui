import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header.jsx";
import { Container } from "../../components/Container.jsx";
import Tabs from "../../components/Tabs.jsx";
import DetailView from "../stockMarketDetails/components/DetailView.jsx";
import BlockUi from "@availity/block-ui";
import { useMain } from "../../store/context/MainContext.jsx";
import { useQuery } from "react-query";
import fetchTickerDetails from "../../store/models/details/fetchTickerDetails.jsx";
import fetchTickerPrice from "../../store/models/details/fetchTickerPrice.jsx";
import StackedView from "../stockMarketDetails/components/StackedView.jsx";
import { WaterfallChart } from "../../components/WaterfallChart.jsx";
import { Loader } from "react-loaders";
import Placeholder01 from "../../assets/images/placeholder-01.png";
import {
  AsymmetricErrorBarsWithConstantOffsetChart
} from "../../components/AsymmetricErrorBarsWithConstantOffsetChart.jsx";
import { BasicWaterfallChart } from "../../components/BasicWaterfallChart.jsx";
import ResultsTable from "../stockMarketDetails/components/ResultsTable.jsx";
import { formatDateToDashFormat } from "../../utils/index.js";
import { CombinedLinearChart } from "../../components/CombinatedLinearChart.jsx";

const TickerDetail = () => {
    const context = useMain();
    const { ticker } = useParams();
    const keywords = ["Growth", "Quality", "Macro", "Momentum Fast", "Momentum Slow", "Trend Following", "Value", "Other Factors", "Overall"];
    const [investingHorizonOption, setInvestingHorizonsOption] = useState("21D");
    const [selectedKey, setSelectedKey] = useState(keywords[0]);
    const {
      data,
      error,
      isLoading
    } = useQuery(["details", { ticker }], fetchTickerDetails);

    const {
      data: priceData,
      error: priceError,
      isLoading: priceIsLoading
    } = useQuery(["priceData", { ticker }], fetchTickerPrice);
    console.log("-> priceData", priceData);

    console.log("-> data.results[data.results.length-1].data", data?.results?.[data?.results.length - 1].data);

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
        <BlockUi blocking={isLoading} loader={<Loader active type="ball-scale" color="#0248C7" />}>
          <Container />
          <div className="flex items-center justify-center h-screen">
          </div>
        </BlockUi>
      </>
    );

    const getLastMonthDate = () => {
      const today = new Date();
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
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
        "Sector Historical Contribution"];
      return headers.map((header, index) => <th key={index} className="px-6 py-4">{header}</th>);
    };
    const renderTableRows = () => {
      const factorContribution = data.results[data.results.length - 1].data?.factor_contribution;
      if (!factorContribution) {
        return null;
      }

      const { current_contribution } = factorContribution;
      const keys = Object.keys(current_contribution);
      return keys.map((key, index) => (
        <tr key={index}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td className="px-6 py-4">{key}</td>
          <td className="px-6 py-4">{factorContribution.current_contribution[key]}</td>
          <td className="px-6 py-4">{factorContribution.historical_contribution[key]}</td>
          <td className="px-6 py-4">{factorContribution.sector_current_contribution[key]}</td>
          <td className="px-6 py-4">{factorContribution.sector_historical_contribution[key]}</td>
        </tr>
      ));
    };


    const renderStatsTableHeader = () => {
      const headers = [
        "Factor",
        "1 Week",
        "1 Month",
        "1 Quarter"
      ];
      return headers.map((header, index) => <th key={index} className="px-6 py-4">{header}</th>);
    };
    const renderStatsTableRows = () => {
      const statsInfo = data.results[data.results.length - 1].data?.summary_stats.summary_table[0];
      if (!statsInfo) {
        return null;
      }

      const keys = Object.keys(statsInfo);
      return keys.map((key, index) => {
          console.log("-> key", statsInfo[key]["1 Month"]);
          return (<tr key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">{key}</td>
            <td className="px-6 py-4">{statsInfo[key]["1 Week"]}</td>
            <td className="px-6 py-4">{statsInfo[key]["1 Month"]}</td>
            <td className="px-6 py-4">{statsInfo[key]["1 Quarter"]}</td>
          </tr>);
        }
      );
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
                    <img
                      src={data?.results?.[data?.results.length - 1].data.header_info.company_logo}
                      alt=""
                      className="rounded-full" width={168}
                      height={168} />
                  </div>
                  <div className="flex flex-col">
                    <h1
                      className="text-4xl pl-6">{data?.results?.[data?.results.length - 1].data.header_info.company_name}</h1>
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
                    <BlockUi blocking={priceIsLoading} loader={<Loader active type="ball-scale" color="#0248C7" />}>
                    <h2 className="pl-6"><span
                      className="text-5xl font-bold">{priceData?.current_price}</span>
                      <span
                        className="ml-1 text-l">USD</span>
                      <span className="ml-4 text-xl text-green-600">{priceData?.ytd} </span>
                      {/*TODO: color should change based on the value*/}
                      <span
                        className={isNegativeNumber(priceData?.mtd) ? "text-xl text-red-600 " : "text-xl text-green-600 "}>%</span>
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
                  <section>
                    <img width={"100%"} src={Placeholder01} alt="" />
                    <p>{data.results[data.results.length - 1].data?.sentence}</p>
                  </section>
                  {/*End Placeholder*/}

                  {/*Historical Price Performance*/}
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
                    <CombinedLinearChart
                      data={data.results[data.results.length - 1].data?.forecast}
                    />
                    {/*<AsymmetricErrorBarsWithConstantOffsetChart data={context.predictionData?.["1M"]?.portfolio} />*/}
                  </section>
                  {/*End Historical Price Performance*/}

                  {/*<section>*/}
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
                      alignItems: "center",
                      flexDirection: "row-reverse"
                    }}>
                      {/*Investment Horizon*/}
                      <div>
                        {keywords.map((key) => (
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
                  <BasicWaterfallChart
                    data={data.results[data.results.length - 1].data?.feature_importance_graph?.[selectedKey]}
                    key={selectedKey}
                  />
                  {/*</section>*/}

                  {/*Factor Contribution*/}
                  <section>
                    <h3 className="text-3xl font-semibold">Factor Contribution</h3>

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
                  {/*Factor Contribution*/}


                </div>
                <div className="col-span-6 md:col-span-3 lg:grid-cols-6 xl:col-span-2">

                  {/*AI Selected Comparables*/}
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
                            {Object.entries(data?.results?.[data?.results.length - 1].data?.ai_comparables[0]).map(([symbol, company]) => (

                              <tr key={symbol} className="bg-white border-b  hover:bg-gray-50 ">

                                <td className="px-6 py-4">
                                  <div className="flex items-center">
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
                  {/*End AI Selected Comparables*/}

                  {/*Performance Attribution*/}
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
                  {/*Performance Attribution*/}

                  {/*Return Summary*/}
                  <section>
                    <div className="mt-10">
                      <h3 className="text-3xl font-semibold">Return Summary</h3>
                      <p className="text-gray-500 font-light mt-4 mb-5">
                        {data?.results?.[data?.results.length - 1].data.summary_stats.summary_sentence}</p>
                      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                          <thead
                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          {renderStatsTableHeader()}
                          </thead>
                          <tbody>
                          {renderStatsTableRows()}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </section>
                  {/*End Return Summary*/}

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
              {/*End Tabs*/}
            </Container>
          </main>
        </ BlockUi>
      </>
    );
  }
;

export default TickerDetail;