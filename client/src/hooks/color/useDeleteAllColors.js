import { useMutation } from "react-query";
import colorServices from "../../services/colorServices";

export const useDeleteAllColors = () => {
  return useMutation(colorServices.deleteAllColors);
};
