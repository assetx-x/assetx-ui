import { API_URL } from "../../constants/api"
import { get } from "../../services/apiClient";

export const getValidations = async (tickers, values) =>
  get(`${API_URL.VALIDATIONS}/${tickers}/${values}`);