import axiosCommon from "./axiosCommon";

const baseURL = "customer/voucher/";

export const apiVoucher = {
  applyVoucher: (params: { code?: string }) => {
    const url = baseURL + "apply";
    return axiosCommon.post(url, params);
  },
};
