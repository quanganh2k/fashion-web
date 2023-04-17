import httpServices from "./httpServices";
import { SIZE_URL } from "../constants/api";

class SizeServices {
    getListSizes(params) {
        return httpServices.get(SIZE_URL, {params: params.queryKey[1]})
    }
}

export default new SizeServices()