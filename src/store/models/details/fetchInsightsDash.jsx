import { getInsightsDash } from "../../api/dash.jsx";


const fetchInsightsDash = async () => {
  const response = await getInsightsDash();
  return response.data;
};

export default fetchInsightsDash;