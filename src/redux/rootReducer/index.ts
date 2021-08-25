import paymentSlice from "./../slice/apiSlice/paymentSlice";
import courseSlice from "./../slice/apiSlice/courseSlice";
import { combineReducers } from "@reduxjs/toolkit";

import modalSlice from "../slice/appSlice/modalSlice";
import auth from "../slice/apiSlice/authSlice";
import tutorSlice from "../slice/apiSlice/tutorSlice";

export const rootReducer = combineReducers({
  modalSlice,
  auth,
  tutorSlice,
  courseSlice,
  paymentSlice,
});
export type RootState = ReturnType<typeof rootReducer>;
