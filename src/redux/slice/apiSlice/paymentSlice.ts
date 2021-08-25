import { doPaySuccess } from "./../../asyncAction/payment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TTnitialState = {
  isLoading: boolean;

  err: any;
};

const initialState = {
  isLoading: false,
  err: {},
} as TTnitialState;

export const paymentSlice = createSlice({
  name: "payment@",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //login
    builder.addCase(doPaySuccess.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      doPaySuccess.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
      }
    );
    builder.addCase(doPaySuccess.rejected, (state, action) => {
      state.isLoading = false;
      state.err = action.error;
    });
  },
});

const { reducer } = paymentSlice;
export default reducer;
