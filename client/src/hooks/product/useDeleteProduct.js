import { useMutation } from "react-query";
import productServices from "../../services/productServices";

export const useDeleteProduct = () => {
    return useMutation(productServices.deleteProduct)
}