import { useMutation } from "react-query";
import sizeServices from "../../services/sizeServices";

export const useAddSize = () => {
  return useMutation(sizeServices.addSize);
};
