import { useQuery } from "react-query";
import classificationServices from "../../services/classificationServices";
import { queryKeys } from "../../constants/queryKeys";

export const useGetClassifyDetails = (params, options) => {
  return useQuery(
    [queryKeys.classifyDetails, params],
    (params) => classificationServices.getClassifyDetails(params),
    options
  );
};
