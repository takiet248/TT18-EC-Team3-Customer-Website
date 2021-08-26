import {
  doGetRecommendedTutor,
  doLikeTutor,
  doUnlikeTutor,
} from "./../../asyncAction/auth";
import { doGetTutorCourse } from "./../../asyncAction/tutor";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doGetAllListTutor, doGetOneTutor } from "../../asyncAction";

type TTnitialState = {
  listAllTutor: Array<IResTutor>;
  tutor: IResOneTutor;
  tutorCourse: Array<IResGetCourse>;
  recommendedTutor: Array<IResOneTutor>;
  isLoading: boolean;
  err: any;
};

const initialState = {
  listAllTutor: [],
  tutor: {},
  tutorCourse: [],
  recommendedTutor: [],

  isLoading: false,
  err: {},
} as TTnitialState;

export const slice = createSlice({
  name: "tutor@",
  initialState: initialState,
  reducers: {
    doFakeLikeUnlikeListTutor(
      state,
      action: PayloadAction<{ _id?: string; noLike: number }>
    ) {
      //list tutor
      const newList = state.listAllTutor.map((item, i) => {
        if (item._id === action.payload._id) {
          return {
            ...item,
            noLike: action.payload.noLike,
          };
        }
        return item;
      });
      state.listAllTutor = newList;
      //list tutor
      const newRecommendedList = state.recommendedTutor.map((item, i) => {
        if (item._id === action.payload._id) {
          return {
            ...item,
            noLike: action.payload.noLike,
          };
        }
        return item;
      });
      state.recommendedTutor = newRecommendedList;
    },
    doFakeLikeUnlikeTutor(state, action: PayloadAction<{ noLike?: number }>) {
      const newTutor = state.tutor;
      newTutor.noLike = action.payload.noLike;
      state.tutor = newTutor;
    },
  },
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
    // like Tutor
    builder.addCase(doLikeTutor.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      doLikeTutor.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        const newList = state.listAllTutor.map((item, i) => {
          if (item._id === action.payload._id) {
            return {
              ...item,
              noLike: 1,
            };
          }
          return item;
        });
        state.listAllTutor = newList;
      }
    );
    builder.addCase(doLikeTutor.rejected, (state, action) => {
      state.isLoading = false;
      state.err = action.error;
    });
    // unlike Tutor
    builder.addCase(doUnlikeTutor.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      doUnlikeTutor.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
      }
    );
    builder.addCase(doUnlikeTutor.rejected, (state, action) => {
      state.isLoading = false;
      state.err = action.error;
    });
    //get recommend tutor
    builder.addCase(doGetRecommendedTutor.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      doGetRecommendedTutor.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.recommendedTutor = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(doGetRecommendedTutor.rejected, (state, action) => {
      state.isLoading = false;
      state.err = action.error;
    });
  },
});

const { actions, reducer } = slice;
export const { doFakeLikeUnlikeListTutor, doFakeLikeUnlikeTutor } = actions;
export default reducer;
