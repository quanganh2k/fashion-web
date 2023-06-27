import { useInfiniteQuery } from "react-query";
import productServices from "../../services/productServices";
import { queryKeys } from "../../constants/queryKeys";

export const useInfiniteScroll = (params, options) => {
  return useInfiniteQuery(
    [queryKeys.productsInfinite],
    () => productServices.getInfiniteList(params),
    options
  );
};
