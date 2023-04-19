import { useQuery } from "react-query";
import colorServices from "../../services/colorServices";
import { queryKeys } from "../../constants/queryKeys";

export const useGetColorDetails = (params, options) => {
  return useQuery(
    [queryKeys.colorDetails, params],
    (params) => colorServices.getColorDetails(params),
    options
  );
};
