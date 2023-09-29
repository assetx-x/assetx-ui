import { API_URL } from "../../constants/api.jsx";
import { get } from "../../services/apiClient.jsx";

export const getInsightsDash = async (requestLimits) => {
  return await get(
    `${API_URL.DASH}?limit=${requestLimits.limit}&offset=${requestLimits.offset}`
  );
};
