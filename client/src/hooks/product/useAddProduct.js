import { useMutation } from "react-query";
import productServices from "../../services/productServices";

export const useAddProduct = () => {
    return useMutation(productServices.addProduct)
}