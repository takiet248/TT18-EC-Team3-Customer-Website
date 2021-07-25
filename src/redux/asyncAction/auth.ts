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
