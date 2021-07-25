import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doGetAllListTutor, doGetOneTutor } from "../../asyncAction";

type TTnitialState = {
  listAllTutor: Array<IResTutor>;
  tutor: IResOneTutor;
  isLoading: boolean;
  err: any;
};

const initialState = {
  listAllTutor: [],
  tutor: {},
  isLoading: false,
  err: {},
} as TTnitialState;

export const slice = createSlice({
  name: "tutor@",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doGetAllListTutor.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      doGetAllListTutor.fulfilled,
      (state, action: PayloadAction<IResGetListAllTutor>) => {
        state.listAllTutor = action.payload.result;
        state.isLoading = false;
      }
    );
    builder.addCase(doGetAllListTutor.rejected, (state, action) => {
      state.isLoading = false;
      state.err = action.error;
    });
    builder.addCase(doGetOneTutor.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      doGetOneTutor.fulfilled,
      (state, action: PayloadAction<IResGetOneTutor>) => {
        state.tutor = action.payload.tutor;
        state.isLoading = false;
      }
    );
    builder.addCase(doGetOneTutor.rejected, (state, action) => {
      state.isLoading = false;
      state.err = action.error;
    });
  },
});

const { reducer } = slice;
export default reducer;
