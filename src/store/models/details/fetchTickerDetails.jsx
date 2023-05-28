import {getDetails} from "../../api/details.jsx";

const fetchTickerDetails = async ({queryKey}) => {
  const {ticker}= queryKey[1];
  const response = await getDetails(ticker);
  return response.data;
};

export default fetchTickerDetails;