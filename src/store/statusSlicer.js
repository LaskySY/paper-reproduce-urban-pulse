import { createSlice } from "@reduxjs/toolkit";
import { TIME_MAPPING } from '../constant'

const statusSlice = createSlice({
  name: "status",
  initialState: {
    type: 'HOUR',
    isLoading: true,
    range: TIME_MAPPING['HOUR']
  },
  reducers: {
    setType: (state, action) => {state.type = action.payload},
    setRange: (state, action) => {state.range = action.payload},
    finishLoading: state => {state.isLoading = false}
  },
});

export const { setType, setRange, finishLoading } = statusSlice.actions

export default statusSlice.reducer