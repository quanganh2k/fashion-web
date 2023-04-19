import { useMutation } from "react-query";
import classificationServices from "../../services/classificationServices";

export const useUpdateClassify = () => {
  return useMutation(classificationServices.editClassify);
};