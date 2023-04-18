import { useMutation } from "react-query";
import sizeServices from "../../services/sizeServices";

export const useDeleteAllSizes = () => {
  return useMutation(sizeServices.deleteAllSizes);
};
