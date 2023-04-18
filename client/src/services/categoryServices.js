import httpServices from "./httpServices";
import { CATEGORY_URL } from "../constants/api";

class CategoryServices {
  getListCategories(params) {
    return httpServices.get(CATEGORY_URL, { params: params.queryKey[1] });
  }
  getCategoryDetails(params) {
    return httpServices.get(`${CATEGORY_URL}/${params.queryKey[1]}`)
  } 
  addCategory(data) {
    return httpServices.post(CATEGORY_URL,data)
  }
  updateCategory(body) {
    const {id, data} =body
    return httpServices.put(`${CATEGORY_URL}/${id}`,data)
  }
  deleteCategory(id) {
    return httpServices.delete(`${CATEGORY_URL}?id=${id}`)
  }
  deleteAllCategories() {
    return httpServices.delete(CATEGORY_URL)
  }
}

export default new CategoryServices();
