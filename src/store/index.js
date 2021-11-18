import { configureStore } from "@reduxjs/toolkit";
import dataSlicer from "./dataSlicer";
import statusSlice from "./statusSlicer";

export default configureStore({
  reducer: {
    data: dataSlicer,
    status: statusSlice,
  },
});