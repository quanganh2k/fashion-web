import { useMutation } from "react-query";
import categoryServices from "../../services/categoryServices";

export const useDeleteAllCategories = () => {
    return useMutation(categoryServices.deleteAllCategories)
}