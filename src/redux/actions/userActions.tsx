import axios from "axios";
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";

const baseURL = process.env.BACKEND_SERVER;

export const register =
  (
    name: string,
    email: string,
    password: string,
    phone: number,
    address: string,
    gender: boolean,
    dob: string
  ) =>
  async (dispatch: any) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
      payload: {},
    });
    try {
      const { data } = await axios.post(baseURL + "/api/customer/register", {
        name,
        email,
        password,
        phone,
        address,
        gender,
        dob,
      });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      //   dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
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
