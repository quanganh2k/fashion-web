import httpServices from "./httpServices";
import { CLASSIFICATION_URL } from "../constants/api";

class ClassificationServices {
  getListClassification(params) {
    return httpServices.get(CLASSIFICATION_URL, { params: params.queryKey[1] });
  }
}

export default new ClassificationServices();