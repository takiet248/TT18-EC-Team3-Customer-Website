import {
  doGetRecommendedCourse,
  doGetUserInfo,
  doRegister,
} from "./../../asyncAction/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doLogin } from "../../asyncAction";

type TTnitialState = {
  isLoading: boolean;
  recommendedCourse: Array<IResGetCourse>;
  err: any;
};

const initialState = {
  isLoading: false,
  recommendedCourse: [],
  err: {},
} as TTnitialState;

export const authSlice = createSlice({
  name: "auth@",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //login
    builder.addCase(doLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      doLogin.fulfilled,
      (state, action: PayloadAction<IResLogin>) => {
        state.isLoading = false;
      }
    );
    builder.addCase(doLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.err = action.error;
    });
    //register
    builder.addCase(doRegister.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      doRegister.fulfilled,
      (state, action: PayloadAction<IResLogin>) => {
        state.isLoading = false;
      }
    );
    builder.addCase(doRegister.rejected, (state, action) => {
      state.isLoading = false;
      state.err = action.error;
    });
    //getinfo
    builder.addCase(doGetUserInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      doGetUserInfo.fulfilled,
      (state, action: PayloadAction<IResLogin>) => {
        state.isLoading = false;
      }
    );
    builder.addCase(doGetUserInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.err = action.error;
    });
   
    //get recommend course
    builder.addCase(doGetRecommendedCourse.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      doGetRecommendedCourse.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.recommendedCourse = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(doGetRecommendedCourse.rejected, (state, action) => {
      state.isLoading = false;
      state.err = action.error;
    });
  },
});

const { reducer } = authSlice;
export default reducer;
