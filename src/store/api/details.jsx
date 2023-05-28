import { API_URL } from "../../constants/api.jsx"
import { get } from "../../services/apiClient.jsx";

export const getDetails = async (ticker) =>
  await get(`${API_URL.DETAILS}/${ticker}`);