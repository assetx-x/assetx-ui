import { getSearch } from "../../api/details.jsx";

const fetchSearch = async ({queryKey}) => {
  const response = await getSearch(queryKey[1]);
  return response.data;
};

export default fetchSearch;
