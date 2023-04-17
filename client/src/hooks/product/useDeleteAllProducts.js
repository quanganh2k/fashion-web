import { useMutation } from "react-query";
import productServices from "../../services/productServices";

export const useDeleteAllProducts = () => {
    return useMutation(productServices.deleteAllProducts)
} 