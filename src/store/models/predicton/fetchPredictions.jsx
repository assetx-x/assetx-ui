import { getPredictions, updatePredictions } from "../../api/predictions.jsx";

const fetchPredictions = async ({ queryKey }) => {
  const { data, id } = queryKey[1];
  console.log("fetchPredictions ID -->", id);
  const response = !id ? await getPredictions({ "data": data }) :
    await updatePredictions({ "data": data }, id);
  return response.data;
};

export default fetchPredictions;