import { apiPayment } from "./../../services/aixos/apiPayment";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const doPaySuccess = createAsyncThunk(
  "payment@success",
  async (params: any) => {
    const result = await apiPayment.paySuccess(params);
    return result.data;
  }
);
