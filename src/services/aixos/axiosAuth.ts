import axios, { AxiosError, AxiosResponse } from "axios";
import { EToken, EUser } from "../../constants";

const baseURL = process.env.REACT_APP_BACKEND_SERVER;
// const baseURL = "https://amitu-backend.herokuapp.com/";

const token = localStorage.getItem(EToken.accessToken);
const userid = localStorage.getItem(EUser.userid);

const axiosAuth = axios.create({
  baseURL: baseURL + "api/",
  headers: {
    "content-type": "application/json",
    Authorization: token,
    uid: userid,
  },
});
axiosAuth.interceptors.response.use(
  (res: AxiosResponse<{ content: any; message: string; result: number }>) => {
    // if (res.data.result === 0) {
    //   window.location.replace('/dang-nhap');
    // }
    return res;
  },
  (err: AxiosError) => {
    // if (err.response?.status === 401) {
    //   window.location.replace('/dang-nhap');
    // }
    throw err;
  }
);
export default axiosAuth;
