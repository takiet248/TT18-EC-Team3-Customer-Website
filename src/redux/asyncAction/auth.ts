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

export const doLikeTutor = createAsyncThunk(
  "auth@post/LikeTutor",
  async (params: { user: string | null; tid?: string }) => {
    const result = await apiAuth.likeTutor(params);
    return result.data;
  }
);

export const doUnlikeTutor = createAsyncThunk(
  "auth@post/UnlikeTutor",
  async (params: { user: string | null; tid?: string }) => {
    const result = await apiAuth.unlikeTutor(params);
    return result.data;
  }
);

export const doLikeCourse = createAsyncThunk(
  "auth@post/LikeCourse",
  async (params: { user: string | null; cid?: string }) => {
    const result = await apiAuth.likeCourse(params);
    return result.data;
  }
);

export const doUnlikeCourse = createAsyncThunk(
  "auth@post/UnlikeCourse",
  async (params: { user: string | null; cid?: string }) => {
    const result = await apiAuth.unlikeCourse(params);
    return result.data;
  }
);
