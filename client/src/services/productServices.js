import httpServices from "./httpServices";
import { PRODUCT_URL } from "../constants/api";

class ProductServices {
  getListProducts(params) {
    return httpServices.get(PRODUCT_URL, { params: params.queryKey[1] });
  }
}

export default new ProductServices();
