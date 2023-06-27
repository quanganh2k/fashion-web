import { useMutation } from "react-query";
import productServices from "../../services/productServices";

export const useGetProductsCustom = () => {
  return useMutation(productServices.getProductsCustom);
};
