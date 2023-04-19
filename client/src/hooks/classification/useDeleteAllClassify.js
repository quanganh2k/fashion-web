import { useMutation } from "react-query";
import classificationServices from "../../services/classificationServices";

export const useDeleteAllClassify = () => {
  return useMutation(classificationServices.deleteAllClassify);
};