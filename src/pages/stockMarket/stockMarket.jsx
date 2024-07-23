import React from "react";
import BlockUi from "@availity/block-ui";
import { Loader } from "react-loaders";
import { Header } from "../../components/Header";
import usFlag from "../../assets/images/us.png";
import { Container } from "../../components/Container";
import EquityStrategies from "./Tabs/EquityStrategies";
import KPIModels from "./Tabs/KPIModels";
import Tabs from "../../components/Tabs";

function StockMarket() {
  const tabsConfig = {
    isMain: true,
    type: "underline",
    tabs: [
      { name: "Active Equity Strategies", content: <EquityStrategies /> },
      {
        name: "Active KPI Models",
        content: <KPIModels />,
      },
    ],
  };

  return (
    <>
      <Header />
      <BlockUi
        blocking={false}
        loader={<Loader active type="ball-scale" color="#0248C7" />}
      >
        <Container>
          {/*Title*/}
          <div className="flex mb-4">
            <img
              className="w-10 h-10 rounded-full"
              src={usFlag}
              alt="Rounded avatar"
            />
            <h1 className="text-4xl font-semibold pl-4	uppercase">
              US Stock Market
            </h1>
          </div>
          <h2 className="text-3xl font-bold py-2">Strategy Catalog</h2>
          <Tabs config={tabsConfig} />
        </Container>
      </BlockUi>
    </>
  );
}

export default StockMarket;
