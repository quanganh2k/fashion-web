import httpServices from "./httpServices";
import { CATEGORY_URL } from "../constants/api";

class CategoryServices {
  getListCategories(params) {
    return httpServices.get(CATEGORY_URL, { params: params.queryKey[1] });
  }
}

export default new CategoryServices();
