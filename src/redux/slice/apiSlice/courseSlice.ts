import { doGetTutorCourse } from "./../../asyncAction/tutor";
import { doGetRecommendedCourse } from "./../../asyncAction/auth";
import { doGetAllListCourse, doGetOneCourse } from "./../../asyncAction/course";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doLikeCourse, doUnlikeCourse } from "../../asyncAction";

type TTnitialState = {
  listAllCourse: Array<IResGetCourse>;
  recommendedCourse: Array<IResGetCourse>;
  tutorCourse: Array<IResGetCourse>;
  oneCourse: IResGetCourse;
  isLoading: boolean;
  err: any;
};

const initialState = {
  listAllCourse: [],
  recommendedCourse: [],
  tutorCourse: [],
  oneCourse: {},
  isLoading: false,
  err: {},
} as TTnitialState;

export const courseSlice = createSlice({
  name: "course@",
  initialState: initialState,
  reducers: {
    doFakeLikeUnlikeListCourse(
      state,
      action: PayloadAction<{ _id?: string; noLike: number }>
    ) {
      //list tutor
      const newList = state.listAllCourse.map((item, i) => {
        if (item._id === action.payload._id) {
          return {
            ...item,
            noLike: action.payload.noLike,
          };
        }
        return item;
      });
      state.listAllCourse = newList;
      //list tutor
      const newRecommendedList = state.recommendedCourse.map((item, i) => {
        if (item._id === action.payload._id) {
          return {
            ...item,
            noLike: action.payload.noLike,
          };
        }
        return item;
      });
      state.recommendedCourse = newRecommendedList;
      //list tutor
      const newTutorCourse = state.tutorCourse.map((item, i) => {
        if (item._id === action.payload._id) {
          return {
            ...item,
            noLike: action.payload.noLike,
          };
        }
        return item;
      });
      state.tutorCourse = newTutorCourse;
    },
    doFakeLikeUnlikeCourse(state, action: PayloadAction<{ noLike?: number }>) {
      const newTutor = state.oneCourse;
      newTutor.noLike = action.payload.noLike;
      state.oneCourse = newTutor;
    },
  },
  extraReducers: (builder) => {
    //get all
    builder.addCase(doGetAllListCourse.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      doGetAllListCourse.fulfilled,
      (state, action: PayloadAction<IResGetListAllCourse>) => {
        state.listAllCourse = action.payload.result;
        state.isLoading = false;
      }
    );
    builder.addCase(doGetAllListCourse.rejected, (state, action) => {
      state.isLoading = false;
      state.err = action.error;
    });
    //get one
    builder.addCase(doGetOneCourse.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      doGetOneCourse.fulfilled,
      (state, action: PayloadAction<IResGetOneCourse>) => {
        state.oneCourse = action.payload.course;
        state.isLoading = false;
      }
    );
    builder.addCase(doGetOneCourse.rejected, (state, action) => {
      state.isLoading = false;
      state.err = action.error;
    });
    // like course
    builder.addCase(doLikeCourse.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      doLikeCourse.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
      }
    );
    builder.addCase(doLikeCourse.rejected, (state, action) => {
      state.isLoading = false;
      state.err = action.error;
    });
    // unlike course
    builder.addCase(doUnlikeCourse.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      doUnlikeCourse.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
      }
    );
    builder.addCase(doUnlikeCourse.rejected, (state, action) => {
      state.isLoading = false;
      state.err = action.error;
    });
    //get recommend course
    builder.addCase(doGetRecommendedCourse.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      doGetRecommendedCourse.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.recommendedCourse = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(doGetRecommendedCourse.rejected, (state, action) => {
      state.isLoading = false;
      state.err = action.error;
    });
    // get course of a tutor
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

const { reducer, actions } = courseSlice;
export const { doFakeLikeUnlikeListCourse, doFakeLikeUnlikeCourse } = actions;
export default reducer;
