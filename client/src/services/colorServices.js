import httpServices from "./httpServices";
import { COLOR_URL } from "../constants/api";

class ColorServices {
  getListColors(params) {
    return httpServices.get(COLOR_URL, { params: params.queryKey[1] });
  }
  getColorDetails(params) {
    return httpServices.get(`${COLOR_URL}/${params.queryKey[1]}`);
  }
  addColor(data) {
    return httpServices.post(COLOR_URL, data);
  }
  editColor(body) {
    const { id, data } = body;
    return httpServices.put(`${COLOR_URL}/${id}`, data);
  }
  deleteColor(id) {
    return httpServices.delete(`${COLOR_URL}?id=${id}`);
  }
  deleteAllColors() {
    return httpServices.delete(COLOR_URL);
  }
}

export default new ColorServices();
