import { getDeepInsightDetails } from "../../api/details.jsx";


const fetchDeepInsightsDetails = async ({queryKey}) => {
  const {ticker, x}= queryKey[1];
  const data = {
    symbol: ticker,
    col: x
  }
  const response = await getDeepInsightDetails(data);
  return response.data;
};

export default fetchDeepInsightsDetails;