import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiTutor } from "../../services/aixos";

export const doGetAllListTutor = createAsyncThunk("tutor@getAll", async () => {
  const result = await apiTutor.getAllListTutor();
  return result.data;
});

export const doGetOneTutor = createAsyncThunk(
  "tutor@getOne",
  async (params: { uid: string }) => {
    const result = await apiTutor.getOneTutor(params);
    return result.data;
  }
);
