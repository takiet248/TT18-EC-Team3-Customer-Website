import axios from "axios";
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from "../constants/userConstants";

const baseURL = process.env.REACT_APP_BACKEND_SERVER;
//register
export const doRegister =
  (
    name: string,
    email: string,
    password: string,
    phone: number,
    address: string,
    gender: boolean,
    DOB: string
  ) =>
  async (dispatch: any) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
      payload: { name, email, password, phone, address, gender, DOB },
    });
    try {
      const { data } = await axios.post(baseURL + "api/customer/register", {
        name,
        email,
        password,
        phone,
        address,
        gender,
        DOB,
      });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem("session", JSON.stringify(data.session));
      localStorage.setItem("access", JSON.stringify(data.access));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
//sign in
export const doLogin =
  (email: string, password: string) => async (dispatch: any) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
      const { data } = await axios.post(baseURL + "api/customer/log-in", {
        email,
        password,
      });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem("session", JSON.stringify(data.session));
      localStorage.setItem("access", JSON.stringify(data.access));
    } catch (error) {
      dispatch({
        type: USER_SIGNIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
//log out
export const doLogOut = () => (dispatch: any) => {
  localStorage.removeItem("session");
  localStorage.removeItem("access");
  window.location.replace('/login');
  dispatch({ type: USER_SIGNOUT });
};
