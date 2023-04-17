import { queryKeys } from "../../constants/queryKeys";
import { useQuery } from "react-query";
import categoryServices from "../../services/categoryServices";

export const useGetListCategories = (params) => {
    return useQuery([queryKeys.categories, params], (params) => categoryServices.getListCategories(params))
}