import {getPrice} from "../../api/details.jsx";

const fetchTickerPrice = async ({queryKey}) => {
  const {ticker}= queryKey[1];
  const response = await getPrice(ticker);
  return response.data;
};

export default fetchTickerPrice;