import { getHoldings } from "../../api/holdings.jsx";

const fetchHoldings = async () => {
  const response = await  getHoldings();
  return response.data;
};

export default fetchHoldings;