import { API_URL } from "../../constants/api.jsx";
import { get } from "../../services/apiClient.jsx";

export const getInsightsDash = async (requestLimits) => {
  const { limit, offset, filters } = requestLimits;

  let url = `${API_URL.DASH}?limit=${limit}&offset=${offset}`;

  if (filters?.themes === "All") {
    return await get(url);
  }

  if (filters?.themes) {
    url += `&driver=${filters.themes}`;
  }
  // if (direction) {
  //   url += `&direction=${direction}`;
  // }
  // if (horizon) {
  //   url += `&horizon=${horizon}`;
  // }
  if (filters?.sector) {
    url += `&sector=${filters.sector}`;
  }

  return await get(url);
};
