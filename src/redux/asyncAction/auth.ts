import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiAuth } from "../../services/aixos";

export const doLogin = createAsyncThunk(
  "auth@post/Login",
  async (params: IParamsLogin) => {
    const result = await apiAuth.login(params);
    return result.data;
  }
);

export const doRegister = createAsyncThunk(
  "auth@post/Register",
  async (params: IParamsRegister) => {
    const result = await apiAuth.register(params);
    return result.data;
  }
);

export const doGetUserInfo = createAsyncThunk("auth@post/GetInfo", async () => {
  const result = await apiAuth.userInfo();
  return result.data;
});

export const doGetRecommendedTutor = createAsyncThunk(
  "auth@post/GetRecommenedTutor",
  async (params: any) => {
    const result = await apiAuth.recommendTutor(params);
    return result.data;
  }
);

export const doGetRecommendedCourse = createAsyncThunk(
  "auth@post/GetRecommenedCourse",
  async (params: any) => {
    const result = await apiAuth.recommendCourse(params);
    return result.data;
  }
);
