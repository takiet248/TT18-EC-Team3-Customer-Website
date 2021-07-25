import axiosAuth from "./axiosAuth";

const baseURL = "customer/";
export const apiAuth = {
  login: (params: IParamsLogin) => {
    const url = baseURL + "log-in";
    return axiosAuth.post(url, params);
  },
  register: (params: IParamsRegister) => {
    const url = baseURL + "register";
    return axiosAuth.post(url, params);
  },
};
