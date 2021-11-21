import { createSlice } from "@reduxjs/toolkit";
import { MODE_MAPPING, DATETYPE_MAPPING } from '../components/constant'


const statusSlice = createSlice({
  name: "status",
  initialState: {
    mode: MODE_MAPPING.NORMAL,
    type: DATETYPE_MAPPING.HOUR,
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