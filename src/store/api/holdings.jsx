import { API_URL } from "../../constants/api.jsx";
import { get } from "../../services/apiClient.jsx";

export const getHoldings = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return get(`${API_URL.HOLDINGS_V3}`, {
    headers: { Authorization: `Bearer ${token?.access}` },
  });
};
export const getHoldingsById = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));

  return get(`${API_URL.HOLDINGS_V3}${id}`, {
    headers: { Authorization: `Bearer ${token?.access}` },
  });
};
