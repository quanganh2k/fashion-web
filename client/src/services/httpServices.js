import axios from "axios";
import isEmpty from "lodash/isEmpty";

class Services {
  axios;

  constructor() {
    this.axios = axios;
    this.axios.defaults.withCredentials = false;

    const { accessToken } = this.getToken() || {};
    // if (!isEmpty(accessToken)) {
    //   this.attachTokenToHeader(accessToken);
    // }

    //! Interceptor request
    this.axios.interceptors.request.use(
      (config) => {
        if (config && config.headers) {
          // Do something before request is sent
          const { accessToken } = this.getToken() || {};
          config.headers[`Authorization`] = `Bearer ${accessToken}`;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    //! Interceptor response
    this.axios.interceptors.response.use(
      function (config) {
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }

  attachTokenToHeader(token) {
    this.axios.interceptors.request.use(
      function (config) {
        if (config && config.headers) {
          // Do something before request is sent
          config.headers[`Authorization`] = `Bearer ${token}`;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }

  get(url, config) {
    return this.axios.get(url, config);
  }

  post(url, data, config) {
    return this.axios.post(url, data, config);
  }

  delete(url, config) {
    return this.axios.delete(url, config);
  }

  put(url, data, config) {
    return this.axios.put(url, data, config);
  }

  patch(url, data, config) {
    return this.axios.patch(url, data, config);
  }

  getToken() {
    if (typeof localStorage == "undefined") return { accessToken: "" };
    const dataUser = localStorage.getItem("auth");
    if (!!dataUser) {
      return JSON.parse(dataUser);
    }
    return { accessToken: "" };
  }
  postFormData(url, data) {
    return this.axios.post(url, data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  }
}

export default new Services();
