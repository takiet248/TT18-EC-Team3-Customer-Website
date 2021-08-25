import { doGetTutorCourse } from "./../../asyncAction/tutor";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doGetAllListTutor, doGetOneTutor } from "../../asyncAction";

type TTnitialState = {
  listAllTutor: Array<IResTutor>;
  tutor: IResOneTutor;
  tutorCourse: Array<IResGetCourse>;
  isLoading: boolean;
  err: any;
};

const initialState = {
  listAllTutor: [],
  tutor: {},
  tutorCourse: [],
  isLoading: false,
  err: {},
} as TTnitialState;

export const slice = createSlice({
  name: "tutor@",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get all
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
    //get one
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
    // get course
    builder.addCase(doGetTutorCourse.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      doGetTutorCourse.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.tutorCourse = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(doGetTutorCourse.rejected, (state, action) => {
      state.isLoading = false;
      state.err = action.error;
    });
  },
});

const { reducer } = slice;
export default reducer;
