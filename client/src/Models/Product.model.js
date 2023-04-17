import { cloneDeep, isArray, isObject } from "lodash";

class ProductModel {
  static parseResponse(data) {
    if (!data || !isArray(data)) return [];
    return cloneDeep(data).map((item) => {
      if (!isArray(item?.sizeColor)) return;
      item.sizeColor = item?.sizeColor.map((elm) => {
        return {
          ...elm,
          color: item?.colorDetails.find((color) => color._id === elm.color),
          size: item?.sizeDetails.find((size) => size?._id === elm.size),
        };
      });
      return item;
    });
  }
}

export default ProductModel;
