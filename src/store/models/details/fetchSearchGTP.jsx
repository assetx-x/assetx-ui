import {getSearchGTP} from "../../api/details.jsx";


const fetchSearchGTP = async ({queryKey}) => {
  const {ticker, search}= queryKey[1];
  const response = await getSearchGTP(ticker, search);
  return response.data;
};

export default fetchSearchGTP;