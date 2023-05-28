import { API_URL } from "../../constants/api.jsx"
import { get } from "../../services/apiClient.jsx";

export const getValidations = async (tickers, values) =>
  get(`${API_URL.VALIDATIONS}/${tickers}/${values}`);