import React from "react";
import { useMain } from "../../store/context/MainContext.jsx";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import fetchHoldingsById from "../../store/models/validations/fetchHoldingsById.jsx";
import PortfolioAnalysisResults from "./PortfolioAnalysisResults.jsx";
import { Header } from "../../components/Header.jsx";
import BlockUi from "@availity/block-ui";
import { Loader } from "react-loaders";
import { Container } from "../../components/Container.jsx";

const PortfolioAnalysisResultsContainer = (props) => {
  const context = useMain();
  const params = useParams();
  const {
    data,
    error,
    isLoading,
    refetch
  } = useQuery(["portfolio", { id: params.id }], fetchHoldingsById);

  if (!data) return  <>
    <Header />
    <BlockUi blocking={isLoading}   loader={<Loader active type="ball-scale" color="#0248C7" />}>
      <Container />
      <div className="flex items-center justify-center h-screen">
      </div>
    </BlockUi>
  </>;
console.log(data);
  return (
    <PortfolioAnalysisResults portfolio={data} />
  );

};

export default PortfolioAnalysisResultsContainer;