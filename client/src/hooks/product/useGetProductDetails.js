import { queryKeys } from "../../constants/queryKeys";
import { useQuery } from "react-query";
import productServices from "../../services/productServices";

export const useGetProductDetails = (params, options) => {
  return useQuery(
    [queryKeys.productDetails, params],
    (params) => productServices.getProductDetails(params),
    options
  );
};
