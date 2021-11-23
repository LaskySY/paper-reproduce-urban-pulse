import { createSlice } from "@reduxjs/toolkit";


const dataSlicer = createSlice({
  name: "data",
  initialState: {
    nycHighlight: [],
    sfHighlight: [],
    singleHighlight: -1,
  },
  reducers: {
    setHighlight: (state, action) => {
      state.nycHighlight = action.payload.nycHighlight
      state.sfHighlight = action.payload.sfHighlight
    },
    setSingleHighlight: (state, action) => { state.singleHighlight = action.payload }
  },
});

export const {
  setHighlight,
  setSingleHighlight
} = dataSlicer.actions

export default dataSlicer.reducer