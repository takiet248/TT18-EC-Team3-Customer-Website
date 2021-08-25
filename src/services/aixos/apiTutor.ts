import { objToQuery } from "./../../helpers/common";
import axiosCommon from "./axiosCommon";

const baseURL = "tutor/";

export const apiTutor = {
  getAllListTutor: () => {
    const url = baseURL + "get-all";
    return axiosCommon.get(url);
  },
  getOneTutor: (params: { uid: string }) => {
    const url = baseURL + "get-one";
    return axiosCommon.get(url + objToQuery(params));
  },
  getTutorCourse: (params: { uid: string }) => {
    const url = baseURL + "course/get-all";
    return axiosCommon.get(url + objToQuery(params));
  },
};
