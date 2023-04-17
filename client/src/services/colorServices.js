import httpServices from "./httpServices";
import { COLOR_URL } from "../constants/api";

class ColorServices {
    getListColors(params) {
        return httpServices.get(COLOR_URL, {params: params.queryKey[1]})
    }
}

export default new ColorServices()