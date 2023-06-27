import { useQuery } from "react-query";
import { queryKeys } from "../../constants/queryKeys";
import classificationServices from "../../services/classificationServices";

export const useGetClassifyQuery = (params) => {
  return useQuery([queryKeys.classifyCustom, params], (params) =>
    classificationServices.getListClassification(params)
  );
};
