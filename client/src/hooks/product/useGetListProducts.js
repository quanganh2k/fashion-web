import { queryKeys } from "../../constants/queryKeys";
import { useQuery } from 'react-query'
import productServices from "../../services/productServices";

export const useGetListProducts = (params) => {
    return useQuery([queryKeys.products, params], (params) => productServices.getListProducts(params))
}