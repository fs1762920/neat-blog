import axios from "axios";
import qs from "qs";
import { stores } from "@/stores";

const baseUrl = import.meta.env.VITE_BASE_URL;

axios.defaults.timeout = 30000;
// 请求拦截器
axios.interceptors.request.use(
  (config: any) => {
    if (stores.getState().token) {
      config.headers.satoken = "Bearer " + stores.getState().token
    }
    if (config.method === "get") {
      config.paramsSerializer = function (params: any) {
        return qs.stringify(params, { arrayFormat: "repeat" });
      };
    }
    return config;
  },

  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response: any) => {
    if (response.data.code === 405) {
      window.location.href = "/login";
    }
    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

//GET请求
export const $get = function (url: string, params: any) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url,
      params,
      baseURL: baseUrl,
    })
      .then((res: any) => {
        resolve(res.data);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

//POST请求
export const $post = function (url: string, param: any) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url,
      data: param ? param : "", //数据体
      baseURL: baseUrl,
    })
      .then((res: any) => {
        resolve(res.data);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};
