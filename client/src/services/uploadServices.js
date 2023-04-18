import httpServices from "./httpServices";
import { UPLOAD_URL } from "../constants/api"

class UploadServices {
    uploadImage(data) {
        return httpServices.post(UPLOAD_URL,data)
    }

}

export default new UploadServices()