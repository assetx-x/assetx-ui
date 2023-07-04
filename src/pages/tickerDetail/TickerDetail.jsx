import React, { useEffect } from "react";
import {  useParams } from "react-router-dom";
import { Header } from "../../components/Header.jsx";
import { Container } from "../../components/Container.jsx";
import Tabs from "../../components/Tabs.jsx";
import DetailView from "../stockMarketDetails/components/DetailView.jsx";
import BlockUi from "@availity/block-ui";
import { useMain } from "../../store/context/MainContext.jsx";
import { useQuery } from "react-query";
import fetchTickerDetails from "../../store/models/details/fetchTickerDetails.jsx";

const TickerDetail = () => {
    const context = useMain();
    const { ticker } = useParams();
    const {
      data,
      error,
      isLoading
    } = useQuery(["details", { ticker }], fetchTickerDetails);

    // Handle Errors
    useEffect(() => {
      if (error) {
        console.log("details error ", error);
      }

    }, [error]);

    // TODO: Add skeleton
    if (!data) return (
      <>
        <BlockUi blocking={isLoading}>
          <Header />
          <Container />
        </BlockUi>
      </>
    );


    function formatRates(obj) {
      return {
        "composite": {
          name: "All",
          value: obj.graphing_data?.composite?.rating
        },
        "fundamental_balance_sheet": {
          name: "Balance Sheet",
          value: obj.graphing_data?.fundamental_balance_sheet?.rating
        },
        "fundamental_ratios": { name: "Ratios", value: obj.graphing_data?.fundamental_ratios?.rating },
        "fundamental_cash_flow": { name: "Cash Flow", value: obj.graphing_data?.fundamental_cash_flow?.rating },
        "macro": { name: "Macro", value: obj.graphing_data?.macro?.rating },
        "momentum_fast": { name: "Fast", value: obj.graphing_data?.momentum_fast?.rating },
        "trend_following": { name: "Trend Following", value: obj.graphing_data?.trend_following?.rating }
      };
    }
    function formatHistoricalExplainingData(key = context.selectedRatingData) {
      const result = [];
      const obj = data.graphing_data?.[key]?.historical_importance;
      const xAxis = data.graphing_data?.composite?.["historical_dates"];

      for (const [key, value] of Object.entries(obj)) {
        if (key !== "date") {
          // Set groupnorm to 'percent' only for the first element
          const groupnorm = result.length === 0 ? "percent" : undefined;
          result.push(
            { x: xAxis, y: value, name: key, stackgroup: "one", groupnorm }
          );
        }
      }

      return result;
    }

    const historicalExplainerConfig = {
      chart:
        {
          description: data.graphing_data?.composite?.forecast_information?.sentence,
          rates: formatRates(data),
          type: "HistoricalExplainerChart",
          data:
            formatHistoricalExplainingData(context.selectedRatingData)
        }
    };

    const forecastChartConfig = {
      chart:
        {
          description: data.graphing_data?.composite?.forecast_information?.sentence,
          rates: formatRates(data),
          type: "CombinedLinearChart",
          data:
          data.graphing_data?.composite?.forecast_information
        }
    };

    const tabsConfig = {
      type: "underline",
      tabs: [
        { name: "Historical Explainer", content: <DetailView config={historicalExplainerConfig} /> },
        { name: "Forecast", content: <DetailView config={forecastChartConfig} /> }
      ]
    };


    return (
      <>
        <Header />
        <BlockUi blocking={isLoading}>
          <main>
            <Container>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex items-center justify-center w-168 h-168 mb-4 md:mb-0 md:mr-4">
                    <img src={data.header_information?.company_logo} alt={data.header_information?.company_name}
                         className="rounded-full" width={168}
                         height={168} />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-4xl pl-6">{data.header_information?.company_name}</h1>
                    <h2 className="text-l pl-6">{data.header_information?.ticker}</h2>
                    <h2 className="pl-6"><span className="text-5xl font-bold">{data.header_information?.last_price}</span>
                      <span
                        className="text-l">USD</span>
                      {/*<span className="text-xl text-green-600">+29.90</span> */}
                      {/*<span className="text-xl text-green-600">+14.38%</span>*/}
                    </h2>
                    {/*<h3 className="text-sm text-gray-400 pl-6">Last update at Apr 27, 11:16 EDT</h3>*/}
                  </div>
                </div>
              </div>
              {/*Tabs*/}
              <div className={"mt-6"}>
                <Tabs config={tabsConfig} />
              </div>
              {/*End Tabs*/}
            </Container>
          </main>
        </ BlockUi>

      </>
    );
  }
;

export default TickerDetail;