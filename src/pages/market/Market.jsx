import React from "react";
import { Header } from "../../components/Header.jsx";
import { Container } from "../../components/Container.jsx";
import usFlag from "../../assets/images/us.png";
import Tabs from "../../components/Tabs.jsx";
import { Loader } from "react-loaders";
import { useNavigate } from "react-router-dom";
import AiDrivenInsights from "../aiDrivenInsights/AIDrivenInsights.jsx";
import MyToggle from "../MyToggle/MyToggle.jsx";
import PortfolioAnalysis from "../stockMarketDetails/PortfolioAnalysis.jsx";

const Market = () => {
  const navigate = useNavigate();

  const tabsConfig = {
    isMain: true,
    type: "underline",
    tabs: [
      // { name: "A.I. Driven insights" , onClickHandler: () => navigate("/us/ai-driven-insights", {replace: true}) },
      { name: "A.I. Driven insights", content: <AiDrivenInsights /> },
      { name: "MyToggle", content: <MyToggle /> },
      {
        name: "Portfolio Analysis",
        content: <PortfolioAnalysis />,
      },
      {
        name: "Regime Analysis",
        content: (
          <div className="flex justify-center mt-4">
            <h3 className="text-2xl font-semibold">Under construction...</h3>
          </div>
        ),
      },
    ],
  };

  return (
    <>
      <Header />
      <main>
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
          {/*End Title*/}
          {/*Tabs*/}
          <Tabs config={tabsConfig} />
          {/*End Tabs*/}
        </Container>
      </main>
    </>
  );
};

export default Market;
