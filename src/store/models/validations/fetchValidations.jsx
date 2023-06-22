import {getValidations} from "../../api/validations.jsx";

const fetchValidations = async ({queryKey}) => {
  const {data}= queryKey[1];
  const response = await getValidations({"data": data});
  return response.data;
};

export default fetchValidations;