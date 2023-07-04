import React from "react";
import { useMain } from "../../store/context/MainContext.jsx";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import fetchHoldingsById from "../../store/models/validations/fetchHoldingsById.jsx";
import PortfolioAnalysisResults from "./PortfolioAnalysisResults.jsx";

const PortfolioAnalysisResultsContainer = (props) => {
  const context = useMain();
  const params = useParams();
  const {
    data,
    error,
    isLoading,
    refetch
  } = useQuery(["portfolio", { id: params.id }], fetchHoldingsById);

  if (!data) return <div>Loading...</div>;
console.log(data);
  return (
    <PortfolioAnalysisResults portfolio={data} />
  );

};

export default PortfolioAnalysisResultsContainer;