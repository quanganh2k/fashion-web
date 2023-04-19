import { useMutation } from "react-query";
import colorServices from "../../services/colorServices";

export const useUpdateColor = () => {
  return useMutation(colorServices.editColor);
};
