import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header.jsx";
import { Container } from "../../components/Container.jsx";
import BlockUi from "@availity/block-ui";
import { useMain } from "../../store/context/MainContext.jsx";
import { useQuery } from "react-query";
import fetchTickerDetails from "../../store/models/details/fetchTickerDetails.jsx";
import fetchTickerPrice from "../../store/models/details/fetchTickerPrice.jsx";
import { Loader } from "react-loaders";
import { formatDateToDashFormat } from "../../utils/index.js";
import HistoricalPricePerformance from "./components/HistoricalPricePerformance.jsx";
import FactorContribution from "./components/FactorContribution.jsx";
import AISelectedComparables from "./components/AiSelectedComparables.jsx";
import PerformanceAttribution from "./components/PerformanceAttribution.jsx";
import PerformanceDetails from "./components/PerformanceDetails.jsx";
import fetchTickerDetailsV2 from "../../store/models/details/fetchTickerDetailsV2.jsx";
import Tabs from "../../components/Tabs.jsx";
import {
  faMoneyBillTrendUp,
  faNewspaper,
  faEye,
  faChartSimple
} from "@fortawesome/free-solid-svg-icons";
import AssetxInsights from "./components/AssetxInsights.jsx";
import News from "./components/News.jsx";
import KeyValues from "./components/KeyValues.jsx";
import fetchSearchGTP from "../../store/models/details/fetchSearchGTP.jsx";

const TickerDetail = () => {
  const context = useMain();
  const { ticker } = useParams();
  const [keywords, setKeywords] = useState([]);
  const [search, setSearch] = useState("");
  const [investingHorizonOption, setInvestingHorizonsOption] = useState("21D");
  const [headerData, setHeaderData] = useState({});
  const [scope, setScope] = useState("categories");
  const [selector, setSelector] = useState("returns");
  const [timeScope, setTimeScope] = useState("historical");

  const { data, error, isLoading } = useQuery(
    ["details", { ticker }],
    fetchTickerDetails
  );

  const {
    data: dataV2,
    error: errorV2,
    isLoading: isLoadingV2
  } = useQuery(
    ["details_v2", { ticker }],
    fetchTickerDetailsV2
  );

  const {
    data: searchResult,
    error: searchError,
    isLoading: searchIsLoading,
    refetch: searchRefetch
  } = useQuery(
    ["search", { ticker,search }],
    fetchSearchGTP,
    {
      enabled: false
    }
  );

  const {
    data: priceData,
    error: priceError,
    isLoading: priceIsLoading
  } = useQuery(["priceData", { ticker }], fetchTickerPrice);

  const tabsConfig = {
    isMain: true,
    type: "underline",
    isCentered: true,
    tabs: [
      {
        icon: faMoneyBillTrendUp,
        content: <AssetxInsights data={dataV2} selector={selector} />
      },
      {
        icon: faNewspaper,
        content: <News data={dataV2} selector={selector} />
      },
      {
        icon: faChartSimple,
        content: <KeyValues data={dataV2} selector={selector} />
      },
      {
        icon: faEye,
        content: <AISelectedComparables data={dataV2} selector={selector} />
      }
    ]
  };

  // Handle Errors
  useEffect(() => {
    if (error) {
      console.log("details error ", error);
    }
  }, [error]);

  useEffect(() => {
    if (!isLoading) {
      const featureImportanceGraph = dataV2?.[selector]?.[context.featureImportance];

      if (featureImportanceGraph) {
        const _featureImportanceGraphKeys = Object.keys(featureImportanceGraph);
        const _indexOverall = _featureImportanceGraphKeys.indexOf("Overall");
        const _overall = _featureImportanceGraphKeys.splice(_indexOverall, 1);

        setKeywords([..._overall, ..._featureImportanceGraphKeys]);


      }
    }
  }, [isLoading, selector, dataV2, context.featureImportance]);

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      // Enter key is pressed
      searchRefetch();
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };


  // TODO: Add skeleton
  if (!data || !dataV2)
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
      "Sector Historical Contribution"
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
    const statsInfo = data?.[selector]?.summary_stats.summary_table[0];
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
    setSelector(event.target.value);
  };


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

                  <div className="ml-3 p-3">
                    <select
                      onChange={handleTimeScope}
                      id="countries"
                      className="px-6 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 ">
                      <option value="returns" selected>1M Returns</option>
                      <option value="earnings">Earnings Model</option>
                    </select>
                  </div>


                  <BlockUi
                    blocking={priceIsLoading}
                    loader={<Loader active type="ball-scale" color="#0248C7" />}
                  >
                    <h2 className="pl-6">
                      <span className="text-5xl font-bold">
                        {dataV2?.[selector]?.price_data?.["Terminal Price"]}
                      </span>
                      <span className="ml-1 text-l">USD</span>
                      <span className={
                        isNegativeNumber(dataV2?.[selector]?.price_data?.["MTD Return Difference"])
                          ? "ml-4 text-xl text-red-600"
                          : "ml-4 text-xl text-green-600"
                      }>
                        {dataV2?.[selector]?.price_data?.["MTD Return Difference"]}{" "}
                      </span>
                      {/*TODO: color should change based on the value*/}
                      <span
                        className={
                          isNegativeNumber(dataV2?.[selector]?.price_data?.["Daily Return Difference"])
                            ? "text-xl text-red-600 "
                            : "text-xl text-green-600 "
                        }
                      >
                        {dataV2?.[selector]?.price_data?.["Daily Return Difference"]}
                        %
                      </span>
                    </h2>
                  </BlockUi>
                  {/*<h3 className="text-sm text-gray-400 pl-6">Last update at Apr 27, 11:16 EDT</h3>*/}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-10 gap-4">
              <div className="col-span-10">
                {/*Search Input*/}
                <div className="col-span-4 mt-10">
                  <div className="relative w-[300px]">
                    <input
                      className="w-full px-4 py-3 text-sm text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      type="text"
                      placeholder="Ask us anything"
                      onChange={handleSearch}
                      onKeyDown={handleKeyDown}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="pointer-events-none absolute right-4 top-3 h-6 w-6 fill-slate-400"
                           xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M20.47 21.53a.75.75 0 1 0 1.06-1.06l-1.06 1.06Zm-9.97-4.28a6.75 6.75 0 0 1-6.75-6.75h-1.5a8.25 8.25 0 0 0 8.25 8.25v-1.5ZM3.75 10.5a6.75 6.75 0 0 1 6.75-6.75v-1.5a8.25 8.25 0 0 0-8.25 8.25h1.5Zm6.75-6.75a6.75 6.75 0 0 1 6.75 6.75h1.5a8.25 8.25 0 0 0-8.25-8.25v1.5Zm11.03 16.72-5.196-5.197-1.061 1.06 5.197 5.197 1.06-1.06Zm-4.28-9.97c0 1.864-.755 3.55-1.977 4.773l1.06 1.06A8.226 8.226 0 0 0 18.75 10.5h-1.5Zm-1.977 4.773A6.727 6.727 0 0 1 10.5 17.25v1.5a8.226 8.226 0 0 0 5.834-2.416l-1.061-1.061Z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                {/*End Search Input*/}
                <BlockUi
                  className={`w-full  ${!!searchResult ? 'min-h-[70px] mt-10': ''}`}
                  blocking={searchIsLoading}
                  loader={<Loader active type="ball-scale" color="#0248C7" />}
                >
                  <p>{searchResult}</p></BlockUi>
              </div>
              <div className="col-span-8">
                {dataV2 &&
                  <>
                    <HistoricalPricePerformance data={dataV2} handleTimeScope={handleTimeScope} selector={selector} />
                    <PerformanceDetails data={dataV2} selector={selector} keywords={keywords} />
                  </>
                }
                <FactorContribution renderTableHeader={renderTableHeader} renderTableRows={renderTableRows} />
              </div>
              <div className="col-span-2">


                <Tabs config={tabsConfig} />
                {/*Performance Attribution*/}
                {/*<PerformanceAttribution data={data} selector={selector} />*/}
                {/*Performance Attribution*/}

                {/*Return Summary*/}
                {headerData?.data && (
                  <section>
                    <div className="mt-10">
                      <h3 className="text-3xl font-semibold">Return Summary</h3>
                      <p className="text-gray-500 font-light mt-4 mb-5">
                        {data?.[selector]?.summary_stats.summary_sentence}
                      </p>
                      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                          <thead
                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          {renderStatsTableHeader()}
                          </thead>
                          <tbody>{renderStatsTableRows()}</tbody>
                        </table>
                      </div>
                    </div>
                  </section>
                )}
                {/*End Return Summary*/}
              </div>
            </div>
          </Container>
        </main>
      </BlockUi>
    </>
  );
};

export default TickerDetail;
