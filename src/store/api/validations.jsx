import { API_URL } from "../../constants/api.jsx"
import { post } from "../../services/apiClient.jsx";

export const getValidations = async (data) =>
  post(`${API_URL.VALIDATIONS}`, { data });