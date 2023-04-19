import { useMutation } from "react-query";
import colorServices from "../../services/colorServices";

export const useAddColor = () => {
  return useMutation(colorServices.addColor);
};
