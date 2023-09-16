import { API_URL } from "../../constants/api.jsx";
import { post } from "../../services/apiClient.jsx";

export const login = async (username, password) =>
  await post(`${API_URL.LOGIN}`, { data: { username, password } });

export const register = async (data) =>
  await post(`${API_URL.REGISTER}`, { data });
