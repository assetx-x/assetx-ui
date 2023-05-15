import { API_URL } from "../../constants/api"
import { get } from "../../services/apiClient";

export const getPredictions = async (tickers, values, timeScope = '1D', type='max_sharpe') =>
  get(`${API_URL.PREDICTIONS}/${timeScope}/${type}/${tickers}/${values}`);