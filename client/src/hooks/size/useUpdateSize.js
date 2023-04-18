import { useMutation } from "react-query";
import sizeServices from "../../services/sizeServices";

export const useUpdateSize = () => {
  return useMutation(sizeServices.updateSize);
};
