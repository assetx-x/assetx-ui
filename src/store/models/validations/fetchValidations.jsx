import {getValidations} from "../../api/validations.jsx";

const fetchValidations = async ({queryKey}) => {
  const {tickers, weights}= queryKey[1];
  const response = await getValidations(tickers, weights)
  return response.data;
};

export default fetchValidations;