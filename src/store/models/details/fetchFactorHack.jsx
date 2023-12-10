import { getFactorHack } from "../../api/details.jsx";

const fetchFactorHack = async ({ queryKey }) => {
  const { ticker, factor } = queryKey;
  const response = await getFactorHack(factor, ticker);
  return response.data;
};

export default fetchFactorHack;
