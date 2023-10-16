import {getDetailsV2} from "../../api/details.jsx";


const fetchTickerDetailsV2 = async ({queryKey}) => {
  const {ticker}= queryKey[1];
  const response = await getDetailsV2(ticker);
  return response.data;
};

export default fetchTickerDetailsV2;