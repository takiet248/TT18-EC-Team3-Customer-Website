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
  userInfo: () => {
    const url = baseURL + "user-me";
    return axiosAuth.get(url);
  },
  recommendTutor: (params: any) => {
    const url = baseURL + "recommend/tutor";
    return axiosAuth.post(url, params);
  },
  recommendCourse: (params: any) => {
    const url = baseURL + "recommend/course";
    return axiosAuth.post(url, params);
  },
};
