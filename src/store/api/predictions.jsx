import { API_URL } from "../../constants/api.jsx"
import { post } from "../../services/apiClient.jsx";

export const getPredictions = async (data) =>
  post(`${API_URL.PREDICTIONS}`,{ data });