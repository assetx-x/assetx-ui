import React from "react";
import NewPortfolioAnalysisResults from "./NewPortfolioAnalysisResults.jsx";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import fetchHoldingsById from "../../store/models/validations/fetchHoldingsById.jsx";
import { useMain } from "../../store/context/MainContext.jsx";

const PortfolioAnalysisResultsContainer = () => {
  const {id} = useParams();
  const context = useMain();
  const params = useParams();
  const {
    data,
    error,
    isLoading,
    refetch
  } = useQuery(["portfolio", { id: params.id }], fetchHoldingsById);


  if (!data) return <div>Loading...</div>;

  console.log("=>(PortfolioAnalysisResultsContainer.jsx:23) data", data);

  return (
    <NewPortfolioAnalysisResults  portfolio={data} id={id}/>
  );

};

export default PortfolioAnalysisResultsContainer;