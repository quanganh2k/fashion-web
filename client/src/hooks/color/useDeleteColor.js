import { useMutation } from "react-query";
import colorServices from "../../services/colorServices";

export const useDeleteColor = () => {
  return useMutation(colorServices.deleteColor);
};
