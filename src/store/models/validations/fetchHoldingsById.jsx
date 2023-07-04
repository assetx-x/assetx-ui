import {  getHoldingsById } from "../../api/holdings.jsx";

const fetchHoldingsById = async ({queryKey}) => {
  const { id } = queryKey[1]
  const response = await  getHoldingsById(id);
  return response.data;
};
export default fetchHoldingsById;