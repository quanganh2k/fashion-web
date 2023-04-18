import { useMutation } from "react-query";
import sizeServices from "../../services/sizeServices";

export const useDeleteSize = () => {
  return useMutation(sizeServices.deleteSize);
};
