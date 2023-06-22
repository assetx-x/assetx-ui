import {getPredictions} from "../../api/predictions.jsx";

const fetchPredictions = async ({queryKey}) => {
  const {data}= queryKey[1];
  const response = await getPredictions({"data": data});
  return response.data;
};

export default fetchPredictions;