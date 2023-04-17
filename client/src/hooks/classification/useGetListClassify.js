import { useQuery } from "react-query";
import classificationServices from "../../services/classificationServices";
import { queryKeys } from "../../constants/queryKeys";


export const useGetListClassify = (params) => {
    return useQuery([queryKeys.classify, params], (params) => classificationServices.getListClassification(params))
}