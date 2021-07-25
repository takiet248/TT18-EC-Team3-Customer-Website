import axiosAuth from "./axiosAuth";

export const apiAuth = {
  login: (params: IParamsLogin) => {
    const url = "customer/log-in";
    return axiosAuth.post(url, params);
  },
};
