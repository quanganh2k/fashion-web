import httpServices from "./httpServices";
import { CLASSIFICATION_URL } from "../constants/api";

class ClassificationServices {
  getListClassification(params) {
    return httpServices.get(CLASSIFICATION_URL, { params: params.queryKey[1] });
  }
  getClassifyDetails(params) {
    return httpServices.get(`${CLASSIFICATION_URL}/${params.queryKey[1]}`);
  }
  addClassify(data) {
    return httpServices.post(CLASSIFICATION_URL, data);
  }
  editClassify(body) {
    const { id, data } = body;
    return httpServices.put(`${CLASSIFICATION_URL}/${id}`, data);
  }
  deleteClassify(id) {
    return httpServices.delete(`${CLASSIFICATION_URL}?id=${id}`);
  }
  deleteAllClassify() {
    return httpServices.delete(CLASSIFICATION_URL);
  }
}

export default new ClassificationServices();
