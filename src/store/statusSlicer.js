import { createSlice } from "@reduxjs/toolkit";

const statusSlice = createSlice({
  name: "status",
  initialState: {
    type: 'HOUR',
    date: 0
  },
  reducers: {
    setType: (state, action) => { state.type = action.payload },
    setDate: (state, action) => { state.date = action.payload },
  },
});

export const {
  setType,
  setDate
} = statusSlice.actions

export default statusSlice.reducer