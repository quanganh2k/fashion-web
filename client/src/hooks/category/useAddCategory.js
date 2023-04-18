import { useMutation } from "react-query";
import categoryServices from "../../services/categoryServices";

export const useAddCategory = () => {
    return useMutation(categoryServices.addCategory)
}