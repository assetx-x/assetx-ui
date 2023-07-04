import { API_URL } from "../../constants/api.jsx"
import { post } from "../../services/apiClient.jsx";


export const getPredictions = async (data) => {
  const token = JSON.parse(localStorage.getItem("token"));
  return post(`${API_URL.PREDICTIONS}`, { data, headers: { Authorization: `Bearer ${token?.access}` } });
}