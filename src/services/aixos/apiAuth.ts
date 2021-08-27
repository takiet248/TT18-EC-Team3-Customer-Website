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
  likeTutor: (params: { user: string | null; tid?: string }) => {
    const url = baseURL + "tutor/like";
    return axiosAuth.post(url, params);
  },
  unlikeTutor: (params: { user: string | null; tid?: string }) => {
    const url = baseURL + "tutor/unlike";
    return axiosAuth.post(url, params);
  },
  likeCourse: (params: { user: string | null; cid?: string }) => {
    const url = baseURL + "course/like";
    return axiosAuth.post(url, params);
  },
  unlikeCourse: (params: { user: string | null; cid?: string }) => {
    const url = baseURL + "course/unlike";
    return axiosAuth.post(url, params);
  },
  rateTutor: (params: { tid?: string; rate: number }) => {
    const url = baseURL + "tutor/rate";
    return axiosAuth.post(url, params);
  },
  rateCourse: (params: { cid?: string; rate: number }) => {
    const url = baseURL + "course/rate";
    return axiosAuth.post(url, params);
  },
};
