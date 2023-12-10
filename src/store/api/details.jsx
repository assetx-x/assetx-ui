import { API_URL } from "../../constants/api.jsx";
import { get, post } from "../../services/apiClient.jsx";

export const getDetails = async (ticker) => {
  const token = JSON.parse(localStorage.getItem("token"));

  return await get(`${API_URL.DETAILS}?ticker=${ticker}`, {
    headers: { Authorization: `Bearer ${token?.access}` },
  });
};

export const getDetailsV2 = async (ticker) => {
  const token = JSON.parse(localStorage.getItem("token"));

  return await get(`${API_URL.DETAILS_V2}?ticker=${ticker}`, {
    headers: { Authorization: `Bearer ${token?.access}` },
  });
};

export const getDeepInsightDetails = async (data) =>
  await post(`${API_URL.DEEP_INSIGHTS}`, { data });

export const getPrice = async (ticker) => {
  const token = JSON.parse(localStorage.getItem("token"));

  return await get(`${API_URL.PRICE}${ticker}`, {
    headers: { Authorization: `Bearer ${token?.access}` },
  });
};

export const getSearch = async (data) => {
  return await get(`${API_URL.TICKER_SEARCH}?symbol=${data}`);
};
export const getSearchGTP = async (search, ticker) => {
  return await get(`${API_URL.GTP_SEARCH}?ticker=${ticker}&prompt=${search}`);
};

export const getFactorHack = async (factor, ticker) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const optimizationsParams =
    localStorage.getItem("optimizationsParams") ?? "{}";
  return await post(`${API_URL.FACTOR_HACK}data/`, {
    data: {
      ...JSON.parse(optimizationsParams),
    },
    params: {
      factor,
      ticker,
    },
    headers: { Authorization: `Bearer ${token?.access}` },
  });
};
