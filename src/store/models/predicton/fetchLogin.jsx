import { login } from "../../api/auth.jsx";

const fetchLogin = async ({queryKey}) => {
  const { username, password }= queryKey[1];
  const response = await login(username, password);
  console.log({ response })
  return await response.data;
};

export default fetchLogin;