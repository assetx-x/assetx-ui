import { API_URL } from "../../constants/api"
import { get } from "../../services/apiClient";

export const getDetails = async (ticker) =>
  get(`${API_URL.DETAILS}/${ticker}`);