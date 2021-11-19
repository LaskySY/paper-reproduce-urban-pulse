import { createSlice } from "@reduxjs/toolkit";

const statusSlice = createSlice({
  name: "status",
  initialState: {
    mode: 'normal',
    type: 'HOUR',
    date: 0
  },
  reducers: {
    setMode: (state, action) => { state.mode = action.payload },
    setType: (state, action) => { state.type = action.payload },
    setDate: (state, action) => { state.date = action.payload },
  },
});

export const {
  setMode,
  setType,
  setDate
} = statusSlice.actions

export default statusSlice.reducer