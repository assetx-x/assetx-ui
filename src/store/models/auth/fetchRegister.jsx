import { register } from "../../api/auth.jsx";

const fetchRegister = async ({ queryKey }) => {
  const response = await register(queryKey[1]);
  return await response.data;
};

export default fetchRegister;