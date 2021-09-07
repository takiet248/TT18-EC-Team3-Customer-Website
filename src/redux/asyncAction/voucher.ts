import { apiVoucher } from "./../../services/aixos/apiVoucher";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const doApplyVoucher = createAsyncThunk(
  "voucher@apply",
  async (params: { code?: string }) => {
    const result = await apiVoucher.applyVoucher(params);
    return result.data;
  }
);
