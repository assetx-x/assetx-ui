import { API_URL } from "../../constants/api.jsx"
import { post, put } from "../../services/apiClient.jsx";


export const getPredictions = async (data) => {
  const token = JSON.parse(localStorage.getItem("token"));
  return post(`${API_URL.PREDICTIONS}data/`, { data, headers: { Authorization: `Bearer ${token?.access}` } });
}

export const updatePredictions = async (data, id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  return put(`${API_URL.PREDICTIONS}${id}/`, { data, headers: { Authorization: `Bearer ${token?.access}` } });
}