import { useMutation } from "react-query";
import classificationServices from "../../services/classificationServices";

export const useDeleteClassify = () => {
  return useMutation(classificationServices.deleteClassify);
};