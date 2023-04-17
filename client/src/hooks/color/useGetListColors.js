import { queryKeys } from "../../constants/queryKeys";
import { useQuery } from "react-query";
import colorServices from "../../services/colorServices";

export const useGetListColors = (params) => {
    return useQuery([queryKeys.colors, params], (params) => colorServices.getListColors(params))
}