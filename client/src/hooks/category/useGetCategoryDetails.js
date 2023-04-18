import { useQuery } from "react-query";
import categoryServices from "../../services/categoryServices";
import { queryKeys } from "../../constants/queryKeys";

export const useGetCategoryDetails = (params, options) => {
    return useQuery([queryKeys.categoryDetails,params], (params) => categoryServices.getCategoryDetails(params),options)
}