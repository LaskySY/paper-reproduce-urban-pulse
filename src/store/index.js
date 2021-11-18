import { configureStore } from "@reduxjs/toolkit";
import statusSlice from "./statusSlicer";

export default configureStore({
  reducer: {
    status: statusSlice,
  },
});