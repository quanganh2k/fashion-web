import { useMutation } from "react-query";
import uploadServices from "../../services/uploadServices";

export const useUploadImage = () => {
    return useMutation(uploadServices.uploadImage)
}