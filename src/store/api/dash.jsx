import { API_URL } from "../../constants/api.jsx";
import { get } from "../../services/apiClient.jsx";

export const getInsightsDash = async () => {

  return await get(`${API_URL.DASH}`);
};