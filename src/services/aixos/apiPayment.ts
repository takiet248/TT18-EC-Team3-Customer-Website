import axiosCommon from "./axiosCommon";

const baseURL = "payment/";

export const apiPayment = {
  paySuccess: (params: any) => {
    const url = baseURL + "success";
    return axiosCommon.post(url, params);
  },
};
