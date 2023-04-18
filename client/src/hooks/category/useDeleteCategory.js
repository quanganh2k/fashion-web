import { useMutation } from "react-query";
import categoryServices from "../../services/categoryServices";

export const useDeleteCategory = () => {
    return useMutation(categoryServices.deleteCategory)
}