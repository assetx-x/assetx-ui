import { API_URL } from "../../constants/api.jsx";
import { post } from "../../services/apiClient.jsx";

export const getValidations = async (data) => {
  const token = JSON.parse(localStorage.getItem("token"));
  return post(`${API_URL.VALIDATIONS}`,
    {
      data,
      headers: { Authorization: `Bearer ${token?.access}` }
    });
}