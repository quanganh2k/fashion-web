import { useQuery } from "react-query";
import sizeServices from "../../services/sizeServices";
import { queryKeys } from "../../constants/queryKeys";

export const useGetSizeDetails = (params, options) => {
  return useQuery(
    [queryKeys.sizeDetails, params],
    (params) => sizeServices.getSizeDetails(params),
    options
  );
};
