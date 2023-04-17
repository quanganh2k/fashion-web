import httpServices from "./httpServices";
import { PRODUCT_URL } from "../constants/api";

class ProductServices {
  getListProducts(params) {
    return httpServices.get(PRODUCT_URL, { params: params.queryKey[1] });
  }

  getProductDetails(params) {
    return httpServices.get(`${PRODUCT_URL}/${params.queryKey[1]}`);
  }

  addProduct(data) {
    return httpServices.post(PRODUCT_URL, data);
  }

  updateProduct(body) {
    const { id, data } = body;
    return httpServices.put(`${PRODUCT_URL}/${id}`, data);
  }

  deleteProduct(id) {
    return httpServices.delete(`${PRODUCT_URL}?listId[]=${id}`);
  }
  deleteAllProducts() {
    return httpServices.delete(PRODUCT_URL)
  }
}

export default new ProductServices();
