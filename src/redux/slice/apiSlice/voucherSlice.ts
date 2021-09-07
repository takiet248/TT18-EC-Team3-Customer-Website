import { doApplyVoucher } from "./../../asyncAction/voucher";
import { createSlice } from "@reduxjs/toolkit";

type TTnitialState = {
  isLoading: boolean;
  err: any;
};

const initialState = {
  isLoading: false,
  err: {},
} as TTnitialState;

export const voucherSlice = createSlice({
  name: "voucher@",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get all tutors
    builder.addCase(doApplyVoucher.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(doApplyVoucher.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(doApplyVoucher.rejected, (state, action) => {
      state.isLoading = false;
      state.err = action.error;
    });
  },
});

const { reducer } = voucherSlice;
export default reducer;
