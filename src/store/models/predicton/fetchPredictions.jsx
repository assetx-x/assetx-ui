import {getPredictions} from "../../api/predictions.jsx";

const fetchPredictions = async ({queryKey}) => {
  const {tickers, weights, investingHorizonOption, objectiveFunctionOption }= queryKey[1];
  const response = await getPredictions(tickers, weights, investingHorizonOption, objectiveFunctionOption);
  return response.data;
};

export default fetchPredictions;