import { useMutation } from "react-query";
import classificationServices from "../../services/classificationServices";

export const useAddClassify = () => {
  return useMutation(classificationServices.addClassify);
};
