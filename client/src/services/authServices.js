import { LOGIN_URL, REFRESH_TOKEN, INFO_USER, LOGOUT_URL, REGISTER_URL } from "../constants/api";
import httpServices from "./httpServices";

const USER_LOCAL_STORAGE = `auth`;

class AuthServices {
  login(body) {
    return httpServices.post(LOGIN_URL, body, { withCredentials: true });
  }

  register(body) {
    return httpServices.post(REGISTER_URL, body)
  }

  refreshToken() {
    return httpServices.get(REFRESH_TOKEN, { withCredentials: true });
  }

  saveUserLocalStorage(data = {}) {
    localStorage.setItem(USER_LOCAL_STORAGE, JSON.stringify(data));
  }

  getUserLocalStorage() {
    const dataUser = localStorage.getItem(USER_LOCAL_STORAGE);
    if (!!dataUser) {
      return JSON.parse(dataUser);
    }
    return {};
  }

  clearUserLocalStorage() {
    localStorage.removeItem(USER_LOCAL_STORAGE);
  }

  getUser() {
    return httpServices.get(INFO_USER);
  }

  logOut() {
    return httpServices.get(LOGOUT_URL, { withCredentials: true })
  }
}

export default new AuthServices();
