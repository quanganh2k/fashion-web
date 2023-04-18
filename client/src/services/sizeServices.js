import httpServices from "./httpServices";
import { SIZE_URL } from "../constants/api";

class SizeServices {
  getListSizes(params) {
    return httpServices.get(SIZE_URL, { params: params.queryKey[1] });
  }
  getSizeDetails(params) {
    return httpServices.get(`${SIZE_URL}/${params.queryKey[1]}`);
  }
  addSize(data) {
    return httpServices.post(SIZE_URL, data);
  }
  updateSize(body) {
    const { id, data } = body;
    return httpServices.put(`${SIZE_URL}/${id}`, data);
  }
  deleteSize(id) {
    return httpServices.delete(`${SIZE_URL}?id=${id}`);
  }
  deleteAllSizes() {
    return httpServices.delete(SIZE_URL);
  }
}

export default new SizeServices();
