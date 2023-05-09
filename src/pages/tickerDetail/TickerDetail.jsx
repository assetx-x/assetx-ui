import React from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header.jsx";
import { Container } from "../../components/Container.jsx";
import Tabs from "../../components/Tabs.jsx";

const TickerDetail = (props) => {
  const { bcba } = useParams();
  const tabsConfig = {
    type: "underline",
    tabs: [
      { name: "Overview" },
      { name: "News" },
      { name: "Ideas" },
      { name: "Financial" },
      { name: "Technicals" },
      { name: "Forecast", selected: true },
    ]
  };


  return (
    <>
      <Header />
      <main>
        <Container>
          {/*Tabs*/}
          <Tabs config={tabsConfig} />
          {/*End Tabs*/}
        </Container>
      </main>
    </>
  );
};

export default TickerDetail;
