import { API_URL } from "../../constants/api.jsx";
import { get } from "../../services/apiClient.jsx";

export const getDetails = async (ticker) => {
  const token = JSON.parse(localStorage.getItem("token"));

  return await get(`${API_URL.DETAILS}?ticker${ticker}`, {
    headers: { Authorization: `Bearer ${token?.access}` }
  });
};

export const getPrice = async (ticker) => {
  const token = JSON.parse(localStorage.getItem("token"));

  return await get(`${API_URL.PRICE}${ticker}`, {
    headers: { Authorization: `Bearer ${token?.access}` }
  });
};