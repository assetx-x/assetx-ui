import React, { useMemo, useState } from "react";
import { Header } from "../../components/Header.jsx";
import { Container } from "../../components/Container.jsx";
import usFlag from "../../assets/images/us.png";
import Tabs from "../../components/Tabs.jsx";
import Table, { RecommendationPill } from "../../components/Table.jsx";
import { LinearChart } from "../../components/LinearChart.jsx";
import MiniChart from "../../assets/images/mini-chart.png"



const PortfolioAnalysisResults = (props) => {
    const [jsonResultData, setJsonResultData] = useState([
      {
        "ticker": "AAPL",
        "company_name": "Apple Inc.",
        "company_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiHtmcXWWWDYHXOQHeNfPkdA2OJYBuDxGU0G4_6eaJcGWr6G-gNNmGSXczyBbgEnE&usqp=CAU&ec=48665698",
        "recommendation": "Increase weight",
        "weight": "30.45",
        "dmc_weight": "52.00",
        "data":{}
      },
      {
        "ticker": "GOOG",
        "company_name": "Alphabet Inc.",
        "recommendation": "Decrease weight",
        "company_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQDox4hPrVW6XsKsGSXE2iCxi_YZo3UtXD5BgVet7W-jtYhCedQU4Dkw8&usqp=CAU",
        "weight": "52.00",
        "dmc_weight": "30.45",
        "data":{}
      },
      {
        "ticker": "JUAN",
        "company_name": "N/A",
        "company_logo": "",
        "recommendation": "None",
        "weight": "0.00",
        "dmc_weight": "0.00",
        "data":{}
      },
      {
        "ticker": "AAPL",
        "company_name": "Apple Inc.",
        "company_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiHtmcXWWWDYHXOQHeNfPkdA2OJYBuDxGU0G4_6eaJcGWr6G-gNNmGSXczyBbgEnE&usqp=CAU&ec=48665698",
        "recommendation": "Increase weight",
        "weight": "30.45",
        "dmc_weight": "52.00",
        "data":{}
      },
      {
        "ticker": "GOOG",
        "company_name": "Alphabet Inc.",
        "recommendation": "Decrease weight",
        "company_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQDox4hPrVW6XsKsGSXE2iCxi_YZo3UtXD5BgVet7W-jtYhCedQU4Dkw8&usqp=CAU",
        "weight": "52.00",
        "dmc_weight": "30.45",
        "data":{}
      },
      {
        "ticker": "JUAN",
        "company_name": "N/A",
        "company_logo": "",
        "recommendation": "None",
        "weight": "0.00",
        "dmc_weight": "0.00",
        "data":{}
      },
      {
        "ticker": "AAPL",
        "company_name": "Apple Inc.",
        "company_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiHtmcXWWWDYHXOQHeNfPkdA2OJYBuDxGU0G4_6eaJcGWr6G-gNNmGSXczyBbgEnE&usqp=CAU&ec=48665698",
        "recommendation": "Increase weight",
        "weight": "30.45",
        "dmc_weight": "52.00",
        "data":{}
      },
      {
        "ticker": "GOOG",
        "company_name": "Alphabet Inc.",
        "recommendation": "Decrease weight",
        "company_logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQDox4hPrVW6XsKsGSXE2iCxi_YZo3UtXD5BgVet7W-jtYhCedQU4Dkw8&usqp=CAU",
        "weight": "52.00",
        "dmc_weight": "30.45",
        "data":{}
      },
      {
        "ticker": "JUAN",
        "company_name": "N/A",
        "company_logo": "",
        "recommendation": "None",
        "weight": "0.00",
        "dmc_weight": "0.00",
        "data":{}
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

    const resultTabsConfig = {
      type: "pills",
      tabs: [
        { name: "Portfolio Beta" },
        { name: "Last 5 Sell Offs" },
        { name: "Performance ", selected: true },
        { name: "Risk Allocation" }
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
                src={row.original.company_logo|| "https://www.ortodonciasyv.cl/wp-content/uploads/2016/10/orionthemes-placeholder-image-2.png"}
                alt={row.original.company_name + " image"}
              />
              <div className="pl-3">
                <div className="text-base font-semibold">{row.original.company_name}</div>
                <div className="font-normal text-gray-500">BCBA: {row.original.ticker}</div>
              </div>
            </div>
          )
        },
        {
          Header: "",
          accessor: "data",
          Cell: ({ row }) => (
            <div className="flex items-center">
              <img
                className="min-w-[60px] w-[60px]"
                src={MiniChart}
              />

            </div>
          )
        },
        {
          Header: "Recommendation",
          accessor: "recommendation",
          Cell: RecommendationPill
        },

        {
          Header: "%",
          accessor: "weight"
        },
        {
          Header: "DMC Wheight",
          accessor: "dmc_weight",
          width: 60,
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
            <section className="mt-4">
              {/*Title*/}
              <div>
                <h3 className="text-3xl font-semibold">Portfolio Analysis Results</h3>
              </div>
              <div className={"mt-6"}>
                <Tabs config={resultTabsConfig} />
              </div>
              {/*End Title*/}
              <div className="grid grid-cols-1 md:grid-cols-2">

                <div>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Your portfolio
                    allocation</h5>
                    <LinearChart />
                </div>
                <div>

                  <div>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Risk
                      Constrained Allocation</h5>
                    <LinearChart />
                  </div>
                </div>

              </div>
              <div>
                {/*Table*/}
                <div className={"overflow-x"}>
                  <Table data={jsonResultData} columns={resultColumns} paginated={true}/>
                </div>
                {/*End Table*/}

                <div>


                </div>
              </div>
            </section>
            {/*End Results Table*/}
          </Container>
        </main>
      </>
    );
  }
;

export default PortfolioAnalysisResults;