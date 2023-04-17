import { useMutation } from "react-query";
import productServices from "../../services/productServices";

export const useUpdateProduct = () => {
    return useMutation(productServices.updateProduct)
}