import { getInsightsDash } from "../../api/dash.jsx";

const fetchInsightsDash = async (requestLimits) => {
  const response = await getInsightsDash(requestLimits);
  return response.data;
};

export default fetchInsightsDash;
