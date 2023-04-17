import { queryKeys } from "../../constants/queryKeys";
import { useQuery } from "react-query";
import sizeServices from "../../services/sizeServices";

export const useGetListSizes = (params) => {
    return useQuery([queryKeys.sizes, params], (params) => sizeServices.getListSizes(params))
}