import { useMutation } from "react-query";
import categoryServices from "../../services/categoryServices";

export const useUpdateCategory = () => {
    return useMutation(categoryServices.updateCategory)
}