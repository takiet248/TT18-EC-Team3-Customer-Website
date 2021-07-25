import { doRegister } from "./../../asyncAction/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doLogin } from "../../asyncAction";

type TTnitialState = {
  isLoading: boolean;
  err: any;
};

const initialState = {
  isLoading: false,
  err: {},
} as TTnitialState;

export const authSlice = createSlice({
  name: "auth@",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
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
  },
});

const { reducer } = authSlice;
export default reducer;
