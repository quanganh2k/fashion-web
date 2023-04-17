import { queryKeys } from "../../constants/queryKeys";
import { useQuery } from "react-query";
import productServices from "../../services/productServices";
import DashboardModel from "../../Models/Product.model";
import { isEmpty } from "lodash";

export const useGetListProducts = (params) => {
  return useQuery([queryKeys.products, params], (params) =>
    productServices.getListProducts(params)
  );
};
