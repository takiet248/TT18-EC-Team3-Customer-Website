import { doGetUserInfo, doRegister } from "./../../asyncAction/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doLogin } from "../../asyncAction";

type TTnitialState = {
  userInfo: IResUserInfo;
  isLoading: boolean;
  err: any;
};

const initialState = {
  userInfo: {},
  isLoading: false,
  err: {},
} as TTnitialState;

export const authSlice = createSlice({
  name: "auth@",
  initialState: initialState,
  reducers: {
    doFakeLikeTutor(state, action: PayloadAction<{ _id?: string }>) {
      const newList = state.userInfo.like_tutor;
      newList?.push({ tid: action.payload._id });
      state.userInfo.like_tutor = newList;
    },
    doFakeUnlikeTutor(state, action: PayloadAction<{ _id?: string }>) {
      const remove = state.userInfo.like_tutor?.filter((item) => {
        if (item.tid === action.payload._id) {
          return false;
        }
        return true;
      });
      state.userInfo.like_tutor = remove;
    },
    doFakeLikeCourse(state, action: PayloadAction<{ _id?: string }>) {
      const newList = state.userInfo.like_course;
      newList?.push({ cid: action.payload._id });
      state.userInfo.like_course = newList;
    },
    doFakeUnlikeCourse(state, action: PayloadAction<{ _id?: string }>) {
      const remove = state.userInfo.like_course?.filter((item) => {
        if (item.cid === action.payload._id) {
          return false;
        }
        return true;
      });
      state.userInfo.like_course = remove;
    },
  },
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
      (state, action: PayloadAction<IResUserInfo>) => {
        state.userInfo = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(doGetUserInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.err = action.error;
    });
  },
});

const { reducer, actions } = authSlice;
export const {
  doFakeLikeTutor,
  doFakeUnlikeTutor,
  doFakeLikeCourse,
  doFakeUnlikeCourse,
} = actions;
export default reducer;
